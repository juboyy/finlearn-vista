import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, 
  Download, 
  TrendingUp, 
  Percent, 
  DollarSign, 
  PieChart,
  Star,
  Bookmark,
  Bot,
  Eye,
  Clock,
  FileText,
  Lightbulb,
  AlertTriangle,
  ChartLine
} from "lucide-react";

const Analises = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Análises de Mercado</h1>
              <p className="text-sm text-slate-500 mt-1">Insights gerados por IA sobre diversos setores do mercado financeiro</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-blue/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Download size={16} className="inline mr-2" />
                Exportar Relatório
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <section className="mb-8">
            <div className="bg-pastel-purple/80 rounded-xl border border-slate-200 p-8">
              <div className="grid grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Bot className="text-slate-700" size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">Análise Gerada por IA</span>
                        <span className="text-xs text-slate-600">Agente: Análise de Macro Economia</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button title="Favoritar" className="p-2 text-slate-600 hover:text-yellow-500 transition">
                        <Star size={20} />
                      </button>
                      <button title="Salvar" className="p-2 text-slate-600 hover:text-blue-500 transition">
                        <Bookmark size={20} />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">Panorama do Mercado Brasileiro</h2>
                  <p className="text-slate-700 mb-6">Análise completa dos principais indicadores econômicos, tendências de mercado e oportunidades nos setores de renda fixa, renda variável e meios de pagamento.</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock size={16} />
                      <span>Atualizado há 2 horas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Eye size={16} />
                      <span>1.2k visualizações</span>
                    </div>
                  </div>
                </div>
                <div className="h-64 bg-white rounded-xl overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7fcb40b8c2-0d96ecc5a72548820724.png" alt="illustration of financial market analysis dashboard with charts graphs and data visualization" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Visão Geral do Mercado</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-green/80 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-slate-700" size={24} />
                  </div>
                  <span className="text-xs text-green-600 font-medium">+2.4%</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">118.245</p>
                <p className="text-sm text-slate-600">Ibovespa</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-blue/80 rounded-lg flex items-center justify-center">
                    <Percent className="text-slate-700" size={24} />
                  </div>
                  <span className="text-xs text-blue-600 font-medium">-0.25%</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">10.75%</p>
                <p className="text-sm text-slate-600">Taxa Selic</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-yellow/80 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-slate-700" size={24} />
                  </div>
                  <span className="text-xs text-red-600 font-medium">+0.8%</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">R$ 5.12</p>
                <p className="text-sm text-slate-600">Dólar USD</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-pink/80 rounded-lg flex items-center justify-center">
                    <PieChart className="text-slate-700" size={24} />
                  </div>
                  <span className="text-xs text-purple-600 font-medium">+5.2%</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">4.89%</p>
                <p className="text-sm text-slate-600">IPCA (ano)</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Análises em Destaque</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Todas</button>
                <button className="px-4 py-2 text-sm bg-pastel-blue/80 text-slate-700 rounded-lg font-medium">Renda Fixa</button>
                <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Renda Variável</button>
                <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Fundos</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-blue/80 overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/27d7c99831-964c4d3004b99cb9421c.png" alt="illustration of fixed income bonds and treasury securities" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-blue/80 text-slate-700 text-xs rounded-full">Renda Fixa</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Alta Confiança</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                      <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Títulos Públicos: Oportunidades em 2025</h3>
                  <p className="text-sm text-slate-600 mb-4">Análise detalhada sobre a curva de juros e as melhores estratégias para alocação em títulos do Tesouro Direto.</p>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Renda Fixa</span></div>
                    <span>há 3 horas</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-blue/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">Ver Análise Completa</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-green/80 overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/15c1b70a0a-1efcc7f9f1aafe24a989.png" alt="illustration of payment processing systems with credit cards" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-green/80 text-slate-700 text-xs rounded-full">Meios de Pagamento</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Tendência</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                      <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Pix: Impacto no Mercado de Meios de Pagamento</h3>
                  <p className="text-sm text-slate-600 mb-4">Como o crescimento do Pix está transformando o ecossistema de pagamentos e criando novas oportunidades.</p>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Pagamentos</span></div>
                    <span>há 5 horas</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-green/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">Ver Análise Completa</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-purple/80 overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/df884dff45-9688d032fd8d112bc1ec.png" alt="illustration of stock market trading with bull and bear symbols" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-purple/80 text-slate-700 text-xs rounded-full">Renda Variável</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Popular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                      <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Setores em Alta na B3 e Novos IPOs em 2026</h3>
                  <p className="text-sm text-slate-600 mb-4">Análise dos setores com melhor desempenho e perspectivas para o próximo trimestre na bolsa brasileira.</p>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Ações</span></div>
                    <span>há 1 dia</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-purple/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">Ver Análise Completa</button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Análise por Setor</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Desempenho Setorial - Último Mês</h3>
                    <p className="text-sm text-slate-500">Variação percentual por setor</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                </div>
                <div className="h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Gráfico de Desempenho Setorial</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Volume de Negociação</h3>
                    <p className="text-sm text-slate-500">Últimos 7 dias (em bilhões)</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                </div>
                <div className="h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Gráfico de Volume</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Análises Detalhadas</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-pastel-yellow/80 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e767b1e35f-e1497fa60b2545ea746a.png" alt="illustration of banking sector" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-pastel-yellow/80 text-slate-700 text-xs rounded-full">Setor Bancário</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Recomendação: Compra</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Bancos Digitais: Crescimento Sustentável</h3>
                        <p className="text-sm text-slate-600 mb-3">Análise profunda sobre o crescimento dos bancos digitais no Brasil e seu impacto no sistema financeiro tradicional. Perspectivas de rentabilidade e market share.</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                        <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Setor Financeiro</span></div>
                        <div className="flex items-center gap-2"><Clock size={16} /><span>há 6 horas</span></div>
                        <div className="flex items-center gap-2"><Eye size={16} /><span>842 visualizações</span></div>
                      </div>
                      <button className="px-4 py-2 bg-pastel-yellow/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">Ler Mais</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-pastel-pink/80 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ba28b58ea8-8cb1869b77ea31def56f.png" alt="illustration of real estate investment" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-pastel-pink/80 text-slate-700 text-xs rounded-full">Fundos Imobiliários</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Recomendação: Manter</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">FIIs: Dividendos e Valorização</h3>
                        <p className="text-sm text-slate-600 mb-3">Panorama completo dos fundos imobiliários brasileiros, análise de dividend yield, vacância e tendências do mercado imobiliário corporativo.</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                        <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Imobiliário</span></div>
                        <div className="flex items-center gap-2"><Clock size={16} /><span>há 8 horas</span></div>
                        <div className="flex items-center gap-2"><Eye size={16} /><span>1.1k visualizações</span></div>
                      </div>
                      <button className="px-4 py-2 bg-pastel-pink/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">Ler Mais</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-pastel-peach/80 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ee21125d96-93cb76472c018e2b9a5f.png" alt="illustration of commodities trading" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-pastel-peach/80 text-slate-700 text-xs rounded-full">Commodities</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Recomendação: Atenção</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Commodities: Volatilidade e Oportunidades</h3>
                        <p className="text-sm text-slate-600 mb-3">Análise do mercado de commodities agrícolas e minerais, impacto das políticas internacionais e projeções para exportações brasileiras.</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                        <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Commodities</span></div>
                        <div className="flex items-center gap-2"><Clock size={16} /><span>há 12 horas</span></div>
                        <div className="flex items-center gap-2"><Eye size={16} /><span>673 visualizações</span></div>
                      </div>
                      <button className="px-4 py-2 bg-pastel-peach/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">Ler Mais</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Indicadores Macroeconômicos</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Evolução da Taxa Selic</h3>
                    <p className="text-sm text-slate-500">Últimos 12 meses (%)</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                </div>
                <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Gráfico Selic</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Inflação Acumulada</h3>
                    <p className="text-sm text-slate-500">IPCA - Últimos 12 meses (%)</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                </div>
                <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Gráfico IPCA</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Evolução dos Meios de Pagamento</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Evolução do PIX</h3>
                    <p className="text-sm text-slate-500">Transações mensais (em bilhões)</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                </div>
                <div className="h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Gráfico PIX</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Evolução do Cartão de Crédito</h3>
                    <p className="text-sm text-slate-500">Volume transacionado (R$ bilhões/mês)</p>
                  </div>
                  <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                </div>
                <div className="h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Gráfico Cartão de Crédito</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Insights da IA</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pastel-blue/80 rounded-lg flex items-center justify-center">
                    <Lightbulb className="text-slate-700" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Oportunidade Identificada</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Títulos Prefixados</h3>
                <p className="text-sm text-slate-600 mb-4">Com a expectativa de queda na Selic, títulos prefixados longos apresentam boa relação risco-retorno.</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Confiança: 87%</span>
                  <button className="text-pastel-blue hover:text-slate-800 font-medium">Ver Detalhes →</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pastel-yellow/80 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="text-slate-700" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Alerta de Risco</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Volatilidade Cambial</h3>
                <p className="text-sm text-slate-600 mb-4">Aumento da volatilidade cambial devido a incertezas políticas internacionais. Considere hedge.</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Confiança: 92%</span>
                  <button className="text-pastel-yellow hover:text-slate-800 font-medium">Ver Detalhes →</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pastel-green/80 rounded-lg flex items-center justify-center">
                    <ChartLine className="text-slate-700" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Tendência Positiva</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Setor de Tecnologia</h3>
                <p className="text-sm text-slate-600 mb-4">Empresas de tecnologia financeira mostram crescimento consistente e bons fundamentos.</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Confiança: 84%</span>
                  <button className="text-pastel-green hover:text-slate-800 font-medium">Ver Detalhes →</button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Relatórios Recentes</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos relatórios</a>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pastel-purple/80 rounded-lg flex items-center justify-center">
                      <FileText className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Relatório Mensal - Janeiro 2025</h3>
                      <p className="text-sm text-slate-500">Análise completa do mercado financeiro brasileiro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">42 páginas</span>
                    <button className="px-4 py-2 bg-pastel-purple/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                      <Download size={16} className="inline mr-2" />Baixar
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pastel-blue/80 rounded-lg flex items-center justify-center">
                      <FileText className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Análise Setorial - Tecnologia</h3>
                      <p className="text-sm text-slate-500">Panorama do setor de tecnologia e fintechs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">28 páginas</span>
                    <button className="px-4 py-2 bg-pastel-blue/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                      <Download size={16} className="inline mr-2" />Baixar
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pastel-green/80 rounded-lg flex items-center justify-center">
                      <FileText className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Projeções Macroeconômicas 2025</h3>
                      <p className="text-sm text-slate-500">Expectativas para PIB, inflação e taxa de juros</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">35 páginas</span>
                    <button className="px-4 py-2 bg-pastel-green/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                      <Download size={16} className="inline mr-2" />Baixar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-pastel-blue/80 rounded-xl p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot className="text-slate-700" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Análises Personalizadas com IA</h2>
                <p className="text-slate-600 mb-8">Nossos agentes de IA geram análises customizadas baseadas no seu perfil de investimento e objetivos financeiros.</p>
                <div className="flex items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-white text-slate-800 rounded-lg font-semibold hover:bg-slate-50 transition shadow-lg">Criar Análise Personalizada</button>
                  <button className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition">Falar com Especialista</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Analises;