import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, Save, Send, Check, CreditCard, Barcode, Wallet, DollarSign, HelpCircle, Info, CalendarCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { StepWizard } from "@/components/Dashboard/StepWizard";

export default function NovoEbookEtapa3() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const [productData, setProductData] = useState<any>(null);
  const [showValidation, setShowValidation] = useState(false);
  
  // Pricing
  const [price, setPrice] = useState("97.00");
  const [hasLaunchDiscount, setHasLaunchDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("67.00");
  const [discountDays, setDiscountDays] = useState("7");
  
  // Payment Methods
  const [creditCard, setCreditCard] = useState(true);
  const [pix, setPix] = useState(true);
  const [boleto, setBoleto] = useState(false);
  const [digitalWallet, setDigitalWallet] = useState(false);
  
  // Installments
  const [allowInstallments, setAllowInstallments] = useState(true);
  const [maxInstallments, setMaxInstallments] = useState("12");
  const [minInstallmentValue, setMinInstallmentValue] = useState("15.00");
  
  // Payout
  const [payoutMethod, setPayoutMethod] = useState("bank");
  const [bank, setBank] = useState("");
  const [accountType, setAccountType] = useState("corrente");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [payoutFrequency, setPayoutFrequency] = useState("quinzenal");
  
  // Tax Info
  const [taxId, setTaxId] = useState("");
  const [municipalRegistration, setMunicipalRegistration] = useState("");
  const [taxRegime, setTaxRegime] = useState("simples");

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
  }, [productId]);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollable = documentHeight - windowHeight;
      const progress = (scrollTop / scrollable) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadProductData = async () => {
    if (!productId) return;
    
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      
      if (error) throw error;
      
      setProductData(data);
      if (data.price) setPrice(data.price.toString());
    } catch (error) {
      console.error("Error loading product:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do produto.",
        variant: "destructive"
      });
    }
  };

  const calculatePlatformFee = () => {
    return parseFloat(price) * 0.15;
  };

  const calculateYouReceive = () => {
    return parseFloat(price) - calculatePlatformFee();
  };

  const handleSaveDraft = async () => {
    if (!productId) return;
    
    try {
      const paymentMethods = [];
      if (creditCard) paymentMethods.push("credit_card");
      if (pix) paymentMethods.push("pix");
      if (boleto) paymentMethods.push("boleto");
      if (digitalWallet) paymentMethods.push("digital_wallet");

      const { error } = await supabase
        .from("products")
        .update({
          price: parseFloat(price),
          is_free: false,
          payment_methods: paymentMethods as any,
          updated_at: new Date().toISOString()
        })
        .eq("id", productId);
      
      if (error) throw error;
      
      toast({
        title: "Rascunho salvo",
        description: "Suas alterações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o rascunho.",
        variant: "destructive"
      });
    }
  };

  const handlePublish = async () => {
    setShowValidation(true);
    
    if (!productId) return;
    
    if (!creditCard && !pix && !boleto && !digitalWallet) {
      toast({
        title: "Forma de pagamento obrigatória",
        description: "Selecione pelo menos uma forma de pagamento.",
        variant: "destructive"
      });
      return;
    }

    if (payoutMethod === "bank" && (!bank || !agency || !account || !cpfCnpj)) {
      toast({
        title: "Dados bancários incompletos",
        description: "Preencha todos os dados bancários para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to resume page
    navigate(`/resumo-ebook?productId=${productId}`);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={`/novo-ebook/etapa-2?productId=${productId}`} className="p-2 text-muted-foreground hover:bg-accent/10 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Criar Novo eBook</h1>
                  <p className="text-sm text-muted-foreground mt-1">Etapa 3 de 3 - Pagamento e Publicação</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                  Salvar Rascunho
                </Button>
                <Button onClick={handlePublish} className="gap-2">
                  Ver Resumo
                </Button>
              </div>
            </div>
          </div>
        </header>

        <StepWizard currentStep={3} scrollProgress={scrollProgress} />

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              
              {/* Pricing Section */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Definir Preço</h3>
                    <p className="text-sm text-muted-foreground mt-1">Configure o valor de venda do seu eBook</p>
                  </div>
                  <span className="px-3 py-1 bg-[hsl(340,40%,92%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">Obrigatório</span>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Preço de Venda</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
                        <input 
                          type="text" 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-semibold"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Preço recomendado: R$ 79,00 - R$ 149,00</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Você Recebe</label>
                      <div className="h-14 bg-[hsl(142,35%,85%)] rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">R$ {calculateYouReceive().toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">85% do valor (taxa da plataforma: 15%)</p>
                    </div>
                  </div>

                  <div className="bg-accent/25 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-foreground">Detalhamento</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Preço do eBook</span>
                        <span className="font-medium text-foreground">R$ {parseFloat(price).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Taxa da plataforma (15%)</span>
                        <span className="font-medium text-destructive">- R$ {calculatePlatformFee().toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="font-semibold text-foreground">Você recebe por venda</span>
                        <span className="font-bold text-foreground text-lg">R$ {calculateYouReceive().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={hasLaunchDiscount}
                        onChange={(e) => setHasLaunchDiscount(e.target.checked)}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Oferecer Desconto de Lançamento</p>
                        <p className="text-sm text-muted-foreground mt-1">Atraia mais compradores nos primeiros dias</p>
                      </div>
                    </label>
                    {hasLaunchDiscount && (
                      <div className="mt-4 pl-8 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-2">Preço Promocional</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                            <input 
                              type="text" 
                              value={discountPrice}
                              onChange={(e) => setDiscountPrice(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-2">Válido por</label>
                          <select 
                            value={discountDays}
                            onChange={(e) => setDiscountDays(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          >
                            <option value="7">7 dias</option>
                            <option value="14">14 dias</option>
                            <option value="30">30 dias</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className={`bg-card rounded-xl border p-8 ${showValidation && !creditCard && !pix && !boleto && !digitalWallet ? 'border-destructive' : 'border-border'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      Formas de Pagamento
                      <span className="text-destructive">*</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Selecione as opções que seus compradores poderão usar</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[hsl(340,40%,92%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">Obrigatório</span>
                    {showValidation && !creditCard && !pix && !boleto && !digitalWallet && (
                      <span className="text-xs text-destructive flex items-center gap-1">
                        <span className="w-2 h-2 bg-destructive rounded-full"></span>
                        Selecione pelo menos uma
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className={`flex items-center justify-between p-5 border-2 rounded-lg cursor-pointer ${creditCard ? 'border-foreground bg-accent/25' : 'border-border hover:border-muted-foreground'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(142,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Cartão de Crédito</p>
                        <p className="text-sm text-muted-foreground mb-2">Visa, Mastercard, Elo, Amex, Hipercard</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground">Até 12x</span>
                          <span className="px-2 py-1 bg-[hsl(142,35%,85%)] text-xs text-[hsl(215,20%,40%)] font-medium rounded">Mais Vendido</span>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={creditCard}
                      onChange={(e) => setCreditCard(e.target.checked)}
                      className="w-6 h-6 text-primary border-border rounded focus:ring-primary"
                    />
                  </label>

                  <label className={`flex items-center justify-between p-5 border-2 rounded-lg cursor-pointer ${pix ? 'border-foreground bg-accent/25' : 'border-border hover:border-muted-foreground'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(207,35%,92%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Barcode className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">PIX</p>
                        <p className="text-sm text-muted-foreground mb-2">Pagamento instantâneo via QR Code ou Copia e Cola</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground">À vista</span>
                          <span className="px-2 py-1 bg-[hsl(207,35%,92%)] text-xs text-[hsl(215,20%,40%)] font-medium rounded">Aprovação Imediata</span>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={pix}
                      onChange={(e) => setPix(e.target.checked)}
                      className="w-6 h-6 text-primary border-border rounded focus:ring-primary"
                    />
                  </label>

                  <label className={`flex items-center justify-between p-5 border rounded-lg cursor-pointer ${boleto ? 'border-foreground' : 'border-border hover:border-muted-foreground'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(48,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Boleto Bancário</p>
                        <p className="text-sm text-muted-foreground mb-2">Pagamento em até 3 dias úteis após emissão</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground">À vista</span>
                          <span className="px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground">Aprovação em 1-3 dias</span>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={boleto}
                      onChange={(e) => setBoleto(e.target.checked)}
                      className="w-6 h-6 text-primary border-border rounded focus:ring-primary"
                    />
                  </label>

                  <label className={`flex items-center justify-between p-5 border rounded-lg cursor-pointer ${digitalWallet ? 'border-foreground' : 'border-border hover:border-muted-foreground'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(270,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Wallet className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Carteiras Digitais</p>
                        <p className="text-sm text-muted-foreground mb-2">PayPal, Mercado Pago, PicPay, Google Pay, Apple Pay</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground">À vista</span>
                          <span className="px-2 py-1 bg-card border border-border rounded text-xs text-muted-foreground">Aprovação Rápida</span>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={digitalWallet}
                      onChange={(e) => setDigitalWallet(e.target.checked)}
                      className="w-6 h-6 text-primary border-border rounded focus:ring-primary"
                    />
                  </label>
                </div>

                <div className="mt-6 bg-[hsl(207,35%,92%)] rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-[hsl(215,20%,40%)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Taxas de Processamento</p>
                      <p className="text-xs text-muted-foreground">As taxas de processamento de pagamento já estão incluídas na taxa da plataforma de 15%. Você não paga nada extra por transação.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installment Config Section */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Configuração de Parcelamento</h3>
                  <p className="text-sm text-muted-foreground mt-1">Defina as opções de parcelamento para cartão de crédito</p>
                </div>

                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-5">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-medium text-foreground">Permitir Parcelamento</p>
                        <p className="text-sm text-muted-foreground mt-1">Compradores podem dividir o pagamento</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={allowInstallments}
                        onChange={(e) => setAllowInstallments(e.target.checked)}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
                      />
                    </label>
                  </div>

                  {allowInstallments && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Número Máximo de Parcelas</label>
                          <select 
                            value={maxInstallments}
                            onChange={(e) => setMaxInstallments(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="3">Até 3x sem juros</option>
                            <option value="6">Até 6x sem juros</option>
                            <option value="12">Até 12x sem juros</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Parcela Mínima</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                            <input 
                              type="text" 
                              value={minInstallmentValue}
                              onChange={(e) => setMinInstallmentValue(e.target.value)}
                              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-accent/[0.125] rounded-lg p-5">
                        <p className="text-sm font-medium text-foreground mb-3">Simulação de Parcelamento</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">À vista no PIX</span>
                            <span className="font-semibold text-foreground">R$ {parseFloat(price).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">2x no cartão</span>
                            <span className="font-medium text-foreground">2x de R$ {(parseFloat(price) / 2).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">3x no cartão</span>
                            <span className="font-medium text-foreground">3x de R$ {(parseFloat(price) / 3).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">6x no cartão</span>
                            <span className="font-medium text-foreground">6x de R$ {(parseFloat(price) / 6).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-muted-foreground">12x no cartão</span>
                            <span className="font-medium text-foreground">12x de R$ {(parseFloat(price) / 12).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Payout Config Section */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Configuração de Recebimento</h3>
                  <p className="text-sm text-muted-foreground mt-1">Defina como deseja receber seus ganhos</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Método de Recebimento</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${payoutMethod === 'bank' ? 'border-foreground bg-accent/25' : 'border-border hover:border-muted-foreground'}`}>
                        <input 
                          type="radio" 
                          name="payout-method" 
                          checked={payoutMethod === 'bank'}
                          onChange={() => setPayoutMethod('bank')}
                          className="w-5 h-5 text-primary border-border focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-foreground">Transferência Bancária</p>
                          <p className="text-xs text-muted-foreground mt-1">TED/PIX para sua conta</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${payoutMethod === 'wallet' ? 'border-foreground bg-accent/25' : 'border-border hover:border-muted-foreground'}`}>
                        <input 
                          type="radio" 
                          name="payout-method" 
                          checked={payoutMethod === 'wallet'}
                          onChange={() => setPayoutMethod('wallet')}
                          className="w-5 h-5 text-primary border-border focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-foreground">Carteira Digital</p>
                          <p className="text-xs text-muted-foreground mt-1">PayPal, Mercado Pago</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {payoutMethod === 'bank' && (
                    <div className={`border rounded-lg p-6 space-y-4 ${showValidation && (!bank || !agency || !account || !cpfCnpj) ? 'border-destructive' : 'border-border'}`}>
                      {showValidation && (!bank || !agency || !account || !cpfCnpj) && (
                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg">
                          <p className="text-sm text-destructive flex items-center gap-2">
                            <span className="w-2 h-2 bg-destructive rounded-full"></span>
                            Preencha todos os dados bancários obrigatórios
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="flex items-center justify-between text-sm font-medium text-foreground mb-2">
                          <div className="flex items-center gap-2">
                            <span>Banco</span>
                            <span className="text-destructive">*</span>
                          </div>
                          {showValidation && !bank && (
                            <span className="text-xs text-destructive">Obrigatório</span>
                          )}
                        </label>
                        <select 
                          value={bank}
                          onChange={(e) => setBank(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary ${
                            showValidation && !bank ? 'border-destructive' : bank ? 'border-[hsl(142,35%,50%)]' : 'border-border'
                          }`}
                        >
                          <option value="">Selecione seu banco</option>
                          <option value="bb">Banco do Brasil</option>
                          <option value="bradesco">Bradesco</option>
                          <option value="caixa">Caixa Econômica Federal</option>
                          <option value="itau">Itaú</option>
                          <option value="santander">Santander</option>
                          <option value="nubank">Nubank</option>
                          <option value="inter">Inter</option>
                          <option value="c6">C6 Bank</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Tipo de Conta</label>
                          <select 
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="corrente">Conta Corrente</option>
                            <option value="poupanca">Conta Poupança</option>
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center justify-between text-sm font-medium text-foreground mb-2">
                            <div className="flex items-center gap-2">
                              <span>Agência</span>
                              <span className="text-destructive">*</span>
                            </div>
                            {showValidation && !agency && (
                              <span className="text-xs text-destructive">Obrigatório</span>
                            )}
                          </label>
                          <input 
                            type="text" 
                            placeholder="0000" 
                            value={agency}
                            onChange={(e) => setAgency(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary ${
                              showValidation && !agency ? 'border-destructive' : agency ? 'border-[hsl(142,35%,50%)]' : 'border-border'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="flex items-center justify-between text-sm font-medium text-foreground mb-2">
                            <div className="flex items-center gap-2">
                              <span>Conta</span>
                              <span className="text-destructive">*</span>
                            </div>
                            {showValidation && !account && (
                              <span className="text-xs text-destructive">Obrigatório</span>
                            )}
                          </label>
                          <input 
                            type="text" 
                            placeholder="00000-0" 
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary ${
                              showValidation && !account ? 'border-destructive' : account ? 'border-[hsl(142,35%,50%)]' : 'border-border'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center justify-between text-sm font-medium text-foreground mb-2">
                          <div className="flex items-center gap-2">
                            <span>CPF/CNPJ do Titular</span>
                            <span className="text-destructive">*</span>
                          </div>
                          {showValidation && !cpfCnpj && (
                            <span className="text-xs text-destructive">Obrigatório</span>
                          )}
                        </label>
                        <input 
                          type="text" 
                          placeholder="000.000.000-00" 
                          value={cpfCnpj}
                          onChange={(e) => setCpfCnpj(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary ${
                            showValidation && !cpfCnpj ? 'border-destructive' : cpfCnpj ? 'border-[hsl(142,35%,50%)]' : 'border-border'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Frequência de Repasse</label>
                    <div className="grid grid-cols-3 gap-4">
                      <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${payoutFrequency === 'semanal' ? 'border-foreground' : 'border-border hover:border-muted-foreground'}`}>
                        <input 
                          type="radio" 
                          name="payout-frequency" 
                          checked={payoutFrequency === 'semanal'}
                          onChange={() => setPayoutFrequency('semanal')}
                          className="w-5 h-5 text-primary border-border focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-foreground">Semanal</p>
                          <p className="text-xs text-muted-foreground mt-1">Toda sexta-feira</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${payoutFrequency === 'quinzenal' ? 'border-foreground bg-accent/25' : 'border-border hover:border-muted-foreground'}`}>
                        <input 
                          type="radio" 
                          name="payout-frequency" 
                          checked={payoutFrequency === 'quinzenal'}
                          onChange={() => setPayoutFrequency('quinzenal')}
                          className="w-5 h-5 text-primary border-border focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-foreground">Quinzenal</p>
                          <p className="text-xs text-muted-foreground mt-1">Dias 1 e 15</p>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${payoutFrequency === 'mensal' ? 'border-foreground' : 'border-border hover:border-muted-foreground'}`}>
                        <input 
                          type="radio" 
                          name="payout-frequency" 
                          checked={payoutFrequency === 'mensal'}
                          onChange={() => setPayoutFrequency('mensal')}
                          className="w-5 h-5 text-primary border-border focus:ring-primary"
                        />
                        <div>
                          <p className="font-medium text-foreground">Mensal</p>
                          <p className="text-xs text-muted-foreground mt-1">Todo dia 1</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-[hsl(48,35%,85%)] rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <CalendarCheck className="w-5 h-5 text-[hsl(215,20%,40%)] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Próximo Repasse</p>
                        <p className="text-xs text-muted-foreground">Seu próximo repasse será realizado em 01/12/2025. Os valores ficam disponíveis para saque 7 dias após a confirmação da compra.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Info Section */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Informações Fiscais</h3>
                  <p className="text-sm text-muted-foreground mt-1">Dados para emissão de notas fiscais</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-[hsl(207,35%,92%)] rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[hsl(215,20%,40%)] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Emissão Automática de NF-e</p>
                        <p className="text-xs text-muted-foreground">A plataforma emite automaticamente as notas fiscais para suas vendas. Você receberá uma cópia por e-mail.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CPF/CNPJ</label>
                      <input 
                        type="text" 
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Inscrição Municipal (Opcional)</label>
                      <input 
                        type="text" 
                        value={municipalRegistration}
                        onChange={(e) => setMunicipalRegistration(e.target.value)}
                        placeholder="000000000"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Regime Tributário</label>
                    <select 
                      value={taxRegime}
                      onChange={(e) => setTaxRegime(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="simples">Simples Nacional</option>
                      <option value="presumido">Lucro Presumido</option>
                      <option value="real">Lucro Real</option>
                      <option value="mei">MEI</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Summary Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Resumo do Produto</h3>
                  <div className="space-y-4">
                    <div className="aspect-square bg-[hsl(142,35%,85%)] rounded-lg border border-border flex items-center justify-center">
                      {productData?.cover_image_url ? (
                        <img src={productData.cover_image_url} alt="Capa" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-center p-6">
                          <div className="text-6xl text-muted-foreground mb-2">📚</div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{productData?.title || "Título do eBook"}</h4>
                      <p className="text-sm text-muted-foreground">Categoria: {productData?.category || "Mercado Financeiro"}</p>
                    </div>
                    <div className="pt-4 border-t border-border space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Preço de Venda</span>
                        <span className="font-semibold text-foreground">R$ {parseFloat(price).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Você Recebe</span>
                        <span className="font-semibold text-foreground">R$ {calculateYouReceive().toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Parcelamento</span>
                        <span className="font-medium text-foreground">Até {maxInstallments}x</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Preview Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Formas Aceitas</h3>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${creditCard ? 'bg-accent/25' : 'bg-card border border-border opacity-50'}`}>
                      <CreditCard className={`w-5 h-5 ${creditCard ? 'text-foreground' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${creditCard ? 'text-foreground' : 'text-muted-foreground'}`}>Cartão de Crédito</span>
                      {creditCard && <Check className="w-5 h-5 text-[hsl(142,50%,45%)] ml-auto" />}
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${pix ? 'bg-accent/25' : 'bg-card border border-border opacity-50'}`}>
                      <Barcode className={`w-5 h-5 ${pix ? 'text-foreground' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${pix ? 'text-foreground' : 'text-muted-foreground'}`}>PIX</span>
                      {pix && <Check className="w-5 h-5 text-[hsl(142,50%,45%)] ml-auto" />}
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${boleto ? 'bg-accent/25' : 'bg-card border border-border opacity-50'}`}>
                      <DollarSign className={`w-5 h-5 ${boleto ? 'text-foreground' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${boleto ? 'text-foreground' : 'text-muted-foreground'}`}>Boleto</span>
                      {boleto && <Check className="w-5 h-5 text-[hsl(142,50%,45%)] ml-auto" />}
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${digitalWallet ? 'bg-accent/25' : 'bg-card border border-border opacity-50'}`}>
                      <Wallet className={`w-5 h-5 ${digitalWallet ? 'text-foreground' : 'text-muted-foreground'}`} />
                      <span className={`text-sm ${digitalWallet ? 'text-foreground' : 'text-muted-foreground'}`}>Carteiras Digitais</span>
                      {digitalWallet && <Check className="w-5 h-5 text-[hsl(142,50%,45%)] ml-auto" />}
                    </div>
                  </div>
                </div>

                {/* Checklist Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Lista de Verificação</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                        <Check className="w-3 h-3 text-background" />
                      </div>
                      <span className="text-sm text-foreground">Informações básicas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                        <Check className="w-3 h-3 text-background" />
                      </div>
                      <span className="text-sm text-foreground">Arquivos carregados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full ${parseFloat(price) > 0 ? 'bg-foreground' : 'bg-muted'} flex items-center justify-center`}>
                        <Check className={`w-3 h-3 ${parseFloat(price) > 0 ? 'text-background' : 'text-background'}`} />
                      </div>
                      <span className={`text-sm ${parseFloat(price) > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>Preço definido</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full ${(creditCard || pix || boleto || digitalWallet) ? 'bg-foreground' : 'bg-muted'} flex items-center justify-center`}>
                        <Check className={`w-3 h-3 ${(creditCard || pix || boleto || digitalWallet) ? 'text-background' : 'text-background'}`} />
                      </div>
                      <span className={`text-sm ${(creditCard || pix || boleto || digitalWallet) ? 'text-foreground' : 'text-muted-foreground'}`}>Formas de pagamento</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full ${(bank && agency && account) ? 'bg-foreground' : 'bg-muted'} flex items-center justify-center`}>
                        <Check className={`w-3 h-3 ${(bank && agency && account) ? 'text-background' : 'text-background'}`} />
                      </div>
                      <span className={`text-sm ${(bank && agency && account) ? 'text-foreground' : 'text-muted-foreground'}`}>Dados bancários</span>
                    </div>
                  </div>
                </div>

                {/* Help Card */}
                <div className="bg-[hsl(270,20%,48%,0.5)] rounded-xl border border-border p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <HelpCircle className="w-5 h-5 text-[hsl(215,20%,40%)] flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-semibold text-foreground">Precisa de Ajuda?</h3>
                  </div>
                  <p className="text-sm text-foreground mb-4">Tire suas dúvidas sobre pagamentos e impostos.</p>
                  <Button variant="default" className="w-full gap-2">
                    Falar com Suporte
                  </Button>
                </div>

              </div>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between max-w-7xl">
            <Link to={`/novo-ebook/etapa-2?productId=${productId}`}>
              <button className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors">
                <ChevronLeft className="w-4 h-4 inline mr-2" />
                Voltar para Etapa 2
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSaveDraft}
                className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors"
              >
                Salvar e Sair
              </button>
              <button 
                onClick={handlePublish}
                className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
              >
                Ver Resumo
                <Check className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">© 2025 FinLearn. Todos os direitos reservados.</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
