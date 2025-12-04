import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, ArrowRight, Save, Plus, Gift, DollarSign, RefreshCw, CreditCard, FileText, Check, Lightbulb, Users, ChartLine, Eye, Rocket, Ticket, Edit, Trash2, Copy, Info, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CriarEbookEtapa3() {
  const [pricingStrategy, setPricingStrategy] = useState<'free' | 'onetime' | 'subscription'>('free');
  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: true,
    pix: true,
    boleto: false,
    paypal: false
  });
  const [installmentType, setInstallmentType] = useState<'flexible' | 'fixed' | 'cash'>('flexible');
  const [refundPolicy, setRefundPolicy] = useState<'30days' | '7days' | 'none'>('30days');
  const [personType, setPersonType] = useState<'pf' | 'pj'>('pf');
  const [affiliateEnabled, setAffiliateEnabled] = useState(true);
  const [promotionalPeriod, setPromotionalPeriod] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/criar-ebook/etapa-2" className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Criar Novo E-book</h1>
                <p className="text-sm text-muted-foreground mt-1">Passo 3 de 3 - Valores e Formas de Pagamento</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors">
                Salvar Rascunho
              </button>
              <Link to="/criar-ebook/etapa-2">
                <button className="px-5 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:opacity-80 transition-opacity">
                  Voltar
                </button>
              </Link>
              <button className="px-6 py-2 bg-[hsl(var(--pastel-purple))] text-foreground rounded-lg font-semibold hover:opacity-80 transition-opacity">
                Publicar E-book
              </button>
            </div>
          </div>
        </header>

        {/* Progress Section */}
        <div className="bg-card border-b border-border px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progresso do Cadastro</span>
              <span className="text-sm text-muted-foreground">100% completo</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-[hsl(var(--pastel-purple))] rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Informações Básicas</p>
                  <p className="text-xs text-muted-foreground">Concluído</p>
                </div>
              </div>
              <div className="flex-1 h-px bg-[hsl(var(--pastel-green))] mx-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Conteúdo e Estrutura</p>
                  <p className="text-xs text-muted-foreground">Concluído</p>
                </div>
              </div>
              <div className="flex-1 h-px bg-[hsl(var(--pastel-purple))] mx-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[hsl(var(--pastel-purple))] rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Valores e Pagamento</p>
                  <p className="text-xs text-muted-foreground">Em andamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* Pricing Strategy Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Estratégia de Precificação</h2>
                    <p className="text-sm text-muted-foreground">Defina a estratégia de preços do seu e-book</p>
                  </div>
                  <div className="px-4 py-2 bg-[hsl(var(--pastel-blue))] rounded-lg flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">Dica de Precificação</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div 
                    onClick={() => setPricingStrategy('free')}
                    className={`border-2 rounded-lg p-5 cursor-pointer hover:shadow-md transition ${
                      pricingStrategy === 'free' 
                        ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' 
                        : 'border-border hover:border-[hsl(var(--pastel-purple))]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Gift className="w-6 h-6 text-foreground" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        pricingStrategy === 'free' ? 'border-[hsl(var(--pastel-blue))]' : 'border-muted-foreground'
                      }`}>
                        {pricingStrategy === 'free' && <div className="w-3 h-3 rounded-full bg-[hsl(var(--pastel-blue))]"></div>}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Gratuito</h3>
                    <p className="text-sm text-muted-foreground">Ideal para aumentar sua audiência e construir autoridade</p>
                  </div>

                  <div 
                    onClick={() => setPricingStrategy('onetime')}
                    className={`border-2 rounded-lg p-5 cursor-pointer hover:shadow-md transition ${
                      pricingStrategy === 'onetime' 
                        ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' 
                        : 'border-border hover:border-[hsl(var(--pastel-purple))]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <DollarSign className="w-6 h-6 text-foreground" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        pricingStrategy === 'onetime' ? 'border-[hsl(var(--pastel-blue))]' : 'border-muted-foreground'
                      }`}>
                        {pricingStrategy === 'onetime' && <div className="w-3 h-3 rounded-full bg-[hsl(var(--pastel-blue))]"></div>}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Pagamento Único</h3>
                    <p className="text-sm text-muted-foreground">Valor fixo para acesso vitalício ao conteúdo</p>
                  </div>

                  <div 
                    onClick={() => setPricingStrategy('subscription')}
                    className={`border-2 rounded-lg p-5 cursor-pointer hover:shadow-md transition ${
                      pricingStrategy === 'subscription' 
                        ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' 
                        : 'border-border hover:border-[hsl(var(--pastel-purple))]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <RefreshCw className="w-6 h-6 text-foreground" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        pricingStrategy === 'subscription' ? 'border-[hsl(var(--pastel-blue))]' : 'border-muted-foreground'
                      }`}>
                        {pricingStrategy === 'subscription' && <div className="w-3 h-3 rounded-full bg-[hsl(var(--pastel-blue))]"></div>}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Assinatura</h3>
                    <p className="text-sm text-muted-foreground">Pagamento recorrente mensal ou anual</p>
                  </div>
                </div>

                <div className="bg-[hsl(var(--pastel-yellow))]/20 border border-[hsl(var(--pastel-yellow))] rounded-lg p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[hsl(var(--pastel-yellow))] mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-foreground">
                    <p className="font-medium mb-1">Recomendação de Preço</p>
                    <p className="text-muted-foreground">Baseado em e-books similares, o preço médio varia entre R$ 47,00 e R$ 197,00. E-books com materiais complementares tendem a ter valores mais altos.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Price Configuration Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Configuração de Preços</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preço Original *
                      <span className="text-muted-foreground font-normal ml-1">(Valor cheio do e-book)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                      <input type="text" placeholder="197,00" className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preço Promocional
                      <span className="text-muted-foreground font-normal ml-1">(Opcional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                      <input type="text" placeholder="97,00" className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <input 
                        type="checkbox" 
                        checked={promotionalPeriod}
                        onChange={(e) => setPromotionalPeriod(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-[hsl(var(--pastel-purple))] focus:ring-[hsl(var(--pastel-purple))]" 
                      />
                      Definir período promocional
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Data Início</label>
                        <input type="date" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] bg-background text-foreground" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Data Fim</label>
                        <input type="date" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] bg-background text-foreground" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Desconto Calculado</label>
                    <div className="bg-[hsl(var(--pastel-green))]/20 border border-[hsl(var(--pastel-green))] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Economia:</span>
                        <span className="text-lg font-bold text-foreground">R$ 100,00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Percentual:</span>
                        <span className="text-2xl font-bold text-[hsl(var(--pastel-green))]">50% OFF</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="bg-muted/50 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Preview de Preço</h3>
                      <span className="px-3 py-1 bg-[hsl(var(--pastel-green))]/30 text-[hsl(var(--pastel-green))] text-xs font-medium rounded-full">50% OFF</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-sm text-muted-foreground line-through">R$ 197,00</span>
                      <span className="text-4xl font-bold text-foreground">R$ 97,00</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">ou 12x de R$ 8,92 sem juros</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Methods Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Formas de Pagamento</h2>
                    <p className="text-sm text-muted-foreground">Selecione os métodos de pagamento aceitos</p>
                  </div>
                  <button className="text-sm text-[hsl(var(--pastel-purple))] font-medium hover:underline">
                    Selecionar Todos
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`border-2 rounded-lg p-4 ${paymentMethods.creditCard ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-[hsl(var(--pastel-blue))]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Cartão de Crédito</h4>
                          <p className="text-xs text-muted-foreground">Parcelamento em até 12x</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={paymentMethods.creditCard}
                        onChange={(e) => setPaymentMethods({...paymentMethods, creditCard: e.target.checked})}
                        className="w-5 h-5 rounded border-border text-[hsl(var(--pastel-blue))] focus:ring-[hsl(var(--pastel-blue))]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de processamento:</span>
                        <span className="font-medium text-foreground">4,99%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Parcelas disponíveis:</span>
                        <select className="px-2 py-1 border border-border rounded text-xs bg-background text-foreground">
                          <option>Até 12x sem juros</option>
                          <option>Até 6x sem juros</option>
                          <option>Até 3x sem juros</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={`border-2 rounded-lg p-4 ${paymentMethods.pix ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                          <i className="fas fa-barcode text-[hsl(var(--pastel-blue))] text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">PIX</h4>
                          <p className="text-xs text-muted-foreground">Aprovação instantânea</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={paymentMethods.pix}
                        onChange={(e) => setPaymentMethods({...paymentMethods, pix: e.target.checked})}
                        className="w-5 h-5 rounded border-border text-[hsl(var(--pastel-blue))] focus:ring-[hsl(var(--pastel-blue))]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de processamento:</span>
                        <span className="font-medium text-foreground">1,99%</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[hsl(var(--pastel-green))]">
                        <Check className="w-4 h-4" />
                        <span>Recomendado - menor taxa</span>
                      </div>
                    </div>
                  </div>

                  <div className={`border-2 rounded-lg p-4 ${paymentMethods.boleto ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Boleto Bancário</h4>
                          <p className="text-xs text-muted-foreground">Compensação em até 3 dias</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={paymentMethods.boleto}
                        onChange={(e) => setPaymentMethods({...paymentMethods, boleto: e.target.checked})}
                        className="w-5 h-5 rounded border-border text-[hsl(var(--pastel-blue))] focus:ring-[hsl(var(--pastel-blue))]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de processamento:</span>
                        <span className="font-medium text-foreground">3,99%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Prazo de compensação:</span>
                        <span className="text-muted-foreground">1-3 dias úteis</span>
                      </div>
                    </div>
                  </div>

                  <div className={`border-2 rounded-lg p-4 ${paymentMethods.paypal ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <i className="fab fa-paypal text-muted-foreground text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">PayPal</h4>
                          <p className="text-xs text-muted-foreground">Pagamento internacional</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={paymentMethods.paypal}
                        onChange={(e) => setPaymentMethods({...paymentMethods, paypal: e.target.checked})}
                        className="w-5 h-5 rounded border-border text-[hsl(var(--pastel-blue))] focus:ring-[hsl(var(--pastel-blue))]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de processamento:</span>
                        <span className="font-medium text-foreground">5,99%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Moedas aceitas:</span>
                        <span className="text-muted-foreground">USD, EUR, BRL</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[hsl(var(--pastel-blue))]/20 border border-[hsl(var(--pastel-blue))] rounded-lg p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[hsl(var(--pastel-blue))] mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-foreground">
                    <p className="font-medium mb-1">Sobre as Taxas de Processamento</p>
                    <p className="text-muted-foreground">As taxas são descontadas automaticamente do valor recebido. Recomendamos habilitar PIX para oferecer a melhor experiência aos leitores com menor custo.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Installment Options Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Opções de Parcelamento</h2>
                
                <div className="space-y-4 mb-6">
                  <div 
                    onClick={() => setInstallmentType('flexible')}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${installmentType === 'flexible' ? 'border-[hsl(var(--pastel-purple))] bg-[hsl(var(--pastel-purple))]/10' : 'border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={installmentType === 'flexible'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-purple))] focus:ring-[hsl(var(--pastel-purple))]" />
                      <div>
                        <p className="font-medium text-foreground">Parcelamento Flexível</p>
                        <p className="text-sm text-muted-foreground">Permite o leitor escolher entre 1x e 12x sem juros</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[hsl(var(--pastel-purple))]/30 text-foreground text-xs font-medium rounded-full">Recomendado</span>
                  </div>

                  <div 
                    onClick={() => setInstallmentType('fixed')}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${installmentType === 'fixed' ? 'border-[hsl(var(--pastel-purple))] bg-[hsl(var(--pastel-purple))]/10' : 'border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={installmentType === 'fixed'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-purple))] focus:ring-[hsl(var(--pastel-purple))]" />
                      <div>
                        <p className="font-medium text-foreground">Parcelamento Fixo</p>
                        <p className="text-sm text-muted-foreground">Define um número específico de parcelas</p>
                      </div>
                    </div>
                    <select className="px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground">
                      <option>6x sem juros</option>
                      <option>3x sem juros</option>
                      <option>12x sem juros</option>
                    </select>
                  </div>

                  <div 
                    onClick={() => setInstallmentType('cash')}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${installmentType === 'cash' ? 'border-[hsl(var(--pastel-purple))] bg-[hsl(var(--pastel-purple))]/10' : 'border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={installmentType === 'cash'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-purple))] focus:ring-[hsl(var(--pastel-purple))]" />
                      <div>
                        <p className="font-medium text-foreground">Apenas à Vista</p>
                        <p className="text-sm text-muted-foreground">Pagamento em parcela única</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Simulação de Parcelas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-card rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">À vista</p>
                      <p className="text-lg font-bold text-foreground">R$ 97,00</p>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">6x sem juros</p>
                      <p className="text-lg font-bold text-foreground">R$ 16,17</p>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">12x sem juros</p>
                      <p className="text-lg font-bold text-foreground">R$ 8,08</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Coupons Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Cupons de Desconto</h2>
                    <p className="text-sm text-muted-foreground">Crie cupons promocionais para o seu e-book</p>
                  </div>
                  <button className="px-4 py-2 bg-[hsl(var(--pastel-blue))] text-foreground rounded-lg font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Criar Cupom
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-[hsl(var(--pastel-purple))] transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[hsl(var(--pastel-yellow))] rounded-lg flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground">LANCAMENTO2025</p>
                          <span className="px-2 py-1 bg-[hsl(var(--pastel-green))]/30 text-[hsl(var(--pastel-green))] text-xs font-medium rounded-full">Ativo</span>
                        </div>
                        <p className="text-sm text-muted-foreground">50% de desconto • Válido até 31/12/2025 • Usado 142 vezes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-[hsl(var(--pastel-purple))] transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[hsl(var(--pastel-green))] rounded-lg flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground">PRIMEIROSLEITORES</p>
                          <span className="px-2 py-1 bg-[hsl(var(--pastel-green))]/30 text-[hsl(var(--pastel-green))] text-xs font-medium rounded-full">Ativo</span>
                        </div>
                        <p className="text-sm text-muted-foreground">R$ 20 de desconto • Válido até 15/01/2025 • Usado 87 vezes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-muted-foreground">BLACKFRIDAY</p>
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">Expirado</span>
                        </div>
                        <p className="text-sm text-muted-foreground">70% de desconto • Expirado em 30/11/2024 • Usado 234 vezes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[hsl(var(--pastel-green))]/20 border border-[hsl(var(--pastel-green))] rounded-lg p-4 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-foreground">
                    <p className="font-medium mb-1">Dica: Use cupons estrategicamente</p>
                    <p className="text-muted-foreground">Cupons de lançamento ajudam a impulsionar vendas iniciais. Considere criar cupons exclusivos para parceiros e afiliados.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Revenue Projection Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Projeção de Receita</h2>
                
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-[hsl(var(--pastel-blue))]/20 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Users className="w-6 h-6 text-[hsl(var(--pastel-blue))]" />
                      <span className="text-xs text-muted-foreground">Meta</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">1.000</p>
                    <p className="text-sm text-muted-foreground">Leitores no 1º ano</p>
                  </div>

                  <div className="bg-[hsl(var(--pastel-purple))]/20 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <DollarSign className="w-6 h-6 text-[hsl(var(--pastel-purple))]" />
                      <span className="text-xs text-muted-foreground">Projetado</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">R$ 97k</p>
                    <p className="text-sm text-muted-foreground">Receita bruta estimada</p>
                  </div>

                  <div className="bg-[hsl(var(--pastel-green))]/20 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <ChartLine className="w-6 h-6 text-[hsl(var(--pastel-green))]" />
                      <span className="text-xs text-muted-foreground">Líquido</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">R$ 92.2k</p>
                    <p className="text-sm text-muted-foreground">Após taxas (5%)</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Cenários de Vendas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground mb-1">Cenário Conservador (400 leitores)</p>
                        <p className="text-sm text-muted-foreground">Receita líquida: R$ 36.9k</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">40%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[hsl(var(--pastel-blue))]/10 rounded-lg border border-[hsl(var(--pastel-blue))]">
                      <div>
                        <p className="font-medium text-foreground mb-1">Cenário Realista (1.000 leitores)</p>
                        <p className="text-sm text-muted-foreground">Receita líquida: R$ 92.2k</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">100%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground mb-1">Cenário Otimista (2.000 leitores)</p>
                        <p className="text-sm text-muted-foreground">Receita líquida: R$ 184.4k</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">200%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tax Settings Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Configurações Fiscais</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tipo de Pessoa
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        onClick={() => setPersonType('pf')}
                        className={`border-2 rounded-lg p-4 cursor-pointer ${personType === 'pf' ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' : 'border-border hover:border-[hsl(var(--pastel-blue))]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" checked={personType === 'pf'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-blue))] focus:ring-[hsl(var(--pastel-blue))]" />
                          <div>
                            <p className="font-medium text-foreground">Pessoa Física</p>
                            <p className="text-xs text-muted-foreground">CPF</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={() => setPersonType('pj')}
                        className={`border-2 rounded-lg p-4 cursor-pointer ${personType === 'pj' ? 'border-[hsl(var(--pastel-blue))] bg-[hsl(var(--pastel-blue))]/10' : 'border-border hover:border-[hsl(var(--pastel-blue))]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" checked={personType === 'pj'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-blue))] focus:ring-[hsl(var(--pastel-blue))]" />
                          <div>
                            <p className="font-medium text-foreground">Pessoa Jurídica</p>
                            <p className="text-xs text-muted-foreground">CNPJ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CPF/CNPJ *</label>
                      <input type="text" placeholder="000.000.000-00" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nome Completo / Razão Social *</label>
                      <input type="text" placeholder="Digite o nome" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Endereço Completo</label>
                    <input type="text" placeholder="Rua, número, complemento" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground mb-3" />
                    <div className="grid grid-cols-3 gap-3">
                      <input type="text" placeholder="CEP" className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] bg-background text-foreground" />
                      <input type="text" placeholder="Cidade" className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] bg-background text-foreground" />
                      <select className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] bg-background text-foreground">
                        <option>UF</option>
                        <option>SP</option>
                        <option>RJ</option>
                        <option>MG</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-[hsl(var(--pastel-yellow))]/20 border border-[hsl(var(--pastel-yellow))] rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[hsl(var(--pastel-yellow))] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-foreground">
                      <p className="font-medium mb-1">Importante: Emissão de Nota Fiscal</p>
                      <p className="text-muted-foreground">Para vendas acima de R$ 100.000/ano, é obrigatória a emissão de nota fiscal. Consulte seu contador sobre a melhor forma de tributação.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Policy Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Política de Reembolso</h2>
                
                <div className="space-y-4 mb-6">
                  <div 
                    onClick={() => setRefundPolicy('30days')}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer ${refundPolicy === '30days' ? 'border-[hsl(var(--pastel-green))] bg-[hsl(var(--pastel-green))]/10' : 'border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={refundPolicy === '30days'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-green))] focus:ring-[hsl(var(--pastel-green))]" />
                      <div>
                        <p className="font-medium text-foreground">Garantia de 30 dias</p>
                        <p className="text-sm text-muted-foreground">Leitor pode solicitar reembolso total em até 30 dias</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[hsl(var(--pastel-green))]/30 text-[hsl(var(--pastel-green))] text-xs font-medium rounded-full">Recomendado</span>
                  </div>

                  <div 
                    onClick={() => setRefundPolicy('7days')}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${refundPolicy === '7days' ? 'border-[hsl(var(--pastel-green))] bg-[hsl(var(--pastel-green))]/10' : 'border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={refundPolicy === '7days'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-green))] focus:ring-[hsl(var(--pastel-green))]" />
                      <div>
                        <p className="font-medium text-foreground">Garantia de 7 dias</p>
                        <p className="text-sm text-muted-foreground">Período reduzido de garantia</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setRefundPolicy('none')}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${refundPolicy === 'none' ? 'border-[hsl(var(--pastel-green))] bg-[hsl(var(--pastel-green))]/10' : 'border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={refundPolicy === 'none'} readOnly className="w-4 h-4 text-[hsl(var(--pastel-green))] focus:ring-[hsl(var(--pastel-green))]" />
                      <div>
                        <p className="font-medium text-foreground">Sem reembolso</p>
                        <p className="text-sm text-muted-foreground">Todas as vendas são finais</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Condições Adicionais (Opcional)</label>
                  <textarea rows={4} placeholder="Ex: O reembolso não será concedido se mais de 50% do e-book tiver sido consumido..." className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent resize-none bg-background text-foreground"></textarea>
                </div>
              </div>
            </section>

            {/* Affiliate Program Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Programa de Afiliados</h2>
                    <p className="text-sm text-muted-foreground">Permita que outros promovam seu e-book e ganhem comissões</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={affiliateEnabled}
                      onChange={(e) => setAffiliateEnabled(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[hsl(var(--pastel-purple))]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-card after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--pastel-purple))]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Comissão do Afiliado (%)</label>
                    <div className="relative">
                      <input type="number" defaultValue={30} min={0} max={100} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Comissão padrão: 20-40%</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Duração do Cookie (dias)</label>
                    <input type="number" defaultValue={30} min={1} max={90} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-purple))] focus:border-transparent bg-background text-foreground" />
                    <p className="text-xs text-muted-foreground mt-1">Tempo de atribuição da venda</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-4">Cálculo de Comissão</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Preço do e-book:</span>
                      <span className="font-medium text-foreground">R$ 97,00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Comissão do afiliado (30%):</span>
                      <span className="font-medium text-[hsl(var(--pastel-green))]">R$ 29,10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Taxa da plataforma (5%):</span>
                      <span className="font-medium text-muted-foreground">R$ 4,85</span>
                    </div>
                    <div className="h-px bg-border"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Você recebe:</span>
                      <span className="text-xl font-bold text-foreground">R$ 63,05</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons Section */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Salvar Rascunho
                    </button>
                    <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Visualizar Preview
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/criar-ebook/etapa-2">
                      <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                      </button>
                    </Link>
                    <button className="px-8 py-3 bg-[hsl(var(--pastel-purple))] text-foreground rounded-lg font-semibold hover:opacity-80 transition-opacity shadow-lg flex items-center gap-2">
                      <Rocket className="w-4 h-4" />
                      Publicar E-book
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Pre-Launch Checklist */}
            <section className="mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Checklist Pré-Lançamento</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[hsl(var(--pastel-green))]/10 rounded-lg">
                    <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-sm text-foreground">Informações básicas do e-book preenchidas</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[hsl(var(--pastel-green))]/10 rounded-lg">
                    <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-sm text-foreground">Capítulos e seções estruturados</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[hsl(var(--pastel-green))]/10 rounded-lg">
                    <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-sm text-foreground">Preços e formas de pagamento configurados</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">4</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Arquivo PDF do e-book carregado</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">5</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Materiais complementares adicionados</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">6</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Estratégia de marketing definida</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">3 de 6 itens concluídos</p>
                    <span className="text-sm font-medium text-foreground">50% pronto</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
