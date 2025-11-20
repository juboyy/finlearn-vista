import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { Bell } from "lucide-react";
import { useState } from "react";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'documentos' | 'estudos';

const Aprendizado = () => {
  const [activeTab, setActiveTab] = useState<TabType>('todos');
  
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Hub de Aprendizado</h1>
                <p className="text-sm text-slate-500 mt-1">Explore cursos, webinars, podcasts e aulas com avatares IA</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-plus mr-2"></i>
                  Criar Conteúdo
                </button>
              </div>
            </div>
          </div>
        </header>

        <MenutabbarFix activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-8 pb-32">
          {activeTab === 'todos' && (
            <>

              <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="h-80 bg-pastel-blue overflow-hidden relative">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/deacdd849a-af7a052b4fb4b857dbcf.png" alt="illustration of a financial professional studying market analysis on multiple screens, modern office environment, pastel colors, outlined style" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white text-slate-800 text-sm font-medium rounded-full">
                    Destaque
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">
                    Curso Completo
                  </span>
                  <span className="text-xs text-slate-500">24 aulas • 18h de conteúdo</span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                  Mestrado em Análise de Mercado Financeiro
                </h2>
                <p className="text-slate-600 mb-4">
                  Domine técnicas avançadas de análise técnica e fundamentalista, com estudos de
                  caso reais e interação com avatares IA especializados.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span className="font-medium">4.9</span>
                      <span>(1.2k avaliações)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-users"></i>
                      <span>3.4k alunos</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-pastel-blue text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Começar Agora
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <i className="fas fa-trophy text-slate-600 text-xl"></i>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">Este mês</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">8</h3>
                <p className="text-sm text-slate-500 mb-3">Certificados Conquistados</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Análise Técnica</span>
                    <span className="text-slate-500 font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Gestão de Risco</span>
                    <span className="text-slate-500 font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Outros</span>
                    <span className="text-slate-500 font-bold">3</span>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Ver Certificados
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-slate-600 text-xl"></i>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">Últimos 7 dias</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">127h</h3>
                <p className="text-sm text-slate-500 mb-3">Tempo Total de Estudo</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Vídeo-aulas</span>
                    <span className="text-slate-500 font-bold">82h</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Podcasts</span>
                    <span className="text-slate-500 font-bold">28h</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Leitura</span>
                    <span className="text-slate-500 font-bold">17h</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-arrow-up text-green-600"></i>
                  <span>+12% esta semana</span>
                </div>
              </div>
            </section>
          </div>

          <section className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Continue de Onde Parou</h2>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                  Ver tudo
                </a>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 transition hover:shadow-md">
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9277263dd6-d496ce2f9588a997ccf8.png" alt="illustration of dual monitors displaying complex financial stock market charts, pastel colors, outlined style" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-pastel-purple font-medium">Curso</p>
                        <h3 className="font-semibold text-slate-800 truncate">
                          Análise Técnica Avançada
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          Aula 12: Padrões de Candlestick
                        </p>
                      </div>
                      <button className="w-10 h-10 bg-pastel-blue text-slate-700 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-opacity-80 transition">
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-pastel-purple h-1.5 rounded-full" style={{
                        width: "50%"
                      }}></div>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">50%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 transition hover:shadow-md">
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8627363c2b-a72824be4bec8ab72346.png" alt="illustration of a professional podcast recording studio with a microphone, pastel colors, outlined style" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-pastel-green font-medium">Podcast</p>
                        <h3 className="font-semibold text-slate-800 truncate">
                          Estratégias de Diversificação
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          Episódio 03: Ativos Internacionais
                        </p>
                      </div>
                      <button className="w-10 h-10 bg-pastel-green text-slate-700 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-opacity-80 transition">
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-pastel-green h-1.5 rounded-full" style={{
                        width: "71%"
                      }}></div>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">32:15 / 45:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Meu Progresso</h2>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Meta Semanal</span>
                      <span className="font-medium text-slate-800">12h / 15h</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pastel-blue h-2 rounded-full" style={{
                      width: "80%"
                    }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Cursos Concluídos</span>
                      <span className="font-medium text-slate-800">5</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pastel-purple h-2 rounded-full" style={{
                      width: "50%"
                    }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Certificados</span>
                      <span className="font-medium text-slate-800">2</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pastel-green h-2 rounded-full" style={{
                      width: "30%"
                    }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-base font-semibold text-slate-800 mb-3">Conquistas</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                      <i className="fas fa-trophy text-slate-600 text-xl"></i>
                    </div>
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <i className="fas fa-medal text-slate-600 text-xl"></i>
                    </div>
                    <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                      <i className="fas fa-fire text-slate-600 text-xl"></i>
                    </div>
                    <button className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                      <i className="fas fa-plus text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Cursos em Destaque</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver todos os cursos
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-purple overflow-hidden relative">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f689e1e456-5ddba08158dda1d273b0.png" alt="illustration of cryptocurrency trading charts and digital assets, like bitcoin and ethereum coins, pastel colors, outlined style" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                    Novo
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">
                      Curso
                    </span>
                    <span className="text-xs text-slate-500">16 aulas</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Criptomoedas e Blockchain
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Entenda o funcionamento das criptomoedas, blockchain e o futuro das finanças
                    descentralizadas.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500 text-xs"></i>
                      <span className="font-medium">4.8</span>
                    </div>
                    <span className="text-sm text-slate-500">12h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-pink overflow-hidden relative">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/efca16cd3f-1beea736c47851f428f1.png" alt="illustration of compliance documents and a gavel, representing legal framework for financial markets, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">
                      Curso
                    </span>
                    <span className="text-xs text-slate-500">22 aulas</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Compliance Financeiro Avançado
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Aprenda sobre regulamentação, lavagem de dinheiro, e melhores práticas de
                    compliance no setor financeiro.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500 text-xs"></i>
                      <span className="font-medium">4.7</span>
                    </div>
                    <span className="text-sm text-slate-500">18h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-green overflow-hidden relative">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/43ade140cc-54e09b01d95bfda73dc2.png" alt="illustration of a financial risk management dashboard with charts and a shield icon, pastel colors, outlined style" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                    Popular
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">
                      Curso
                    </span>
                    <span className="text-xs text-slate-500">20 aulas</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Gestão de Riscos Financeiros
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Técnicas e ferramentas para identificar, medir e gerenciar riscos em operações
                    financeiras complexas.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500 text-xs"></i>
                      <span className="font-medium">4.9</span>
                    </div>
                    <span className="text-sm text-slate-500">15h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Webinars Ao Vivo e Gravados</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver agenda completa
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-pastel-yellow rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-600 font-medium">NOV</span>
                    <span className="text-2xl text-slate-800 font-bold">20</span>
                    <span className="text-xs text-slate-600">14:00</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        <i className="fas fa-circle text-red-500 text-[6px] mr-1"></i>Ao Vivo
                      </span>
                      <span className="text-xs text-slate-500">2h de duração</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Cenário Macroeconômico 2025: O que esperar?
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Análise detalhada das tendências econômicas globais e seus impactos nos
                      mercados financeiros.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-user-tie"></i>
                        <span>Dr. Carlos Mendes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fas fa-users"></i>
                        <span>842 inscritos</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Inscrever-se Agora
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-pastel-peach rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-600 font-medium">NOV</span>
                    <span className="text-2xl text-slate-800 font-bold">22</span>
                    <span className="text-xs text-slate-600">19:00</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                        Gravado
                      </span>
                      <span className="text-xs text-slate-500">1.5h de duração</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      IA no Trading: Estratégias Algorítmicas
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Como utilizar inteligência artificial para desenvolver estratégias de trading
                      mais eficientes.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-user-tie"></i>
                        <span>Ana Paula Costa</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fas fa-play"></i>
                        <span>2.1k visualizações</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-pastel-peach text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Assistir Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Podcasts Recomendados</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver biblioteca completa
              </a>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-blue overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="illustration of a microphone with sound waves for a podcast cover, financial market theme, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">Mercados em Foco</h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #142 • 45 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-green overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="illustration of a brain with a lightbulb for an investment strategies podcast cover, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">
                    Investidor Inteligente
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #89 • 52 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-purple overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="illustration of a robot and gears for a fintech podcast cover, technology and finance blend, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">FinTech Brasil</h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #67 • 38 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-pink overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/84f47f0351-d5b7ae096302eba637e5.png" alt="illustration of a globe with financial charts for an economic analysis podcast cover, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">Economia Global</h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #201 • 41 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Aulas com Avatar IA</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Explorar todos avatares
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Classical marble bust of a woman with intelligent features, representing a finance expert. Soft pastel blue background, studio lighting, detailed sculpture." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Prof. Ana Santos</h3>
                    <p className="text-sm text-slate-500">Especialista em Derivativos</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Aulas interativas sobre opções, futuros e estratégias de hedge com feedback em
                  tempo real.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                    <span className="font-medium">4.9</span>
                  </div>
                  <span className="text-xs text-slate-500">12 aulas disponíveis</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Aula
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Classical marble bust of a wise, bearded man, representing a macroeconomics expert. Soft pastel green background, studio lighting, detailed sculpture." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Dr. Roberto Lima</h3>
                    <p className="text-sm text-slate-500">Expert em Macroeconomia</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Discussões aprofundadas sobre política monetária, inflação e ciclos econômicos
                  globais.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                    <span className="font-medium">4.8</span>
                  </div>
                  <span className="text-xs text-slate-500">18 aulas disponíveis</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Aula
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Classical marble bust of a woman with a serene and professional expression, representing an ESG consultant. Soft pastel purple background, studio lighting, detailed sculpture." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Profa. Marina Costa</h3>
                    <p className="text-sm text-slate-500">Consultora de ESG</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Aprenda sobre investimentos sustentáveis, critérios ESG e finanças responsáveis à nível global.        
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                    <span className="font-medium">5.0</span>
                  </div>
                  <span className="text-xs text-slate-500">9 aulas disponíveis</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Aula
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Trilhas de Aprendizagem Populares
              </h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver todas
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Analista de Mercado</h3>
                        <p className="text-sm text-slate-500">Análise técnica e fundamentalista</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                      Popular
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-layer-group"></i>
                      <span>12 Cursos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Ações
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Análise Técnica
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Indicadores
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-pastel-blue text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Trilha
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-coins text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Especialista em Cripto</h3>
                        <p className="text-sm text-slate-500">Criptomoedas, blockchain e DeFi</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      Novo
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-layer-group"></i>
                      <span>8 Cursos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Bitcoin
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      DeFi
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      NFTs
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-pastel-green text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Trilha
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-gavel text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Consultor de Compliance</h3>
                        <p className="text-sm text-slate-500">Regulamentação e conformidade</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-layer-group"></i>
                      <span>15 Cursos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span>4.7</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Regulação
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      AML
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Ética
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-pastel-purple text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Trilha
                </button>
              </div>
            </div>
          </section>
            </>
          )}

          {activeTab === 'podcasts' && (
            <>
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Continue Ouvindo</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-blue">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-1">Mercados em Foco</p>
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Análise Semanal: Volatilidade e Oportunidades</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">28 min restantes</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                          <div className="bg-pastel-blue h-1 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800">
                          <i className="fas fa-play-circle text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-green">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-1">Investidor Inteligente</p>
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Diversificação de Carteira em 2024</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">15 min restantes</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                          <div className="bg-pastel-green h-1 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800">
                          <i className="fas fa-play-circle text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-purple">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-1">FinTech Brasil</p>
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Inovações em Meios de Pagamento</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">22 min restantes</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                          <div className="bg-pastel-purple h-1 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800">
                          <i className="fas fa-play-circle text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Explorar por Categoria</h2>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-pastel-blue rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-chart-line text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Análise de Mercado</h3>
                    <p className="text-sm text-slate-600">48 episódios</p>
                  </div>
                  <div className="bg-pastel-green rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-piggy-bank text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Investimentos</h3>
                    <p className="text-sm text-slate-600">67 episódios</p>
                  </div>
                  <div className="bg-pastel-purple rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-landmark text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Regulação Bancária</h3>
                    <p className="text-sm text-slate-600">32 episódios</p>
                  </div>
                  <div className="bg-pastel-pink rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-gavel text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Compliance</h3>
                    <p className="text-sm text-slate-600">29 episódios</p>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === 'cursos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Cursos</h3>
              <p className="text-slate-600">Explore cursos completos de finanças e investimentos</p>
            </div>
          )}

          {activeTab === 'avatar-ia' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Avatar IA</h3>
              <p className="text-slate-600">Aprenda com avatares de inteligência artificial</p>
            </div>
          )}

          {activeTab === 'ebooks' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-book-open text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">E-books</h3>
              <p className="text-slate-600">Biblioteca digital de e-books especializados</p>
            </div>
          )}

          {activeTab === 'webinars' && (
            <>
              {/* Live Webinars Section */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-800">Ao Vivo Agora</h2>
                    <span className="px-3 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full font-medium flex items-center gap-1.5">
                      <i className="fas fa-circle text-slate-700 text-[6px]"></i>
                      2 webinars ao vivo
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition flex flex-col">
                    <div className="h-64 bg-pastel-yellow overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/195dbdee1c-92ffceb5d806533c0810.png" alt="Webinar ao vivo" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                          <i className="fas fa-circle text-[6px] animate-pulse"></i>
                          AO VIVO
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                          <i className="fas fa-users text-xs"></i>
                          1.2k assistindo
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full">Análise de Mercado</span>
                        <span className="text-xs text-slate-500">• Começou há 15 min</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Análise Semanal do Mercado: Oportunidades e Riscos</h3>
                      <p className="text-sm text-slate-600 mb-4">Discussão em tempo real sobre os principais movimentos do mercado financeiro nesta semana com análise de ações, índices e commodities.</p>
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Palestrante" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-800">Dr. Carlos Mendes</p>
                          <p className="text-xs text-slate-500">Analista Sênior de Mercado</p>
                        </div>
                      </div>
                      <button className="w-full px-6 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto">
                        <i className="fas fa-play"></i>
                        Assistir Agora
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition flex flex-col">
                    <div className="h-64 bg-pastel-green overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/27ff2e3c2c-afb908f73c455f98a798.png" alt="Webinar ao vivo" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                          <i className="fas fa-circle text-[6px] animate-pulse"></i>
                          AO VIVO
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                          <i className="fas fa-users text-xs"></i>
                          842 assistindo
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Criptomoedas</span>
                        <span className="text-xs text-slate-500">• Começou há 32 min</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Bitcoin e Altcoins: Tendências para 2025</h3>
                      <p className="text-sm text-slate-600 mb-4">Análise técnica e fundamentalista do mercado cripto com foco em Bitcoin, Ethereum e principais altcoins promissoras.</p>
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Palestrante" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-800">Ana Paula Costa</p>
                          <p className="text-xs text-slate-500">Especialista em Blockchain</p>
                        </div>
                      </div>
                      <button className="w-full px-6 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto">
                        <i className="fas fa-play"></i>
                        Assistir Agora
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Próximos Webinars */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Próximos Webinars</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver calendário completo</a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-blue overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png" alt="Webinar" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-pastel-blue rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-slate-600 font-medium">NOV</span>
                          <span className="text-xl text-slate-800 font-bold">20</span>
                          <span className="text-xs text-slate-600">14:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Macroeconomia</span>
                          <p className="text-xs text-slate-500 mt-1">2h de duração</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Cenário Macroeconômico 2025</h3>
                      <p className="text-sm text-slate-600 mb-4">O que esperar dos mercados globais</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <i className="fas fa-user-tie"></i>
                        <span>Dr. Roberto Lima</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Inscrever-se
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-purple overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d51e1f0edd-ac69efab786c3927349b.png" alt="Webinar" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-pastel-purple rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-slate-600 font-medium">NOV</span>
                          <span className="text-xl text-slate-800 font-bold">22</span>
                          <span className="text-xs text-slate-600">19:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">Tecnologia</span>
                          <p className="text-xs text-slate-500 mt-1">1.5h de duração</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">IA no Trading Algorítmico</h3>
                      <p className="text-sm text-slate-600 mb-4">Estratégias automatizadas de sucesso</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <i className="fas fa-user-tie"></i>
                        <span>Prof. Ana Santos</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Inscrever-se
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-pink overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0da9896c42-46e32d6de31b8ba9ed03.png" alt="Webinar" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-pastel-pink rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-slate-600 font-medium">NOV</span>
                          <span className="text-xl text-slate-800 font-bold">25</span>
                          <span className="text-xs text-slate-600">10:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">ESG</span>
                          <p className="text-xs text-slate-500 mt-1">2h de duração</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Investimentos Sustentáveis</h3>
                      <p className="text-sm text-slate-600 mb-4">ESG e o futuro das finanças</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <i className="fas fa-user-tie"></i>
                        <span>Profa. Marina Costa</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Inscrever-se
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Webinars Gravados */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Webinars Gravados</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver biblioteca completa</a>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-blue overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a195223fa7-44607092c4e1194c081e.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Análise Técnica</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Padrões Gráficos Avançados</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>1h 45min</span>
                        <span>•</span>
                        <span>2.1k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-purple overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/439b549209-084dc01db5f1c86775de.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">DeFi</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Finanças Descentralizadas</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>2h 15min</span>
                        <span>•</span>
                        <span>1.8k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-pink overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fe841e9543-0d4633567d0a2f089401.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">Gestão de Risco</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Proteção de Carteiras</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>1h 30min</span>
                        <span>•</span>
                        <span>3.2k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-green overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/90085a1f92-3b2f9afbdad1bed10b3b.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Value Investing</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Análise Fundamentalista</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>2h 00min</span>
                        <span>•</span>
                        <span>2.7k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === 'artigos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-newspaper text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Artigos</h3>
              <p className="text-slate-600">Leia artigos aprofundados sobre o mercado financeiro</p>
            </div>
          )}

          {activeTab === 'analises' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Análises</h3>
              <p className="text-slate-600">Análises detalhadas do mercado financeiro</p>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-alt text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Documentos</h3>
              <p className="text-slate-600">Acesse documentos técnicos e regulamentações</p>
            </div>
          )}

          {activeTab === 'estudos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-flask text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Estudos Acadêmicos</h3>
              <p className="text-slate-600">Pesquisas e estudos acadêmicos sobre finanças</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Aprendizado;