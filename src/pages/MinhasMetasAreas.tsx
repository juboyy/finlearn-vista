import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Check, ChevronRight, Plus, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MinhasMetasAreas() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Áreas de Interesse & Tags</h1>
                <p className="text-sm text-slate-500 mt-1">Personalize seu conteúdo selecionando áreas e tópicos relevantes</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/minhas-metas')} className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                  <ArrowLeft className="inline w-4 h-4 mr-2" />
                  Voltar
                </button>
                <button className="px-6 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-check mr-2"></i>
                  Salvar e Continuar
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="text-pastel-blue w-3 h-3" />
                </div>
                <span className="text-sm text-slate-600">Tipo de Conteúdo</span>
              </div>
              <div className="h-0.5 w-8 bg-pastel-purple"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-pastel-purple rounded-full">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-semibold text-slate-700">2</div>
                <span className="text-sm font-medium text-slate-700">Áreas & Tags</span>
              </div>
              <div className="h-0.5 w-8 bg-slate-200"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-semibold text-slate-500">3</div>
                <span className="text-sm text-slate-500">Notificações</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Áreas Profissionais</h2>
                <p className="text-sm text-slate-500 mt-1">Selecione as áreas do mercado financeiro que você deseja acompanhar</p>
              </div>
              <button className="px-4 py-2 text-pastel-blue border-2 border-pastel-blue rounded-lg font-medium hover:bg-pastel-blue hover:bg-opacity-20 transition">
                <i className="fas fa-magic mr-2"></i>
                Sugerir por Perfil
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'contabilidade', name: 'Contabilidade', icon: 'calculator', color: 'blue', count: 127, checked: true, desc: 'Normas contábeis, demonstrações financeiras, auditoria e compliance' },
                { id: 'juridico', name: 'Jurídico', icon: 'gavel', color: 'purple', count: 89, checked: true, desc: 'Regulamentação, contratos, legislação financeira e direito empresarial' },
                { id: 'financeiro', name: 'Financeiro', icon: 'chart-pie', color: 'green', count: 156, checked: true, desc: 'Gestão financeira, planejamento, análise de investimentos e orçamento' },
                { id: 'tesouraria', name: 'Tesouraria', icon: 'coins', color: 'yellow', count: 73, checked: false, desc: 'Gestão de caixa, liquidez, fluxo de caixa e operações bancárias' },
                { id: 'credito', name: 'Crédito', icon: 'hand-holding-usd', color: 'pink', count: 94, checked: false, desc: 'Análise de crédito, scoring, risco de inadimplência e recuperação' },
                { id: 'riscos', name: 'Gestão de Riscos', icon: 'shield-alt', color: 'peach', count: 112, checked: true, desc: 'Risco de mercado, operacional, compliance e gestão de capital' },
                { id: 'investimentos', name: 'Investimentos', icon: 'chart-line', color: 'blue', count: 145, checked: false, desc: 'Mercado de capitais, renda fixa, renda variável e derivativos' },
                { id: 'pagamentos', name: 'Meios de Pagamento', icon: 'credit-card', color: 'purple', count: 108, checked: true, desc: 'PIX, TED, boletos, cartões e inovações em pagamentos digitais' },
                { id: 'openbanking', name: 'Open Banking', icon: 'plug', color: 'green', count: 67, checked: false, desc: 'APIs, compartilhamento de dados, Open Finance e inovação' },
              ].map((area) => (
                <div key={area.id} className={`bg-white rounded-xl border-2 ${area.checked ? `border-pastel-${area.color}` : 'border-slate-200'} p-5 hover:shadow-lg transition-all cursor-pointer`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-pastel-${area.color} rounded-lg flex items-center justify-center`}>
                        <i className={`fas fa-${area.icon} text-slate-700 text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">{area.name}</h3>
                        <p className="text-xs text-slate-500">{area.count} conteúdos</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={area.checked} className="sr-only peer" />
                      <div className={`w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[1.25rem] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-${area.color}`}></div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Tags & Tópicos Específicos</h2>
                <p className="text-sm text-slate-500 mt-1">Refine ainda mais seu conteúdo com tags específicas</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Buscar ou criar nova tag..." className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple w-64" />
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <i className="fas fa-balance-scale text-slate-700 text-sm"></i>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Regulatório & Compliance</h3>
                  <span className="text-xs text-slate-500">(8 selecionadas)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Basileia III', selected: true },
                    { name: 'BACEN', selected: true },
                    { name: 'CVM', selected: true },
                    { name: 'LGPD', selected: true },
                    { name: 'Resolução CMN', selected: true },
                    { name: 'Sarbanes-Oxley', selected: false },
                    { name: 'PLD/FT', selected: true },
                    { name: 'IFRS', selected: false },
                    { name: 'KYC', selected: true },
                    { name: 'AML', selected: true },
                  ].map((tag) => (
                    <button key={tag.name} className={`px-4 py-2 ${tag.selected ? 'bg-pastel-blue text-slate-700' : 'bg-slate-100 text-slate-600'} rounded-full text-sm font-medium hover:${tag.selected ? 'bg-opacity-80' : 'bg-slate-200'} transition`}>
                      {tag.selected && <i className="fas fa-check mr-1 text-xs"></i>}
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-200 my-6"></div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                    <i className="fas fa-laptop-code text-slate-700 text-sm"></i>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Tecnologia & Inovação</h3>
                  <span className="text-xs text-slate-500">(6 selecionadas)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Inteligência Artificial', selected: true },
                    { name: 'Machine Learning', selected: true },
                    { name: 'Automação', selected: false },
                    { name: 'APIs', selected: true },
                    { name: 'Cloud Computing', selected: true },
                    { name: 'Big Data', selected: false },
                    { name: 'Segurança Digital', selected: true },
                    { name: 'Biometria', selected: false },
                    { name: 'Fintech', selected: true },
                  ].map((tag) => (
                    <button key={tag.name} className={`px-4 py-2 ${tag.selected ? 'bg-pastel-green text-slate-700' : 'bg-slate-100 text-slate-600'} rounded-full text-sm font-medium hover:${tag.selected ? 'bg-opacity-80' : 'bg-slate-200'} transition`}>
                      {tag.selected && <i className="fas fa-check mr-1 text-xs"></i>}
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-200 my-6"></div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-bar text-slate-700 text-sm"></i>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Mercado & Economia</h3>
                  <span className="text-xs text-slate-500">(5 selecionadas)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Taxa SELIC', selected: true },
                    { name: 'Inflação', selected: false },
                    { name: 'Câmbio', selected: true },
                    { name: 'Bolsa de Valores', selected: true },
                    { name: 'Commodities', selected: false },
                    { name: 'Títulos Públicos', selected: true },
                    { name: 'Mercado Futuro', selected: false },
                    { name: 'Análise Técnica', selected: true },
                  ].map((tag) => (
                    <button key={tag.name} className={`px-4 py-2 ${tag.selected ? 'bg-pastel-purple text-slate-700' : 'bg-slate-100 text-slate-600'} rounded-full text-sm font-medium hover:${tag.selected ? 'bg-opacity-80' : 'bg-slate-200'} transition`}>
                      {tag.selected && <i className="fas fa-check mr-1 text-xs"></i>}
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-200 my-6"></div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-users-cog text-slate-700 text-sm"></i>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">Gestão & Estratégia</h3>
                  <span className="text-xs text-slate-500">(4 selecionadas)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Governança Corporativa', selected: true },
                    { name: 'ESG', selected: false },
                    { name: 'Planejamento Estratégico', selected: true },
                    { name: 'KPIs Financeiros', selected: true },
                    { name: 'Balanced Scorecard', selected: false },
                    { name: 'Gestão de Pessoas', selected: true },
                    { name: 'Transformação Digital', selected: false },
                  ].map((tag) => (
                    <button key={tag.name} className={`px-4 py-2 ${tag.selected ? 'bg-pastel-yellow text-slate-700' : 'bg-slate-100 text-slate-600'} rounded-full text-sm font-medium hover:${tag.selected ? 'bg-opacity-80' : 'bg-slate-200'} transition`}>
                      {tag.selected && <i className="fas fa-check mr-1 text-xs"></i>}
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-sliders-h text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Preferências de Conteúdo</h2>
                  <p className="text-sm text-slate-500">Configure como deseja receber e visualizar o conteúdo</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Nível de Profundidade</label>
                  <select className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                    <option>Básico - Introdutório</option>
                    <option selected>Intermediário - Prático</option>
                    <option>Avançado - Especializado</option>
                    <option>Todos os níveis</option>
                  </select>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Idioma Preferencial</label>
                  <select className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                    <option selected>Português (BR)</option>
                    <option>Inglês</option>
                    <option>Espanhol</option>
                    <option>Todos os idiomas</option>
                  </select>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Formato Prioritário</label>
                  <select className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                    <option>Artigos e textos</option>
                    <option>Vídeos e webinars</option>
                    <option>Podcasts e áudios</option>
                    <option selected>Todos os formatos</option>
                  </select>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Duração Preferida</label>
                  <select className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat">
                    <option>Rápido (até 5 min)</option>
                    <option selected>Médio (5-15 min)</option>
                    <option>Longo (15-30 min)</option>
                    <option>Sem preferência</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pastel-blue bg-opacity-20 rounded-xl border border-pastel-blue">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-slate-700 w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-1">Dica de Personalização</p>
                    <p className="text-xs text-slate-800 leading-relaxed">Suas preferências ajudam nosso algoritmo a recomendar o conteúdo mais relevante para você. Você pode ajustar essas configurações a qualquer momento.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">5</p>
                  <p className="text-xs text-slate-500 mt-1">Áreas Ativas</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">23</p>
                  <p className="text-xs text-slate-500 mt-1">Tags Selecionadas</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">450+</p>
                  <p className="text-xs text-slate-500 mt-1">Conteúdos Disponíveis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/minhas-metas')} className="px-5 py-3 text-slate-600 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition">
                  <ArrowLeft className="inline w-4 h-4 mr-2" />
                  Voltar
                </button>
                <button className="px-6 py-3 bg-pastel-purple text-slate-700 rounded-xl font-medium hover:bg-opacity-80 transition">
                  Continuar
                  <ChevronRight className="inline w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
