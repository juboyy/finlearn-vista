import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, ArrowUpCircle, Check, Plus, Edit, Trash2, Calendar, Coins, Gift, 
  Percent, Download, CreditCard, CheckCircle, TrendingUp, X, Loader2
} from "lucide-react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface CreditCard {
  id: string;
  card_holder_name: string;
  card_number_last4: string;
  card_brand: string;
  expiry_month: string;
  expiry_year: string;
  document_number: string;
  document_type: string;
  is_primary: boolean;
}

export default function Assinaturas() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fadeCurrentPlanRef = useFadeInOnScroll<HTMLElement>();
  const fadePaymentMethodsRef = useFadeInOnScroll<HTMLElement>();
  const fadeBillingSummaryRef = useFadeInOnScroll<HTMLElement>();
  const fadeCouponsRef = useFadeInOnScroll<HTMLElement>();
  const fadeBillingHistoryRef = useFadeInOnScroll<HTMLElement>();

  const [showAddCardSheet, setShowAddCardSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null);

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf");
  const [isPrimary, setIsPrimary] = useState(false);

  // Load cards
  useEffect(() => {
    loadCards();
  }, [user]);

  const loadCards = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('credit_cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCards(data);
    }
  };

  const detectCardBrand = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'discover';
    if (/^(?:2131|1800|35)/.test(cleanNumber)) return 'jcb';
    return 'visa';
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatDocument = (value: string, type: "cpf" | "cnpj"): string => {
    const v = value.replace(/\D/g, '');
    if (type === 'cpf') {
      return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
    } else {
      return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
    }
  };

  const resetForm = () => {
    setCardNumber("");
    setCardHolderName("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    setDocumentNumber("");
    setDocumentType("cpf");
    setIsPrimary(false);
    setEditingCard(null);
  };

  const handleEditCard = (card: CreditCard) => {
    setEditingCard(card);
    setCardNumber(`**** **** **** ${card.card_number_last4}`);
    setCardHolderName(card.card_holder_name);
    setExpiryMonth(card.expiry_month);
    setExpiryYear(card.expiry_year);
    setDocumentNumber(formatDocument(card.document_number, card.document_type as "cpf" | "cnpj"));
    setDocumentType(card.document_type as "cpf" | "cnpj");
    setIsPrimary(card.is_primary);
    setShowAddCardSheet(true);
  };

  const handleSaveCard = async () => {
    if (!user) {
      toast.error("Você precisa estar logado");
      return;
    }

    // For edit mode, card number is not required if not changed
    const isNewCard = !editingCard;
    const cardNumberClean = cardNumber.replace(/[\s*]/g, '');
    
    if (isNewCard && (!cardNumberClean || cardNumberClean.length < 16)) {
      toast.error("Preencha o número do cartão");
      return;
    }

    if (!cardHolderName || !expiryMonth || !expiryYear || !documentNumber) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      // If setting as primary, unset other primary cards first
      if (isPrimary) {
        await supabase
          .from('credit_cards')
          .update({ is_primary: false })
          .eq('user_id', user.id);
      }

      if (editingCard) {
        // Update existing card
        const updateData: Record<string, unknown> = {
          card_holder_name: cardHolderName.toUpperCase(),
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          document_number: documentNumber.replace(/\D/g, ''),
          document_type: documentType,
          is_primary: isPrimary,
        };

        // Only update card number if it was changed (not masked)
        if (!cardNumber.includes('*')) {
          updateData.card_number_last4 = cardNumber.replace(/\s/g, '').slice(-4);
          updateData.card_brand = detectCardBrand(cardNumber);
        }

        const { error } = await supabase
          .from('credit_cards')
          .update(updateData)
          .eq('id', editingCard.id);

        if (error) throw error;
        toast.success("Cartão atualizado com sucesso!");
      } else {
        // Insert new card
        const cardData = {
          user_id: user.id,
          card_holder_name: cardHolderName.toUpperCase(),
          card_number_last4: cardNumber.replace(/\s/g, '').slice(-4),
          card_brand: detectCardBrand(cardNumber),
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          document_number: documentNumber.replace(/\D/g, ''),
          document_type: documentType,
          is_primary: isPrimary || cards.length === 0,
        };

        const { error } = await supabase
          .from('credit_cards')
          .insert(cardData);

        if (error) throw error;
        toast.success("Cartão adicionado com sucesso!");
      }

      await loadCards();
      resetForm();
      setShowAddCardSheet(false);
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error("Erro ao salvar cartão");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const { error } = await supabase
        .from('credit_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;
      
      toast.success("Cartão removido");
      await loadCards();
    } catch (error) {
      toast.error("Erro ao remover cartão");
    }
  };

  const handleSetPrimary = async (cardId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('credit_cards')
        .update({ is_primary: false })
        .eq('user_id', user.id);

      await supabase
        .from('credit_cards')
        .update({ is_primary: true })
        .eq('id', cardId);

      toast.success("Cartão principal atualizado");
      await loadCards();
    } catch (error) {
      toast.error("Erro ao atualizar cartão principal");
    }
  };

  const getCardBrandColor = (brand: string): string => {
    switch (brand) {
      case 'visa': return 'from-[hsl(210,35%,75%)] to-[hsl(210,35%,65%)]';
      case 'mastercard': return 'from-[hsl(30,50%,75%)] to-[hsl(15,60%,65%)]';
      case 'amex': return 'from-[hsl(210,35%,70%)] to-[hsl(220,40%,55%)]';
      default: return 'from-[hsl(270,35%,75%)] to-[hsl(280,35%,65%)]';
    }
  };

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
              <button 
                onClick={() => navigate("/upgrade-plano")}
                className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
              >
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
                <button 
                  onClick={() => setShowAddCardSheet(true)}
                  className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                >
                  <Plus className="inline mr-2" size={18} />
                  Adicionar Cartão
                </button>
              </div>
              <div className="space-y-4">
                {cards.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <CreditCard className="mx-auto mb-3 text-slate-300" size={48} />
                    <p>Nenhum cartão cadastrado</p>
                    <p className="text-sm">Adicione um cartão para facilitar seus pagamentos</p>
                  </div>
                ) : (
                  cards.map((card) => (
                    <div key={card.id} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getCardBrandColor(card.card_brand)} rounded-lg flex items-center justify-center`}>
                        <CreditCard className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 capitalize">{card.card_brand} •••• {card.card_number_last4}</h3>
                        <p className="text-sm text-slate-500">Expira em {card.expiry_month}/{card.expiry_year}</p>
                      </div>
                      {card.is_primary ? (
                        <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Principal</span>
                      ) : (
                        <button 
                          onClick={() => handleSetPrimary(card.id)}
                          className="px-3 py-1 text-slate-600 border border-slate-200 rounded text-xs font-medium hover:bg-slate-50 transition"
                        >
                          Definir como Principal
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditCard(card)}
                          className="p-2 text-slate-600 hover:text-pastel-blue transition"
                          title="Editar cartão"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-2 text-slate-600 hover:text-red-500 transition"
                          title="Excluir cartão"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
              <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center">
                <div className="w-12 h-12 bg-pastel-green rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Percent className="text-slate-700" size={20} />
                </div>
                <h4 className="font-medium text-slate-800 mb-1">FINLEARN20</h4>
                <p className="text-sm text-slate-600 mb-2">20% de desconto</p>
                <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Ativo</span>
              </div>
              <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center opacity-50">
                <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Percent className="text-slate-400" size={20} />
                </div>
                <h4 className="font-medium text-slate-600 mb-1">PROMO15</h4>
                <p className="text-sm text-slate-500 mb-2">15% de desconto</p>
                <span className="px-2 py-1 bg-slate-200 text-slate-500 text-xs rounded-full">Expirado</span>
              </div>
              <div className="p-4 border border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                <button className="text-slate-500 hover:text-slate-700">
                  <Plus size={24} className="mx-auto mb-2" />
                  <span className="text-sm">Adicionar Cupom</span>
                </button>
              </div>
            </div>
          </section>

          <section ref={fadeBillingHistoryRef} className="bg-white rounded-xl p-6 border border-slate-200 opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Histórico de Cobranças</h2>
              <button className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                <Download className="inline mr-2" size={18} />
                Exportar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="pb-3 text-sm font-medium text-slate-600">Data</th>
                    <th className="pb-3 text-sm font-medium text-slate-600">Descrição</th>
                    <th className="pb-3 text-sm font-medium text-slate-600">Valor</th>
                    <th className="pb-3 text-sm font-medium text-slate-600">Status</th>
                    <th className="pb-3 text-sm font-medium text-slate-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 text-sm text-slate-800">16 Nov 2024</td>
                    <td className="py-4 text-sm text-slate-600">Assinatura Premium - Mensal</td>
                    <td className="py-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4">
                      <button className="text-pastel-blue hover:underline text-sm">Ver Recibo</button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 text-sm text-slate-800">16 Out 2024</td>
                    <td className="py-4 text-sm text-slate-600">Assinatura Premium - Mensal</td>
                    <td className="py-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4">
                      <button className="text-pastel-blue hover:underline text-sm">Ver Recibo</button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 text-sm text-slate-800">16 Set 2024</td>
                    <td className="py-4 text-sm text-slate-600">Assinatura Premium - Mensal</td>
                    <td className="py-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4">
                      <button className="text-pastel-blue hover:underline text-sm">Ver Recibo</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm text-slate-800">16 Ago 2024</td>
                    <td className="py-4 text-sm text-slate-600">Assinatura Premium - Mensal</td>
                    <td className="py-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4">
                      <button className="text-pastel-blue hover:underline text-sm">Ver Recibo</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-slate-600">Mostrando 4 de 12 transações</p>
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

      {/* Sheet para Adicionar/Editar Cartão */}
      <Sheet open={showAddCardSheet} onOpenChange={(open) => {
        setShowAddCardSheet(open);
        if (!open) resetForm();
      }}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto bg-slate-50">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {editingCard ? 'Editar Cartão' : 'Adicionar Cartão'}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            {/* Preview do Cartão */}
            <div className="relative w-full h-56 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 p-6 shadow-lg overflow-hidden">
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md"></div>
                <span className="text-white/80 font-bold uppercase text-sm">
                  {detectCardBrand(cardNumber)}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-white/70 text-xs mb-1">Número do Cartão</p>
                <p className="text-white text-lg font-mono tracking-wider">
                  {cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="flex-1">
                  <p className="text-white/70 text-xs mb-1">Titular</p>
                  <p className="text-white text-sm font-medium uppercase truncate max-w-[180px]">
                    {cardHolderName || 'NOME DO TITULAR'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-white/70 text-xs mb-1">Validade</p>
                  <p className="text-white text-sm font-mono whitespace-nowrap">
                    {expiryMonth || 'MM'}/{expiryYear || 'AA'}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground">Número do Cartão *</Label>
                <Input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground">Nome do Titular *</Label>
                <Input
                  type="text"
                  placeholder="Nome como está no cartão"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value.toUpperCase())}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm font-medium text-foreground">Mês *</Label>
                  <Input
                    type="text"
                    placeholder="MM"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    maxLength={2}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Ano *</Label>
                  <Input
                    type="text"
                    placeholder="AA"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    maxLength={2}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">CVV *</Label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Tipo de Documento</Label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="docType"
                      checked={documentType === 'cpf'}
                      onChange={() => {
                        setDocumentType('cpf');
                        setDocumentNumber('');
                      }}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-foreground">CPF</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="docType"
                      checked={documentType === 'cnpj'}
                      onChange={() => {
                        setDocumentType('cnpj');
                        setDocumentNumber('');
                      }}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-foreground">CNPJ</span>
                  </label>
                </div>
                <Input
                  type="text"
                  placeholder={documentType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(formatDocument(e.target.value, documentType))}
                  maxLength={documentType === 'cpf' ? 14 : 18}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm">Definir como cartão principal</p>
                  <p className="text-xs text-muted-foreground">Este cartão será usado como padrão para pagamentos</p>
                </div>
                <Switch
                  checked={isPrimary}
                  onCheckedChange={setIsPrimary}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  resetForm();
                  setShowAddCardSheet(false);
                }}
                className="flex-1 py-3 border border-border rounded-xl font-medium text-foreground hover:bg-muted transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCard}
                disabled={isLoading}
                className="flex-1 py-3 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/90 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  editingCard ? 'Salvar Alterações' : 'Salvar Cartão'
                )}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
