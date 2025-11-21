import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, FileText, Bookmark, Quote, Users, Download, Share2, SearchX, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function EstudosAcademicos() {
  const [citationValue, setCitationValue] = useState(0);
  const [yearValue, setYearValue] = useState(2024);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Pesquisa Acadêmica</h1>
                <p className="text-sm text-slate-500 mt-1">Explore artigos científicos, papers e estudos do mercado financeiro</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-pen-fancy mr-2"></i>
                  Criar Paper
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <section className="col-span-4 grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-slate-700" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">1,247</h3>
                <p className="text-sm text-slate-500">Papers Disponíveis</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <Bookmark size={24} className="text-slate-700" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">34</h3>
                <p className="text-sm text-slate-500">Salvos para Ler</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <Quote size={24} className="text-slate-700" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">156</h3>
                <p className="text-sm text-slate-500">Citações Coletadas</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Users size={24} className="text-slate-700" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">89</h3>
                <p className="text-sm text-slate-500">Autores Seguidos</p>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Filtros Avançados</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Período de Publicação</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="De" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                      <input type="text" placeholder="Até" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Área de Pesquisa</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" defaultChecked />
                        <span>Mercado de Capitais</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Finanças Corporativas</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Economia Monetária</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Fintech & Inovação</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Regulação Financeira</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Gestão de Riscos</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Banking & Crédito</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Publicação</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Journal Articles</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Working Papers</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Dissertações</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Teses</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Conference Papers</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Impacto do Journal</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                      <option>Todos</option>
                      <option>Alto Impacto (Q1)</option>
                      <option>Médio-Alto Impacto (Q2)</option>
                      <option>Médio Impacto (Q3)</option>
                      <option>Baixo Impacto (Q4)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">Número de Citações</label>
                    <div className="px-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="1000" 
                        value={citationValue} 
                        onChange={(e) => setCitationValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-purple" 
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>0</span>
                        <span>{citationValue === 0 ? 'Todas' : `${citationValue}+`}</span>
                        <span>1000+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Idioma</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                      <option>Todos os idiomas</option>
                      <option>Português</option>
                      <option>Inglês</option>
                      <option>Espanhol</option>
                      <option>Francês</option>
                      <option>Alemão</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">País/Região</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                      <option>Todos os países</option>
                      <option>Brasil</option>
                      <option>Estados Unidos</option>
                      <option>Reino Unido</option>
                      <option>Europa</option>
                      <option>América Latina</option>
                      <option>Ásia</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Acesso</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="radio" name="access" className="w-4 h-4 border-slate-300 text-pastel-purple focus:ring-pastel-purple" defaultChecked />
                        <span>Todos</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="radio" name="access" className="w-4 h-4 border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Acesso Aberto</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="radio" name="access" className="w-4 h-4 border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Acesso Restrito</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Metodologia</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                      <option>Todas</option>
                      <option>Quantitativa</option>
                      <option>Qualitativa</option>
                      <option>Mista</option>
                      <option>Revisão Sistemática</option>
                      <option>Meta-análise</option>
                      <option>Estudo de Caso</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-3 block">Ano de Publicação</label>
                    <div className="px-2">
                      <input 
                        type="range" 
                        min="2000" 
                        max="2024" 
                        value={yearValue} 
                        onChange={(e) => setYearValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-purple" 
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>2000</span>
                        <span>{yearValue}</span>
                        <span>2024</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Instituição</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                      <option>Todas as instituições</option>
                      <option>Universidades Top 50</option>
                      <option>Instituições Brasileiras</option>
                      <option>Business Schools</option>
                      <option>Bancos Centrais</option>
                      <option>Organizações Internacionais</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Relevância Prática</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Com recomendações práticas</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Com dados públicos</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                        <span>Com código disponível</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      Limpar Filtros
                    </button>
                    <button className="flex-1 px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Tópicos em Alta</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-pastel-blue text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">ESG</span>
                  <span className="px-3 py-1.5 bg-pastel-green text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">DeFi</span>
                  <span className="px-3 py-1.5 bg-pastel-yellow text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Machine Learning</span>
                  <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Risk Management</span>
                  <span className="px-3 py-1.5 bg-pastel-pink text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Blockchain</span>
                  <span className="px-3 py-1.5 bg-pastel-peach text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Behavioral Finance</span>
                </div>
              </div>
            </section>

            <section className="col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-slate-800">Resultados</h2>
                  <span className="text-sm text-slate-500">847 artigos encontrados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Ordenar por:</span>
                  <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                    <option>Mais Relevante</option>
                    <option>Mais Recente</option>
                    <option>Mais Citado</option>
                    <option>Maior Impacto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Paper 1 */}
                <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full font-medium">Q1 Journal</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Acesso Aberto</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark size={20} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">Machine Learning Applications in High-Frequency Trading: A Systematic Review</h3>
                  <p className="text-sm text-slate-600 mb-3">Este estudo revisa sistematicamente as aplicações de machine learning em trading de alta frequência, analisando 127 artigos publicados entre 2018-2024...</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span><i className="fas fa-user mr-1"></i>Chen, L. et al.</span>
                    <span><i className="fas fa-calendar mr-1"></i>2024</span>
                    <span><i className="fas fa-quote-right mr-1"></i>342 citações</span>
                    <span><i className="fas fa-book mr-1"></i>Journal of Financial Markets</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Machine Learning</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">HFT</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Algorithmic Trading</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      <Download size={16} className="inline mr-2" />Download PDF
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      Ver Detalhes
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      <Share2 size={16} />
                    </button>
                  </div>
                </article>

                {/* Paper 2 */}
                <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full font-medium">Q2 Journal</span>
                    </div>
                    <button className="text-pastel-purple">
                      <Bookmark size={20} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">ESG Integration in Portfolio Management: Evidence from Emerging Markets</h3>
                  <p className="text-sm text-slate-600 mb-3">Análise empírica do impacto da integração de critérios ESG na performance de portfólios em mercados emergentes, com foco em América Latina e Ásia...</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span><i className="fas fa-user mr-1"></i>Silva, M. & Costa, R.</span>
                    <span><i className="fas fa-calendar mr-1"></i>2024</span>
                    <span><i className="fas fa-quote-right mr-1"></i>87 citações</span>
                    <span><i className="fas fa-book mr-1"></i>Emerging Markets Review</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">ESG</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Portfolio Management</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Emerging Markets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      <Download size={16} className="inline mr-2" />Download PDF
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      Ver Detalhes
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      <Share2 size={16} />
                    </button>
                  </div>
                </article>

                {/* Paper 3 */}
                <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full font-medium">Working Paper</span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Novo</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark size={20} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">Central Bank Digital Currencies: Implications for Monetary Policy and Financial Stability</h3>
                  <p className="text-sm text-slate-600 mb-3">Investigação teórica e empírica sobre os efeitos das CBDCs na transmissão de política monetária e na estabilidade do sistema financeiro...</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span><i className="fas fa-user mr-1"></i>Thompson, J. et al.</span>
                    <span><i className="fas fa-calendar mr-1"></i>2024</span>
                    <span><i className="fas fa-quote-right mr-1"></i>23 citações</span>
                    <span><i className="fas fa-building mr-1"></i>IMF Working Papers</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">CBDC</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Monetary Policy</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Financial Stability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      <Download size={16} className="inline mr-2" />Download PDF
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      Ver Detalhes
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      <Share2 size={16} />
                    </button>
                  </div>
                </article>

                {/* Paper 4 */}
                <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full font-medium">Q1 Journal</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Acesso Aberto</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark size={20} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">DeFi Protocols and Traditional Finance: A Comparative Analysis of Risk Profiles</h3>
                  <p className="text-sm text-slate-600 mb-3">Comparação sistemática entre protocolos DeFi e produtos financeiros tradicionais, focando em perfis de risco, liquidez e retornos ajustados...</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span><i className="fas fa-user mr-1"></i>Park, S. & Kim, H.</span>
                    <span><i className="fas fa-calendar mr-1"></i>2023</span>
                    <span><i className="fas fa-quote-right mr-1"></i>198 citações</span>
                    <span><i className="fas fa-book mr-1"></i>Journal of Financial Economics</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">DeFi</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Risk Analysis</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Blockchain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      <Download size={16} className="inline mr-2" />Download PDF
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      Ver Detalhes
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                      <Share2 size={16} />
                    </button>
                  </div>
                </article>
              </div>
            </section>
          </div>

          {/* Collections Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Coleções Recomendadas</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Explorar mais</a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-landmark text-slate-700 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Finanças Sustentáveis</h3>
                <p className="text-sm text-slate-600 mb-4">Pesquisas sobre ESG, investimentos verdes e finanças climáticas</p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>124 artigos</span>
                  <span><i className="fas fa-users mr-1"></i>4.2k seguidores</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Explorar Coleção
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-robot text-slate-700 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">IA em Finanças</h3>
                <p className="text-sm text-slate-600 mb-4">Machine learning, deep learning e aplicações em trading e análise de risco</p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>63 artigos</span>
                  <span><i className="fas fa-users mr-1"></i>2.8k seguidores</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Explorar Coleção
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-coins text-slate-700 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Criptoeconomia</h3>
                <p className="text-sm text-slate-600 mb-4">Estudos sobre blockchain, criptomoedas, DeFi e tokenização de ativos</p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>89 artigos</span>
                  <span><i className="fas fa-users mr-1"></i>3.4k seguidores</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Explorar Coleção
                </button>
              </div>
            </div>
          </section>

          {/* Top Authors */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Autores Mais Citados</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver ranking completo</a>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Dr. Maria Santos" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-slate-800 mb-1">Dr. Maria Santos</h3>
                <p className="text-xs text-slate-500 mb-3">MIT Sloan School</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>127</span>
                  <span><i className="fas fa-quote-right mr-1"></i>8.9k</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Seguir
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Prof. John Chen" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-slate-800 mb-1">Prof. John Chen</h3>
                <p className="text-xs text-slate-500 mb-3">Stanford GSB</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>94</span>
                  <span><i className="fas fa-quote-right mr-1"></i>7.2k</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Seguir
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Dr. Anna Weber" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-slate-800 mb-1">Dr. Anna Weber</h3>
                <p className="text-xs text-slate-500 mb-3">LSE Economics</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>156</span>
                  <span><i className="fas fa-quote-right mr-1"></i>11.3k</span>
                </div>
                <button className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                  Seguindo
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Prof. Roberto Lima" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-slate-800 mb-1">Prof. Roberto Lima</h3>
                <p className="text-xs text-slate-500 mb-3">FGV EAESP</p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                  <span><i className="fas fa-file-alt mr-1"></i>83</span>
                  <span><i className="fas fa-quote-right mr-1"></i>5.6k</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Seguir
                </button>
              </div>
            </div>
          </section>

          {/* Research Tools */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Ferramentas de Pesquisa</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-search-plus text-slate-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Busca Semântica</h3>
                    <p className="text-xs text-slate-500">Powered by IA</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Encontre papers relacionados por conceitos e significado, não apenas palavras-chave</p>
                <button className="w-full px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Experimentar
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                    <i className="fas fa-project-diagram text-slate-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Mapa de Citações</h3>
                    <p className="text-xs text-slate-500">Visualização interativa</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Explore conexões entre papers e identifique trabalhos fundamentais na área</p>
                <button className="w-full px-4 py-2 bg-pastel-peach text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Ver Mapa
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                    <i className="fas fa-brain text-slate-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Resumo por IA</h3>
                    <p className="text-xs text-slate-500">Compreensão rápida</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Gere resumos automáticos e identifique insights principais de qualquer paper</p>
                <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Ativar IA
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
