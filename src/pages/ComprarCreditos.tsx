import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, ArrowLeft, Calculator, Lock, Check, X, ChevronDown, Mic, Pen, Video, Coins, FileText, Volume2, Newspaper, ChartBar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ComprarCreditos() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
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
                <h1 className="text-2xl font-semibold text-slate-800">Comprar Créditos IA</h1>
                <p className="text-sm text-slate-500 mt-1">Escolha o pacote ideal para suas necessidades</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Saldo Total Atual</p>
                <p className="text-lg font-semibold text-slate-800">5.510 créditos</p>
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Saldo Atual de Créditos */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Saldo Atual de Créditos</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.3)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">Voz</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">1.250</p>
                <p className="text-xs text-slate-600 mt-1">créditos</p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.3)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Pen className="w-4 h-4 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">Escrita</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">3.840</p>
                <p className="text-xs text-slate-600 mt-1">créditos</p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 0.3)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">Vídeo</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">420</p>
                <p className="text-xs text-slate-600 mt-1">créditos</p>
              </div>
              
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.3)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-4 h-4 text-slate-700" />
                  <span className="text-sm font-medium text-slate-700">Total</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">5.510</p>
                <p className="text-xs text-slate-600 mt-1">créditos</p>
              </div>
            </div>
          </section>

          {/* Escolha seu Pacote */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Escolha seu Pacote</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-slate-700 rounded-lg font-medium" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 1)' }}>
                  Pacotes Padrão
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition">
                  Pacotes Personalizados
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {/* Pacote Básico */}
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-pastel-blue transition cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">Básico</h3>
                  <span className="px-3 py-1 text-slate-700 rounded-full text-xs font-medium" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 1)' }}>Popular</span>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-slate-800">1.000</p>
                  <p className="text-sm text-slate-600 mt-1">créditos universais</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold text-slate-800">R$ 39,90</p>
                  <p className="text-sm text-slate-500">R$ 0,0399 por crédito</p>
                </div>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Válido por 12 meses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Uso em todos os tipos de IA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Suporte por email</span>
                  </div>
                </div>
                <button className="w-full py-3 text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition mt-auto" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 1)' }}>
                  Selecionar Pacote
                </button>
              </div>

              {/* Pacote Profissional */}
              <div className="bg-white rounded-xl p-6 border-2 shadow-lg transform scale-105 flex flex-col" style={{ borderColor: 'hsl(var(--pastel-purple) / 1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">Profissional</h3>
                  <span className="px-3 py-1 text-slate-700 rounded-full text-xs font-medium" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 1)' }}>Recomendado</span>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-slate-800">5.000</p>
                  <p className="text-sm text-slate-600 mt-1">créditos universais</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold text-slate-800">R$ 179,90</p>
                  <p className="text-sm text-slate-500">R$ 0,0360 por crédito</p>
                  <span className="inline-block mt-1 px-2 py-1 text-slate-700 text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 1)' }}>Economize 10%</span>
                </div>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Válido por 12 meses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Uso em todos os tipos de IA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Suporte prioritário</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Bônus de 500 créditos</span>
                  </div>
                </div>
                <button className="w-full py-3 text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition mt-auto" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 1)' }}>
                  Selecionar Pacote
                </button>
              </div>

              {/* Pacote Empresarial */}
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-pastel-yellow transition cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">Empresarial</h3>
                  <span className="px-3 py-1 text-slate-700 rounded-full text-xs font-medium" style={{ backgroundColor: 'hsl(var(--pastel-yellow) / 1)' }}>Melhor Valor</span>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-slate-800">10.000</p>
                  <p className="text-sm text-slate-600 mt-1">créditos universais</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold text-slate-800">R$ 329,90</p>
                  <p className="text-sm text-slate-500">R$ 0,0330 por crédito</p>
                  <span className="inline-block mt-1 px-2 py-1 text-slate-700 text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--pastel-green) / 1)' }}>Economize 17%</span>
                </div>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Válido por 12 meses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Uso em todos os tipos de IA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Suporte 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Bônus de 1.000 créditos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-pastel-green" />
                    <span>Gerente de conta dedicado</span>
                  </div>
                </div>
                <button className="w-full py-3 text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition mt-auto" style={{ backgroundColor: 'hsl(var(--pastel-yellow) / 1)' }}>
                  Selecionar Pacote
                </button>
              </div>
            </div>
          </section>

          {/* Monte seu Pacote Personalizado */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Monte seu Pacote Personalizado</h2>
                <p className="text-sm text-slate-500 mt-1">Escolha a quantidade específica de cada tipo de crédito</p>
              </div>
              <button className="px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: 'hsl(var(--pastel-green) / 1)' }}>
                <Calculator className="w-4 h-4 inline-block mr-2" />
                Calcular Preço
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 1)' }}>
                    <Mic className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Créditos Voz</h3>
                    <p className="text-xs text-slate-500">R$ 0,05 por crédito</p>
                  </div>
                </div>
                <input 
                  type="number" 
                  placeholder="Quantidade" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" 
                  defaultValue="0"
                />
                <p className="text-sm text-slate-600 mt-2">Subtotal: R$ 0,00</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 1)' }}>
                    <Pen className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Créditos Escrita</h3>
                    <p className="text-xs text-slate-500">R$ 0,02 por crédito</p>
                  </div>
                </div>
                <input 
                  type="number" 
                  placeholder="Quantidade" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple" 
                  defaultValue="0"
                />
                <p className="text-sm text-slate-600 mt-2">Subtotal: R$ 0,00</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 1)' }}>
                    <Video className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">Créditos Vídeo</h3>
                    <p className="text-xs text-slate-500">R$ 0,15 por crédito</p>
                  </div>
                </div>
                <input 
                  type="number" 
                  placeholder="Quantidade" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-pink" 
                  defaultValue="0"
                />
                <p className="text-sm text-slate-600 mt-2">Subtotal: R$ 0,00</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-slate-50 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total do Pacote Personalizado</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">R$ 0,00</p>
              </div>
              <button className="px-6 py-3 text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: 'hsl(var(--pastel-green) / 1)' }}>
                Adicionar ao Carrinho
              </button>
            </div>
          </section>

          {/* Tabela Completa de Preços */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Tabela Completa de Preços</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Tipo de Crédito</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Uso</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Custo Unitário</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Pacote 1.000</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Pacote 5.000</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Pacote 10.000</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 1)' }}>
                          <Mic className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Voz</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Interações por voz, conversão texto-fala</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,05</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 50,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 225,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 400,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 1)' }}>
                          <Pen className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Escrita</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Geração de textos, artigos, resumos</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,02</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 20,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 90,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 160,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-pink) / 1)' }}>
                          <Video className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Vídeo</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Criação de vídeos com avatares</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,15</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 150,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 675,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 1.200,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-yellow) / 1)' }}>
                          <FileText className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Resumo</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Resumos de documentos e relatórios</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,02</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 20,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 90,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 160,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-green) / 1)' }}>
                          <Volume2 className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Áudio</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Conversão de texto para áudio</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,05</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 50,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 225,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 400,00</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-peach) / 1)' }}>
                          <Newspaper className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Artigo</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Criação de artigos completos</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,02</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 20,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 90,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 160,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 1)' }}>
                          <ChartBar className="w-4 h-4 text-slate-700" />
                        </div>
                        <span className="font-medium text-slate-800">Análise</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">Análises e comparativos detalhados</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-800">R$ 0,02</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 20,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 90,00</td>
                    <td className="py-4 px-4 text-center text-slate-600">R$ 160,00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.2)', borderColor: 'hsl(var(--pastel-blue) / 1)' }}>
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-700 mt-1" />
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800 mb-2">Informações Importantes</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Créditos universais podem ser usados em qualquer tipo de interação</li>
                    <li>• Pacotes personalizados têm validade de 12 meses a partir da compra</li>
                    <li>• Descontos progressivos aplicados automaticamente em compras maiores</li>
                    <li>• Créditos não utilizados não expiram durante o período de validade</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Compare os Benefícios */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Compare os Benefícios</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">Recurso</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Básico</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.2)' }}>Profissional</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">Empresarial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">Quantidade de créditos</td>
                    <td className="py-4 px-4 text-center text-slate-800">1.000</td>
                    <td className="py-4 px-4 text-center text-slate-800" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}>5.000</td>
                    <td className="py-4 px-4 text-center text-slate-800">10.000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">Validade</td>
                    <td className="py-4 px-4 text-center text-slate-800">12 meses</td>
                    <td className="py-4 px-4 text-center text-slate-800" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}>12 meses</td>
                    <td className="py-4 px-4 text-center text-slate-800">12 meses</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">Bônus de créditos</td>
                    <td className="py-4 px-4 text-center text-slate-600">-</td>
                    <td className="py-4 px-4 text-center text-slate-800" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}>+500</td>
                    <td className="py-4 px-4 text-center text-slate-800">+1.000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">Suporte</td>
                    <td className="py-4 px-4 text-center text-slate-800">Email</td>
                    <td className="py-4 px-4 text-center text-slate-800" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}>Prioritário</td>
                    <td className="py-4 px-4 text-center text-slate-800">24/7</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">Gerente de conta</td>
                    <td className="py-4 px-4 text-center"><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-4 h-4 text-pastel-green inline-block" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">Relatórios avançados</td>
                    <td className="py-4 px-4 text-center"><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}><Check className="w-4 h-4 text-pastel-green inline-block" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-4 h-4 text-pastel-green inline-block" /></td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">API Access</td>
                    <td className="py-4 px-4 text-center"><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-4 h-4 text-pastel-green inline-block" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm text-slate-800">Treinamento personalizado</td>
                    <td className="py-4 px-4 text-center"><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.1)' }}><X className="w-4 h-4 text-slate-400 inline-block" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-4 h-4 text-pastel-green inline-block" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Perguntas Frequentes */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Perguntas Frequentes</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">Como funcionam os créditos universais?</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 mt-2">Créditos universais podem ser utilizados em qualquer tipo de interação com os agentes de IA, seja voz, texto, vídeo ou outros formatos. O custo será deduzido automaticamente do seu saldo de acordo com a tabela de preços.</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">Os créditos expiram?</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 mt-2">Sim, os créditos têm validade de 12 meses a partir da data de compra. Após esse período, créditos não utilizados serão automaticamente expirados.</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">Posso comprar créditos específicos?</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 mt-2">Sim! Você pode montar um pacote personalizado escolhendo a quantidade exata de cada tipo de crédito que deseja comprar. Use a seção "Monte seu Pacote Personalizado" acima.</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">Quais formas de pagamento são aceitas?</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 mt-2">Aceitamos cartões de crédito (Visa, Mastercard, American Express), cartões de débito, PIX e transferência bancária. Para compras empresariais, também oferecemos faturamento.</p>
              </div>

              <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-800">Posso solicitar reembolso?</h3>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 mt-2">Créditos não utilizados podem ser reembolsados dentro de 30 dias após a compra. Após esse período ou após o uso de qualquer crédito, não é possível solicitar reembolso.</p>
              </div>
            </div>
          </section>

          {/* Resumo do Pagamento */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 sticky bottom-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-slate-600">Pacote Selecionado</p>
                  <p className="text-lg font-semibold text-slate-800">Nenhum pacote selecionado</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div>
                  <p className="text-sm text-slate-600">Total a Pagar</p>
                  <p className="text-2xl font-bold text-slate-800">R$ 0,00</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button className="px-6 py-3 text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: 'hsl(var(--pastel-green) / 1)' }}>
                  <Lock className="w-4 h-4 inline-block mr-2" />
                  Finalizar Compra
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
