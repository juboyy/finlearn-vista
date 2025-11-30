import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, MapPin, Users, Clock, Info, Mic, CalendarDays, Map, Car, Train, Hotel, Navigation, CheckCircle, Check, X, ArrowRight, Headphones, BarChart, CreditCard, QrCode, Barcode, Building, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutIngresso() {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<"standard" | "vip">("standard");

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        
        {/* Hero Header for Event */}
        <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10"></div>
          {/* Background Image */}
          <img 
            className="w-full h-full object-cover opacity-60" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/372d9f35ca-c1f1d14454d5e0f84436.png" 
            alt="Summit stage illustration"
          />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-pastel-blue text-slate-800 text-xs font-bold rounded-full uppercase tracking-wider">Presencial</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-medium rounded-full">15-17 Março 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">Summit Mercado de Capitais 2025</h1>
            <p className="text-slate-200 text-lg max-w-2xl mb-6">O encontro definitivo para líderes do setor financeiro. Estratégias, regulação e o futuro dos investimentos no Brasil.</p>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="text-pastel-blue" size={16} />
                <span>WTC Events Center, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-pastel-purple" size={16} />
                <span>2.500+ Participantes</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-pastel-green" size={16} />
                <span>3 Dias de Imersão</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-8 relative z-30">
          
          {/* Left Column: Details, Schedule, Speakers */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-pastel-yellow flex items-center justify-center text-sm">
                  <Info className="text-slate-700" size={16} />
                </span>
                Sobre o Evento
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">
                  O <strong>Summit Mercado de Capitais 2025</strong> chega para redefinir as conexões no mercado financeiro brasileiro. Em um cenário de constantes mudanças regulatórias e inovações tecnológicas, reunimos as mentes mais brilhantes para debater o futuro.
                </p>
                <p className="mb-4">
                  Durante três dias intensos, você terá acesso a painéis exclusivos sobre Renda Fixa, Derivativos, IPOs e a evolução do Open Finance. É a oportunidade perfeita para networking de alto nível com gestores, diretores de bancos, reguladores e especialistas.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div className="text-2xl font-bold text-slate-800 mb-1">45+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Palestrantes</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div className="text-2xl font-bold text-slate-800 mb-1">30h</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Conteúdo</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div className="text-2xl font-bold text-slate-800 mb-1">12</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Workshops</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div className="text-2xl font-bold text-slate-800 mb-1">3</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Happy Hours</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Speakers Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-pastel-purple flex items-center justify-center text-sm">
                    <Mic className="text-slate-700" size={16} />
                  </span>
                  Palestrantes Confirmados
                </h2>
                <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Ver todos</a>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Speaker 1 */}
                <div className="group text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-pastel-purple p-1">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Speaker" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition duration-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">Carlos Mendes</h3>
                  <p className="text-xs text-slate-500 mb-1">CEO, FutureBank</p>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">Inovação</span>
                </div>
                {/* Speaker 2 */}
                <div className="group text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-pastel-blue p-1">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Speaker" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition duration-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">Ana Paula Souza</h3>
                  <p className="text-xs text-slate-500 mb-1">Diretora, CVM</p>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">Regulação</span>
                </div>
                {/* Speaker 3 */}
                <div className="group text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-pastel-green p-1">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Speaker" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition duration-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">Roberto Chang</h3>
                  <p className="text-xs text-slate-500 mb-1">Head de Renda Fixa</p>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">Mercados</span>
                </div>
                {/* Speaker 4 */}
                <div className="group text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-pastel-peach p-1">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Speaker" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition duration-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">Mariana Costa</h3>
                  <p className="text-xs text-slate-500 mb-1">Economista Chefe</p>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">Macro</span>
                </div>
              </div>
            </section>

            {/* Schedule Preview */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-pastel-blue flex items-center justify-center text-sm">
                  <CalendarDays className="text-slate-700" size={16} />
                </span>
                Programação em Destaque
              </h2>
              
              <div className="space-y-4">
                {/* Day 1 Item */}
                <div className="flex gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-pastel-blue/20 text-pastel-blue-700 rounded-lg shrink-0">
                    <span className="text-xs font-bold text-slate-600">DIA</span>
                    <span className="text-xl font-bold text-slate-800">15</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-800">Abertura: O Cenário Econômico Global</h4>
                      <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">09:00 - 10:30</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Análise profunda dos impactos das taxas de juros globais no mercado brasileiro.</p>
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-5 h-5 rounded-full" alt="" />
                      <span className="text-xs text-slate-500">Mariana Costa</span>
                    </div>
                  </div>
                </div>
                
                {/* Day 2 Item */}
                <div className="flex gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-pastel-purple/20 text-pastel-purple-700 rounded-lg shrink-0">
                    <span className="text-xs font-bold text-slate-600">DIA</span>
                    <span className="text-xl font-bold text-slate-800">16</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-800">Painel: A Revolução do Pix e Open Finance</h4>
                      <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">14:00 - 15:30</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Como os novos meios de pagamento estão transformando a relação cliente-banco.</p>
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-5 h-5 rounded-full" alt="" />
                      <span className="text-xs text-slate-500">Carlos Mendes + 2 convidados</span>
                    </div>
                  </div>
                </div>

                {/* Day 3 Item */}
                <div className="flex gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-pastel-green/20 text-pastel-green-700 rounded-lg shrink-0">
                    <span className="text-xs font-bold text-slate-600">DIA</span>
                    <span className="text-xl font-bold text-slate-800">17</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-800">Masterclass: Gestão de Ativos em 2025</h4>
                      <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">10:00 - 12:00</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">Estratégias práticas para alocação de portfólio em tempos de volatilidade.</p>
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-5 h-5 rounded-full" alt="" />
                      <span className="text-xs text-slate-500">Roberto Chang</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2 text-slate-600 font-medium text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                Ver programação completa
              </button>
            </section>
            
            {/* Location */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-pastel-peach flex items-center justify-center text-sm">
                  <Map className="text-slate-700" size={16} />
                </span>
                Localização
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64 bg-slate-100 rounded-lg overflow-hidden relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.257635661414!2d-46.69614452375841!3d-23.60629736283738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50cdcd78b711%3A0x600134700774e40!2sWTC%20Events%20Center!5e0!3m2!1sen!2sbr!4v1699999999999!5m2!1sen!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="opacity-80 grayscale hover:grayscale-0 transition duration-500"
                  ></iframe>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">WTC Events Center</h3>
                  <p className="text-slate-600 mb-4">Av. das Nações Unidas, 12551 - Brooklin Novo, São Paulo - SP, 04578-903</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Car className="text-slate-400 mt-1" size={16} />
                      <p className="text-sm text-slate-600">Estacionamento no local com vallet disponível 24h.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Train className="text-slate-400 mt-1" size={16} />
                      <p className="text-sm text-slate-600">A 500m da Estação Berrini (CPTM Linha 9).</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Hotel className="text-slate-400 mt-1" size={16} />
                      <p className="text-sm text-slate-600">Hotel Sheraton integrado ao centro de convenções.</p>
                    </div>
                  </div>
                  <button className="mt-6 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition self-start flex items-center gap-2">
                    <Navigation size={16} />
                    Como chegar
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Tickets & Checkout Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Ticket Selection Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="bg-slate-800 p-4 text-center">
                  <p className="text-white font-medium">Lote 2 terminando em:</p>
                  <div className="flex justify-center gap-2 mt-2 text-white">
                    <div className="bg-slate-700 px-2 py-1 rounded">04d</div>
                    <div className="bg-slate-700 px-2 py-1 rounded">12h</div>
                    <div className="bg-slate-700 px-2 py-1 rounded">30m</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Selecione seu Ingresso</h3>
                  
                  {/* Ticket Option 1 */}
                  <div className="mb-4 relative">
                    <input 
                      type="radio" 
                      name="ticket" 
                      id="ticket-standard" 
                      className="peer hidden" 
                      checked={selectedTicket === "standard"}
                      onChange={() => setSelectedTicket("standard")}
                    />
                    <label 
                      htmlFor="ticket-standard" 
                      className="block border-2 border-slate-200 rounded-lg p-4 cursor-pointer hover:border-pastel-blue peer-checked:border-pastel-blue peer-checked:bg-pastel-blue/10 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-800">Standard Pass</span>
                        <span className="font-bold text-slate-800">R$ 1.290</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">Acesso aos 3 dias de palestras e feira de negócios.</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li className="flex items-center gap-2"><Check className="text-green-500" size={14} /> Kit Boas-vindas</li>
                        <li className="flex items-center gap-2"><Check className="text-green-500" size={14} /> Certificado Digital</li>
                        <li className="flex items-center gap-2"><X className="text-red-300" size={14} /> Acesso Área VIP</li>
                      </ul>
                    </label>
                    <div className="absolute top-4 right-4 hidden peer-checked:block text-pastel-blue-600">
                      <CheckCircle size={20} />
                    </div>
                  </div>

                  {/* Ticket Option 2 */}
                  <div className="mb-6 relative">
                    <input 
                      type="radio" 
                      name="ticket" 
                      id="ticket-vip" 
                      className="peer hidden"
                      checked={selectedTicket === "vip"}
                      onChange={() => setSelectedTicket("vip")}
                    />
                    <label 
                      htmlFor="ticket-vip" 
                      className="block border-2 border-slate-200 rounded-lg p-4 cursor-pointer hover:border-pastel-purple peer-checked:border-pastel-purple peer-checked:bg-pastel-purple/10 transition"
                    >
                      <div className="absolute -top-3 left-4 bg-pastel-purple text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                        Mais Popular
                      </div>
                      <div className="flex justify-between items-start mb-2 mt-1">
                        <span className="font-bold text-slate-800">VIP Experience</span>
                        <span className="font-bold text-slate-800">R$ 2.490</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">Experiência completa com benefícios exclusivos.</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li className="flex items-center gap-2"><Check className="text-green-500" size={14} /> Assentos Reservados</li>
                        <li className="flex items-center gap-2"><Check className="text-green-500" size={14} /> Almoço com Palestrantes</li>
                        <li className="flex items-center gap-2"><Check className="text-green-500" size={14} /> Acesso Lounge VIP</li>
                      </ul>
                    </label>
                    <div className="absolute top-4 right-4 hidden peer-checked:block text-pastel-purple-600">
                      <CheckCircle size={20} />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium text-slate-800">
                        {selectedTicket === "standard" ? "R$ 1.290,00" : "R$ 2.490,00"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-600">Taxa de serviço (5%)</span>
                      <span className="font-medium text-slate-800">
                        {selectedTicket === "standard" ? "R$ 64,50" : "R$ 124,50"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span>{selectedTicket === "standard" ? "R$ 1.354,50" : "R$ 2.614,50"}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
                    <span>Ir para Pagamento</span>
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">Pagamento 100% seguro via Cartão ou PIX</p>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-pastel-yellow/30 rounded-xl p-6 border border-pastel-yellow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pastel-yellow rounded-full flex items-center justify-center shrink-0">
                    <Headphones className="text-slate-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Dúvidas sobre ingressos?</h4>
                    <p className="text-sm text-slate-600 mb-3">Nossa equipe de suporte está pronta para te ajudar a escolher a melhor opção.</p>
                    <a href="#" className="text-sm font-semibold text-slate-800 hover:underline">Falar com consultor</a>
                  </div>
                </div>
              </div>

              {/* Event Stats Card */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h4 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <BarChart className="text-slate-300" size={16} />
                  Informações do Evento
                </h4>
                
                {/* Capacity Progress */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">Vagas Confirmadas</span>
                    <span className="text-sm font-bold text-slate-100">1.847 / 2.500</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-[hsl(206,50%,75%)] h-full rounded-full" style={{ width: "73.88%" }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">73% da capacidade preenchida</p>
                </div>

                {/* Payment Methods */}
                <div className="mb-5 pb-5 border-b border-slate-700">
                  <p className="text-sm font-medium text-slate-200 mb-3">Formas de Pagamento</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-700 p-2 rounded">
                      <CreditCard className="text-slate-400" size={14} />
                      <span>Cartão de Crédito</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-700 p-2 rounded">
                      <QrCode className="text-slate-400" size={14} />
                      <span>PIX</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-700 p-2 rounded">
                      <Barcode className="text-slate-400" size={14} />
                      <span>Boleto</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-700 p-2 rounded">
                      <Building className="text-slate-400" size={14} />
                      <span>Corporativo</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    <Shield className="text-green-400 inline mr-1" size={12} />
                    Parcelamento em até 12x sem juros
                  </p>
                </div>

                {/* Attendees Button */}
                <button className="w-full py-2.5 border-2 border-slate-600 text-slate-200 rounded-lg font-medium text-sm hover:bg-slate-700 hover:border-slate-500 transition flex items-center justify-center gap-2">
                  <Users size={16} />
                  <span>Ver Participantes Confirmados</span>
                </button>
              </div>

              {/* Sponsors Mini */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Patrocínio Master</h4>
                <div className="flex justify-center gap-6 grayscale opacity-70">
                  <div className="h-8 w-20 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">BANK A</div>
                  <div className="h-8 w-20 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">FINTECH B</div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* Partners Section (Full Width) */}
        <section className="max-w-7xl mx-auto px-8 py-12 border-t border-slate-200 mt-8">
          <h3 className="text-center text-slate-500 font-medium mb-8">Realização e Apoio Institucional</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-500">
            <div className="h-12 w-24 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">ANBIMA</div>
            <div className="h-12 w-24 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">B3</div>
            <div className="h-12 w-24 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">FEBRABAN</div>
            <div className="h-12 w-24 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">CVM</div>
            <div className="h-12 w-24 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">ABECS</div>
          </div>
        </section>

      </main>
    </div>
  );
}
