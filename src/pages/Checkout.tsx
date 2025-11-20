import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    podcast: false,
    video: false,
    masterclass: false,
    ebook: false,
    mentoring: false,
  });

  const basePlanPrice = 49.00;
  const addons = {
    podcast: { name: 'Podcasts Exclusivos', price: 19.00 },
    video: { name: 'Vídeo Aulas', price: 29.00 },
    masterclass: { name: 'Masterclass', price: 39.00 },
    ebook: { name: 'E-books Premium', price: 24.00 },
    mentoring: { name: 'Mentoria Individual', price: 99.00 },
  };

  const calculateTotal = () => {
    let totalAddons = 0;
    Object.entries(selectedAddons).forEach(([key, checked]) => {
      if (checked) {
        totalAddons += addons[key as keyof typeof addons].price;
      }
    });
    return basePlanPrice + totalAddons;
  };

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addon]: !prev[addon]
    }));
  };

  const total = calculateTotal();

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
                <h1 className="text-2xl font-semibold text-slate-800">Finalizar Assinatura</h1>
                <p className="text-sm text-slate-500 mt-1">Complete sua assinatura e adicione conteúdos extras</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-pastel-green bg-opacity-30 rounded-lg">
                <i className="fas fa-shield-alt text-slate-700"></i>
                <span className="text-sm font-medium text-slate-700">Pagamento Seguro</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-8">
            <div className="flex-1 space-y-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Plano Selecionado</h2>
                  <button className="text-sm text-pastel-blue hover:text-slate-700 font-medium">
                    Alterar plano
                  </button>
                </div>
                <div className="flex items-start gap-4 p-4 bg-pastel-blue bg-opacity-10 rounded-lg border border-pastel-blue">
                  <div className="w-16 h-16 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-crown text-slate-700 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">Plano Premium</h3>
                      <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium">
                        Mais Popular
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">Assinatura do autor Ana Costa</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <i className="fas fa-check"></i>
                        Todos os artigos premium
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-check"></i>
                        Webinars mensais
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-check"></i>
                        Grupo privado
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800">R$ 49</div>
                    <div className="text-sm text-slate-500">/mês</div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">Adicionar Conteúdos Extras</h2>
                  <p className="text-sm text-slate-500">Aprimore sua experiência com conteúdos complementares</p>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-slate-200 rounded-lg p-5 hover:border-pastel-purple transition">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        id="podcast-addon"
                        checked={selectedAddons.podcast}
                        onChange={() => toggleAddon('podcast')}
                        className="mt-1 w-5 h-5 text-pastel-purple rounded border-slate-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-podcast text-slate-700 text-xl"></i>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="podcast-addon" className="text-lg font-semibold text-slate-800 cursor-pointer">
                              Série de Podcasts Exclusivos
                            </label>
                            <p className="text-sm text-slate-500">12 episódios mensais</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800">+R$ 19</div>
                            <div className="text-xs text-slate-500">/mês</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 ml-16">
                          Acesso a entrevistas exclusivas com especialistas do mercado financeiro, análises aprofundadas e discussões sobre tendências do setor.
                        </p>
                        <div className="flex items-center gap-4 ml-16">
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-microphone text-slate-400"></i>
                            12 episódios/mês
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-clock text-slate-400"></i>
                            30-45 min cada
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-download text-slate-400"></i>
                            Download offline
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-slate-200 rounded-lg p-5 hover:border-pastel-green transition">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        id="video-addon"
                        checked={selectedAddons.video}
                        onChange={() => toggleAddon('video')}
                        className="mt-1 w-5 h-5 text-pastel-green rounded border-slate-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-video text-slate-700 text-xl"></i>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="video-addon" className="text-lg font-semibold text-slate-800 cursor-pointer">
                              Biblioteca de Vídeo Aulas
                            </label>
                            <p className="text-sm text-slate-500">Acesso ilimitado</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800">+R$ 29</div>
                            <div className="text-xs text-slate-500">/mês</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 ml-16">
                          Mais de 150 vídeo aulas sobre regulação financeira, meios de pagamento, PIX e Open Finance. Conteúdo atualizado semanalmente.
                        </p>
                        <div className="flex items-center gap-4 ml-16">
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-play-circle text-slate-400"></i>
                            150+ vídeos
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-certificate text-slate-400"></i>
                            Certificados
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-closed-captioning text-slate-400"></i>
                            Legendas PT/EN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-slate-200 rounded-lg p-5 hover:border-pastel-yellow transition">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        id="masterclass-addon"
                        checked={selectedAddons.masterclass}
                        onChange={() => toggleAddon('masterclass')}
                        className="mt-1 w-5 h-5 text-pastel-yellow rounded border-slate-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-chalkboard-teacher text-slate-700 text-xl"></i>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="masterclass-addon" className="text-lg font-semibold text-slate-800 cursor-pointer">
                              Masterclass Trimestral
                            </label>
                            <p className="text-sm text-slate-500">4 eventos ao vivo por ano</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800">+R$ 39</div>
                            <div className="text-xs text-slate-500">/mês</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 ml-16">
                          Participe de eventos ao vivo trimestrais com duração de 3 horas, incluindo sessões práticas, estudos de caso e networking com outros profissionais.
                        </p>
                        <div className="flex items-center gap-4 ml-16">
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-calendar-alt text-slate-400"></i>
                            4 eventos/ano
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-users text-slate-400"></i>
                            Networking
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-file-alt text-slate-400"></i>
                            Material didático
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-slate-200 rounded-lg p-5 hover:border-pastel-peach transition">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        id="ebook-addon"
                        checked={selectedAddons.ebook}
                        onChange={() => toggleAddon('ebook')}
                        className="mt-1 w-5 h-5 text-pastel-peach rounded border-slate-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-book-open text-slate-700 text-xl"></i>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="ebook-addon" className="text-lg font-semibold text-slate-800 cursor-pointer">
                              Coleção de E-books Premium
                            </label>
                            <p className="text-sm text-slate-500">Acesso completo</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800">+R$ 24</div>
                            <div className="text-xs text-slate-500">/mês</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 ml-16">
                          Biblioteca com mais de 50 e-books sobre regulação financeira, compliance, gestão de riscos e inovação em meios de pagamento.
                        </p>
                        <div className="flex items-center gap-4 ml-16">
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-book text-slate-400"></i>
                            50+ e-books
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-sync text-slate-400"></i>
                            Atualizações mensais
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-mobile-alt text-slate-400"></i>
                            Leitura offline
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-slate-200 rounded-lg p-5 hover:border-pastel-pink transition">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        id="mentoring-addon"
                        checked={selectedAddons.mentoring}
                        onChange={() => toggleAddon('mentoring')}
                        className="mt-1 w-5 h-5 text-pastel-pink rounded border-slate-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-user-tie text-slate-700 text-xl"></i>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="mentoring-addon" className="text-lg font-semibold text-slate-800 cursor-pointer">
                              Sessões de Mentoria Individual
                            </label>
                            <p className="text-sm text-slate-500">2 sessões por mês</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800">+R$ 99</div>
                            <div className="text-xs text-slate-500">/mês</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 ml-16">
                          Sessões individuais de 45 minutos com a autora para discutir casos específicos, tirar dúvidas e receber orientações personalizadas.
                        </p>
                        <div className="flex items-center gap-4 ml-16">
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-video text-slate-400"></i>
                            2 sessões/mês
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-clock text-slate-400"></i>
                            45 min cada
                          </span>
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <i className="fas fa-calendar-check text-slate-400"></i>
                            Agendamento flexível
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                    <span className="text-sm text-slate-600">
                      Concordo com os <a href="#" className="text-pastel-blue hover:underline font-medium">Termos de Uso</a> e <a href="#" className="text-pastel-blue hover:underline font-medium">Política de Privacidade</a>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                    <span className="text-sm text-slate-600">
                      Autorizo a renovação automática da assinatura. Posso cancelar a qualquer momento.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-pastel-blue rounded border-slate-300" />
                    <span className="text-sm text-slate-600">
                      Desejo receber novidades e ofertas exclusivas por e-mail.
                    </span>
                  </label>
                </div>
              </section>
            </div>

            <aside className="w-96 space-y-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200 sticky top-24">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Resumo do Pedido</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <p className="font-medium text-slate-800">Plano Premium</p>
                      <p className="text-xs text-slate-500">Ana Costa</p>
                    </div>
                    <span className="font-semibold text-slate-800">R$ 49,00</span>
                  </div>
                  <div className="space-y-3">
                    {selectedAddons.podcast && (
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Podcasts Exclusivos</p>
                          <p className="text-xs text-slate-500">Add-on</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">R$ 19,00</span>
                      </div>
                    )}
                    {selectedAddons.video && (
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Vídeo Aulas</p>
                          <p className="text-xs text-slate-500">Add-on</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">R$ 29,00</span>
                      </div>
                    )}
                    {selectedAddons.masterclass && (
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Masterclass</p>
                          <p className="text-xs text-slate-500">Add-on</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">R$ 39,00</span>
                      </div>
                    )}
                    {selectedAddons.ebook && (
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <p className="text-sm font-medium text-slate-800">E-books Premium</p>
                          <p className="text-xs text-slate-500">Add-on</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">R$ 24,00</span>
                      </div>
                    )}
                    {selectedAddons.mentoring && (
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Mentoria Individual</p>
                          <p className="text-xs text-slate-500">Add-on</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">R$ 99,00</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3 py-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-800">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Desconto (Anual)</span>
                    <span className="font-medium text-pastel-green">-R$ 0,00</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 border-t border-slate-200 mb-6">
                  <span className="text-lg font-semibold text-slate-800">Total Mensal</span>
                  <span className="text-2xl font-bold text-slate-800">R$ {total.toFixed(2)}</span>
                </div>
                <button onClick={() => navigate('/checkout/payment')} className="w-full px-6 py-4 bg-pastel-blue text-slate-800 rounded-lg font-semibold hover:bg-opacity-80 transition flex items-center justify-center gap-2 mb-3">
                  <i className="fas fa-lock"></i>
                  <span>Avançar Assinatura</span>
                </button>
                <p className="text-xs text-center text-slate-500">
                  Pagamento seguro processado via SSL
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
