import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const getCardBrand = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, '');
    
    if (/^4/.test(cleanNumber)) {
      return <i className="fab fa-cc-visa"></i>;
    } else if (/^5[1-5]/.test(cleanNumber)) {
      return <i className="fab fa-cc-mastercard"></i>;
    } else if (/^3[47]/.test(cleanNumber)) {
      return <i className="fab fa-cc-amex"></i>;
    } else if (/^(4011|4312|4389|4514|4576|5041|5066|5067|6277|6362|6363)/.test(cleanNumber)) {
      return <i className="fab fa-cc-elo"></i>;
    }
    return <i className="fas fa-credit-card"></i>;
  };

  const getMaskedCardNumber = () => {
    if (cardNumber.replace(/\s+/g, '').length > 0) {
      return cardNumber;
    }
    return '•••• •••• •••• ••••';
  };

  const formatCPF = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return v;
  };

  const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    
    v = v.replace(/^(\d{2})(\d)/, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    
    return v;
  };

  const formatCEP = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0, 8);
    
    v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    
    return v;
  };

  const handleFinalizarPagamento = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsApproved(true);
    }, 2500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Pagamento Seguro</h1>
                <p className="text-sm text-slate-500 mt-1">Complete suas informações para finalizar a assinatura</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-pastel-green bg-opacity-30 rounded-lg">
                <i className="fas fa-shield-alt text-slate-700"></i>
                <span className="text-sm font-medium text-slate-700">Ambiente Seguro SSL</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              <div className="flex-1 space-y-6">
                <section className="bg-white rounded-xl p-8 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Método de Pagamento</h2>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 rounded-lg hover:bg-opacity-20 transition flex flex-col items-center gap-2">
                      <i className="fas fa-credit-card text-2xl text-slate-700"></i>
                      <span className="text-sm font-medium text-slate-800">Cartão de Crédito</span>
                      <span className="text-xs text-slate-500">Parcelamento disponível</span>
                    </button>
                    
                    <button className="p-4 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition flex flex-col items-center gap-2">
                      <i className="fas fa-barcode text-2xl text-slate-700"></i>
                      <span className="text-sm font-medium text-slate-800">PIX</span>
                      <span className="text-xs text-slate-500">Aprovação instantânea</span>
                    </button>
                    
                    <button className="p-4 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition flex flex-col items-center gap-2">
                      <i className="fas fa-file-invoice text-2xl text-slate-700"></i>
                      <span className="text-sm font-medium text-slate-800">Boleto</span>
                      <span className="text-xs text-slate-500">Vencimento em 3 dias</span>
                    </button>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-8 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Visualização do Cartão</h2>
                  
                  <div className="max-w-sm mx-auto">
                    <div className="rounded-xl p-5 text-white shadow-lg relative overflow-hidden" style={{ background: '#9B8BB3' }}>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div className="w-10 h-8 bg-yellow-300 rounded opacity-80"></div>
                          <i className="fas fa-wifi text-xl opacity-70"></i>
                        </div>
                        
                        <div className="mb-5">
                          <p className="text-xl font-mono tracking-wider mb-1">{getMaskedCardNumber()}</p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs opacity-70 mb-1">Nome do Titular</p>
                            <p className="text-sm font-medium tracking-wide">{cardName || 'SEU NOME AQUI'}</p>
                          </div>
                          <div>
                            <p className="text-xs opacity-70 mb-1">Validade</p>
                            <p className="text-sm font-medium">{cardExpiry || '••/••'}</p>
                          </div>
                          <div className="text-2xl">
                            {cardNumber ? getCardBrand(cardNumber) : <i className="fab fa-cc-visa opacity-80"></i>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-8 border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">Dados do Cartão</h2>
                    <div className="flex gap-2">
                      <i className="fab fa-cc-visa text-3xl text-slate-400"></i>
                      <i className="fab fa-cc-mastercard text-3xl text-slate-400"></i>
                      <i className="fab fa-cc-amex text-3xl text-slate-400"></i>
                      <i className="fab fa-cc-elo text-3xl text-slate-400"></i>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Número do Cartão
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <i className="fas fa-credit-card text-slate-400"></i>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nome do Titular (como está no cartão)
                        <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="JOÃO SILVA"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Validade
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="MM/AA" 
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CVV
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="123" 
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/gi, ''))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <i className="fas fa-question-circle text-slate-400 cursor-help" title="3 dígitos no verso do cartão"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Parcelas
                        </label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition">
                          <option>1x R$ 49,00</option>
                          <option>2x R$ 24,50</option>
                          <option>3x R$ 16,33</option>
                          <option>4x R$ 12,25</option>
                          <option>5x R$ 9,80</option>
                          <option>6x R$ 8,17</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-8 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Dados Pessoais</h2>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nome Completo
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="João Silva Santos" 
                          defaultValue="João Silva"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CPF
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="000.000.000-00" 
                          maxLength={14}
                          onChange={(e) => e.target.value = formatCPF(e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          E-mail
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          placeholder="seu@email.com" 
                          defaultValue="joao.silva@email.com"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Telefone
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          placeholder="(11) 99999-9999" 
                          maxLength={15}
                          onChange={(e) => e.target.value = formatPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Data de Nascimento
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="date"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Gênero
                        </label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition">
                          <option value="">Selecione</option>
                          <option>Masculino</option>
                          <option>Feminino</option>
                          <option>Outro</option>
                          <option>Prefiro não informar</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-8 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Endereço de Cobrança</h2>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CEP
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="00000-000" 
                            maxLength={9}
                            onChange={(e) => e.target.value = formatCEP(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                          />
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pastel-blue hover:text-slate-700 text-sm font-medium">
                            Buscar
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Endereço
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Rua, Avenida, etc"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Número
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="123"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Complemento
                        </label>
                        <input 
                          type="text" 
                          placeholder="Apto, Bloco, Casa, etc"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bairro
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Centro"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Cidade
                          <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="São Paulo"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Estado
                          <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition">
                          <option value="">Selecione</option>
                          <option>AC</option>
                          <option>AL</option>
                          <option>AP</option>
                          <option>AM</option>
                          <option>BA</option>
                          <option>CE</option>
                          <option>DF</option>
                          <option>ES</option>
                          <option>GO</option>
                          <option>MA</option>
                          <option>MT</option>
                          <option>MS</option>
                          <option>MG</option>
                          <option>PA</option>
                          <option>PB</option>
                          <option>PR</option>
                          <option>PE</option>
                          <option>PI</option>
                          <option>RJ</option>
                          <option>RN</option>
                          <option>RS</option>
                          <option>RO</option>
                          <option>RR</option>
                          <option>SC</option>
                          <option selected>SP</option>
                          <option>SE</option>
                          <option>TO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-8 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Termos e Condições</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      <input type="checkbox" required className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                      <span className="text-sm text-slate-700">
                        Li e concordo com os <a href="#" className="text-pastel-blue hover:underline font-medium">Termos de Uso</a> e <a href="#" className="text-pastel-blue hover:underline font-medium">Política de Privacidade</a> da plataforma FinLearn.
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      <input type="checkbox" required className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                      <span className="text-sm text-slate-700">
                        Autorizo a cobrança recorrente da assinatura no cartão de crédito informado. Posso cancelar a qualquer momento sem multa ou taxas adicionais.
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                      <span className="text-sm text-slate-700">
                        Desejo receber novidades, ofertas exclusivas e conteúdos relevantes por e-mail e notificações.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                      <span className="text-sm text-slate-700">
                        Aceito compartilhar dados anônimos para melhoria da plataforma e personalização de conteúdo.
                      </span>
                    </label>
                  </div>
                </section>
              </div>

              <aside className="w-96 space-y-6">
                <section className="bg-white rounded-xl p-6 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Resumo da Compra</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-crown text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">Plano Premium</p>
                        <p className="text-xs text-slate-500 mt-1">Assinatura mensal</p>
                        <p className="text-xs text-slate-500">Ana Costa - Analista Senior</p>
                      </div>
                      <span className="font-semibold text-slate-800">R$ 49,00</span>
                    </div>
                  </div>

                  <div className="space-y-3 py-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium text-slate-800">R$ 49,00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Desconto</span>
                      <span className="font-medium text-pastel-green">-R$ 0,00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Taxas</span>
                      <span className="font-medium text-slate-800">R$ 0,00</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-t border-slate-200 mb-6">
                    <span className="text-lg font-semibold text-slate-800">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-slate-800">R$ 49,00</span>
                      <p className="text-xs text-slate-500 mt-1">/mês</p>
                    </div>
                  </div>

                          <button 
                            onClick={handleFinalizarPagamento}
                            disabled={isProcessing || isApproved}
                            className="w-full px-6 py-4 bg-pastel-blue text-slate-800 rounded-lg font-semibold hover:bg-opacity-80 transition flex items-center justify-center gap-2 mb-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i>
                                <span>Processando Pagamento...</span>
                              </>
                            ) : isApproved ? (
                              <>
                                <i className="fas fa-check-circle"></i>
                                <span>Transação Aprovada!</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-lock"></i>
                                <span>Finalizar Pagamento</span>
                              </>
                            )}
                          </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <i className="fas fa-shield-alt text-pastel-green"></i>
                    <span>Pagamento 100% seguro e criptografado</span>
                  </div>
                </section>

                <section className="bg-pastel-green bg-opacity-20 rounded-xl p-6 border border-pastel-green">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-check-circle text-slate-700 text-xl"></i>
                    <h3 className="font-semibold text-slate-800">O que está incluso</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-pastel-green mt-1 flex-shrink-0"></i>
                      <span>Acesso ilimitado a todos os artigos premium</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-pastel-green mt-1 flex-shrink-0"></i>
                      <span>Webinars mensais ao vivo com especialistas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-pastel-green mt-1 flex-shrink-0"></i>
                      <span>Grupo privado exclusivo no Telegram</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-pastel-green mt-1 flex-shrink-0"></i>
                      <span>Biblioteca de materiais complementares</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-pastel-green mt-1 flex-shrink-0"></i>
                      <span>Certificado de conclusão de cursos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-pastel-green mt-1 flex-shrink-0"></i>
                      <span>Suporte prioritário via chat</span>
                    </li>
                  </ul>
                </section>

                <section className="bg-pastel-yellow bg-opacity-20 rounded-xl p-6 border border-pastel-yellow">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-award text-slate-700 text-xl"></i>
                    <h3 className="font-semibold text-slate-800">Garantia de 7 Dias</h3>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    Se você não ficar satisfeito com o conteúdo, devolvemos 100% do seu dinheiro em até 7 dias após a compra. Sem perguntas, sem complicações.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <i className="fas fa-info-circle"></i>
                    <span>Política de reembolso simples e transparente</span>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-4 text-center">Segurança Garantida</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-shield-alt text-slate-700"></i>
                      </div>
                      <span className="text-xs text-slate-600 text-center">SSL 256-bit</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-lock text-slate-700"></i>
                      </div>
                      <span className="text-xs text-slate-600 text-center">Criptografia</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-check-circle text-slate-700"></i>
                      </div>
                      <span className="text-xs text-slate-600 text-center">PCI DSS</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-slate-500">
                    Seus dados estão protegidos pelos mais altos padrões de segurança da indústria financeira
                  </p>
                </section>

                <section className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-headset text-slate-700"></i>
                    <h3 className="font-semibold text-slate-800">Precisa de Ajuda?</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Nossa equipe está disponível 24/7 para ajudar com qualquer dúvida sobre pagamento ou assinatura.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition flex items-center justify-center gap-2">
                      <i className="fas fa-comments"></i>
                      <span>Chat ao Vivo</span>
                    </button>
                    <button className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition flex items-center justify-center gap-2">
                      <i className="fas fa-phone"></i>
                      <span>Ligar: 0800 123 4567</span>
                    </button>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {isApproved && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scale-in">
            <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-4xl text-slate-700 animate-[scale-in_0.6s_ease-out]"></i>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Pagamento Aprovado!</h2>
            <p className="text-slate-600 mb-2">Sua assinatura Premium foi ativada com sucesso.</p>
            <p className="text-sm text-slate-500 mb-6">Você receberá um e-mail de confirmação em instantes.</p>
            
            <div className="bg-pastel-green bg-opacity-20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Plano</span>
                <span className="font-semibold text-slate-800">Premium Mensal</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Valor</span>
                <span className="font-semibold text-slate-800">R$ 49,00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Próxima cobrança</span>
                <span className="font-medium text-slate-800">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-pastel-green text-slate-800 rounded-lg font-semibold hover:bg-opacity-80 transition mb-3"
            >
              Ir para Dashboard
            </button>
            <button 
              onClick={() => setIsApproved(false)}
              className="w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPayment;
