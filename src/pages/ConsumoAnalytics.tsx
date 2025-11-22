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
          {/* Assinaturas Ativas */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Assinaturas Ativas</h2>
              <Badge className="bg-pastel-green text-pastel-gray-dark border-0">3 Ativas</Badge>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 rounded-lg border border-slate-200" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.041)' }}>
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

              <div className="p-4 rounded-lg border border-slate-200" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.041)' }}>
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

              <div className="p-4 rounded-lg border border-slate-200" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.041)' }}>
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

          {/* Saldo de Créditos e Resumo */}
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
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.065)' }}>
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

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.065)' }}>
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

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 0.065)' }}>
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
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.1625)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Receipt className="w-5 h-5 text-slate-700" />
                    <span className="font-medium text-slate-800">Total Assinaturas</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 259,70</p>
                  <p className="text-sm text-slate-600">Novembro 2024</p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-yellow) / 0.1625)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-robot text-slate-700"></i>
                    <span className="font-medium text-slate-800">Créditos IA</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 187,35</p>
                  <p className="text-sm text-slate-600">Consumo do mês</p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-peach) / 0.1625)' }}>
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

          {/* Histórico de Consumo de Créditos */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Histórico de Consumo de Créditos</h2>
                <p className="text-sm text-slate-500 mt-1">Detalhamento do uso dos agentes IA no mês atual</p>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Novembro 2024</option>
                  <option>Outubro 2024</option>
                  <option>Setembro 2024</option>
                  <option>Agosto 2024</option>
                </select>
                <Button variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Mic className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Interações Voz</span>
                </div>
                <p className="text-xl font-bold text-slate-800">750</p>
                <p className="text-xs text-slate-500 mt-1">R$ 37,50 gasto</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Pen className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Textos Gerados</span>
                </div>
                <p className="text-xl font-bold text-slate-800">1.160</p>
                <p className="text-xs text-slate-500 mt-1">R$ 23,20 gasto</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-4 h-4 text-slate-600" />
                  <span className="text-xs text-slate-600">Vídeos Criados</span>
                </div>
                <p className="text-xl font-bold text-slate-800">580</p>
                <p className="text-xs text-slate-500 mt-1">R$ 87,00 gasto</p>
              </div>

                <div className="p-3 rounded-lg border border-slate-200" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.065)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Coins className="w-4 h-4 text-slate-700" />
                    <span className="text-xs text-slate-700 font-medium">Total Consumido</span>
                  </div>
                  <p className="text-xl font-bold text-slate-800">2.490</p>
                  <p className="text-xs text-slate-600 mt-1">R$ 187,35 total</p>
                </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Data/Hora</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Tipo de Uso</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Descrição</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Créditos</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Custo Unit.</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">21 Nov, 14:32</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 0.203)' }}>
                        <Video className="w-3 h-3" />
                        Vídeo
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Criação de vídeo com avatar - Análise de mercado</td>
                    <td className="py-4 px-4 text-sm text-slate-800">120</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,15</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 18,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">21 Nov, 11:15</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.203)' }}>
                        <Pen className="w-3 h-3" />
                        Escrita
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Geração de artigo sobre regulação bancária</td>
                    <td className="py-4 px-4 text-sm text-slate-800">85</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,02</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 1,70</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">21 Nov, 09:45</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.203)' }}>
                        <Mic className="w-3 h-3" />
                        Voz
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Interação por voz - Consulta sobre fundos de investimento</td>
                    <td className="py-4 px-4 text-sm text-slate-800">45</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,05</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 2,25</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">20 Nov, 16:20</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.203)' }}>
                        <i className="fas fa-file-alt text-xs"></i>
                        Resumo
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Resumo de relatório trimestral - 15 páginas</td>
                    <td className="py-4 px-4 text-sm text-slate-800">150</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,02</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 3,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">20 Nov, 14:55</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 0.203)' }}>
                        <Video className="w-3 h-3" />
                        Vídeo
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Vídeo explicativo sobre compliance financeiro</td>
                    <td className="py-4 px-4 text-sm text-slate-800">200</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,15</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 30,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">20 Nov, 10:30</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.203)' }}>
                        <i className="fas fa-volume-up text-xs"></i>
                        Áudio
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Conversão de texto para áudio - Newsletter diária</td>
                    <td className="py-4 px-4 text-sm text-slate-800">60</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,05</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 3,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">19 Nov, 15:40</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.203)' }}>
                        <i className="fas fa-newspaper text-xs"></i>
                        Artigo
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Criação de artigo sobre tendências do mercado de capitais</td>
                    <td className="py-4 px-4 text-sm text-slate-800">320</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,02</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 6,40</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">19 Nov, 11:25</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.203)' }}>
                        <Mic className="w-3 h-3" />
                        Voz
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Sessão de perguntas e respostas sobre PIX</td>
                    <td className="py-4 px-4 text-sm text-slate-800">95</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,05</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 4,75</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">18 Nov, 16:10</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 0.203)' }}>
                        <Video className="w-3 h-3" />
                        Vídeo
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Tutorial em vídeo sobre análise de risco de crédito</td>
                    <td className="py-4 px-4 text-sm text-slate-800">260</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,15</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 39,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">18 Nov, 13:50</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.203)' }}>
                        <Pen className="w-3 h-3" />
                        Escrita
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Relatório personalizado de análise de portfólio</td>
                    <td className="py-4 px-4 text-sm text-slate-800">180</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,02</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 3,60</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">18 Nov, 09:15</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.203)' }}>
                        <Mic className="w-3 h-3" />
                        Voz
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Consulta sobre regulamentação BACEN</td>
                    <td className="py-4 px-4 text-sm text-slate-800">70</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,05</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 3,50</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-800">17 Nov, 14:20</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.203)' }}>
                        <i className="fas fa-chart-bar text-xs"></i>
                        Análise
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-800">Análise comparativa de produtos financeiros</td>
                    <td className="py-4 px-4 text-sm text-slate-800">240</td>
                    <td className="py-4 px-4 text-sm text-slate-600">R$ 0,02</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 4,80</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300 bg-slate-50">
                    <td colSpan={3} className="py-4 px-4 text-sm font-semibold text-slate-800">TOTAL DO MÊS</td>
                    <td className="py-4 px-4 text-sm font-bold text-slate-800">2.490</td>
                    <td className="py-4 px-4"></td>
                    <td className="py-4 px-4 text-base font-bold text-slate-800">R$ 187,35</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500">Mostrando 12 de 47 transações</p>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  Anterior
                </button>
                <button className="px-3 py-2 bg-pastel-blue text-pastel-gray-dark rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  2
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  3
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  4
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  Próximo
                </button>
              </div>
            </div>
          </section>

          {/* Métodos de Pagamento */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Métodos de Pagamento</h2>
              <Button className="bg-pastel-blue hover:bg-pastel-blueBtn text-pastel-gray-dark">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Cartão
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.1625)' }}>
                  <i className="fab fa-cc-visa text-slate-700 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800">Visa •••• 4532</h3>
                  <p className="text-sm text-slate-500">Expira em 12/2026</p>
                </div>
                <span className="px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.203)' }}>Principal</span>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-600 hover:text-slate-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-red-600">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1625)' }}>
                  <i className="fab fa-cc-mastercard text-slate-700 text-xl"></i>
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
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-red-600">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Cupons de Desconto */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Cupons de Desconto</h2>
              <Button className="bg-pastel-purple hover:bg-pastel-purpleBtn text-pastel-gray-dark">
                <Ticket className="w-4 h-4 mr-2" />
                Aplicar Cupom
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border-2 border-dashed border-slate-200" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.041)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="w-4 h-4 text-slate-700" />
                  <span className="font-medium text-slate-800">SAVE20</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">20% de desconto no próximo pagamento</p>
                <p className="text-xs text-slate-500">Válido até 31/12/2024</p>
              </div>

              <div className="p-4 rounded-lg border-2 border-dashed border-slate-200" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.041)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-4 h-4 text-slate-700" />
                  <span className="font-medium text-slate-800">FRIEND50</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">R$ 50 para você e seu amigo</p>
                <p className="text-xs text-slate-500">Programa de indicação</p>
              </div>

              <div className="p-4 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <Plus className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-500">Adicionar Cupom</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">Digite seu código de desconto</p>
                <button className="text-xs text-pastel-blueText hover:underline">Inserir código</button>
              </div>
            </div>
          </section>

          {/* Histórico de Pagamentos */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Histórico de Pagamentos</h2>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Todos os períodos</option>
                  <option>Últimos 3 meses</option>
                  <option>Últimos 6 meses</option>
                  <option>Último ano</option>
                </select>
                <Button variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
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
                    <td className="py-4 px-4 text-sm text-slate-800">Assinaturas - Novembro</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 259,70</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.203)' }}>Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blueText hover:underline text-sm">
                        <Download className="w-3 h-3 inline-block mr-1" />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">08 Nov 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Pacote de Créditos IA - 5.000 créditos</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 179,90</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.203)' }}>Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blueText hover:underline text-sm">
                        <Download className="w-3 h-3 inline-block mr-1" />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">16 Out 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Assinaturas - Outubro</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 259,70</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.203)' }}>Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blueText hover:underline text-sm">
                        <Download className="w-3 h-3 inline-block mr-1" />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">16 Set 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Assinaturas - Setembro</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 259,70</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.203)' }}>Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blueText hover:underline text-sm">
                        <Download className="w-3 h-3 inline-block mr-1" />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm text-slate-800">16 Ago 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Assinaturas - Agosto</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 259,70</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-pastel-gray-dark text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.203)' }}>Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blueText hover:underline text-sm">
                        <Download className="w-3 h-3 inline-block mr-1" />
                        Baixar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500">Mostrando 5 de 9 transações</p>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  Anterior
                </button>
                <button className="px-3 py-2 bg-pastel-blue text-pastel-gray-dark rounded-lg text-sm font-medium">
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
