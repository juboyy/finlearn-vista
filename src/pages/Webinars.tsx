import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { useState } from "react";
import { Bell } from "lucide-react";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos';

export default function Webinars() {
  const [activeTab, setActiveTab] = useState<TabType>('webinars');

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Webinars</h1>
                <p className="text-sm text-slate-500 mt-1">Participe de webinars ao vivo ou assista gravações</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Minha Agenda
                </button>
              </div>
            </div>
          </div>
        </header>

        <MenutabbarFix activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-8">
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

          {/* Upcoming Webinars Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Próximos Webinars</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver calendário completo</a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Upcoming 1 */}
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

              {/* Upcoming 2 */}
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

              {/* Upcoming 3 */}
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

              {/* Upcoming 4 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-peach overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a513b1e75b-99ed197352844b43fc8f.png" alt="Webinar" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-peach rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">NOV</span>
                      <span className="text-xl text-slate-800 font-bold">27</span>
                      <span className="text-xs text-slate-600">15:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-peach text-slate-700 text-xs rounded-full">Derivativos</span>
                      <p className="text-xs text-slate-500 mt-1">1.5h de duração</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Estratégias com Opções</h3>
                  <p className="text-sm text-slate-600 mb-4">Proteção e alavancagem de carteiras</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Lucas Ferreira</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-peach text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              {/* Upcoming 5 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-green overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4a5f932c82-768ee5a79c92adb47abd.png" alt="Webinar" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-green rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">NOV</span>
                      <span className="text-xl text-slate-800 font-bold">29</span>
                      <span className="text-xs text-slate-600">16:30</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Internacional</span>
                      <p className="text-xs text-slate-500 mt-1">2h de duração</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Diversificação Internacional</h3>
                  <p className="text-sm text-slate-600 mb-4">Como investir em mercados globais</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Patricia Oliveira</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              {/* Upcoming 6 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-yellow overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bc3c006ebc-81d26431dd42a47d7715.png" alt="Webinar" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-yellow rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">DEZ</span>
                      <span className="text-xl text-slate-800 font-bold">02</span>
                      <span className="text-xs text-slate-600">11:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full">Compliance</span>
                      <p className="text-xs text-slate-500 mt-1">1.5h de duração</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Novas Regulamentações 2025</h3>
                  <p className="text-sm text-slate-600 mb-4">Mudanças no mercado financeiro</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Dr. Fernando Silva</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Recorded Webinars Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Webinars Gravados</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver biblioteca completa</a>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {/* Recorded 1 */}
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

              {/* Recorded 2 */}
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

              {/* Recorded 3 */}
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

              {/* Recorded 4 */}
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

          {/* My Webinars Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Meus Webinars</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Registered Webinars */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-check text-slate-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Webinars Inscritos</h3>
                    <p className="text-sm text-slate-500">Próximos eventos</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-600 font-bold">20</span>
                        <span className="text-[10px] text-slate-500">NOV</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Cenário Macro 2025</p>
                        <p className="text-xs text-slate-500">14:00 • 2h</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <i className="fas fa-bell"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-600 font-bold">22</span>
                        <span className="text-[10px] text-slate-500">NOV</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">IA no Trading</p>
                        <p className="text-xs text-slate-500">19:00 • 1.5h</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <i className="fas fa-bell"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-pink rounded-lg flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-600 font-bold">25</span>
                        <span className="text-[10px] text-slate-500">NOV</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">ESG e Sustentabilidade</p>
                        <p className="text-xs text-slate-500">10:00 • 2h</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <i className="fas fa-bell"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Watch History */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <i className="fas fa-history text-slate-700 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Histórico de Visualização</h3>
                    <p className="text-sm text-slate-500">Últimos assistidos</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-slate-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Padrões Gráficos Avançados</p>
                        <p className="text-xs text-slate-500">Assistido há 2 dias</p>
                      </div>
                    </div>
                    <button className="text-pastel-blue hover:text-blue-600">
                      <i className="fas fa-redo text-sm"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fab fa-bitcoin text-slate-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Finanças Descentralizadas</p>
                        <p className="text-xs text-slate-500">Assistido há 5 dias</p>
                      </div>
                    </div>
                    <button className="text-pastel-purple hover:text-purple-600">
                      <i className="fas fa-redo text-sm"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-leaf text-slate-600 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Análise Fundamentalista</p>
                        <p className="text-xs text-slate-500">Assistido há 1 semana</p>
                      </div>
                    </div>
                    <button className="text-pastel-green hover:text-green-600">
                      <i className="fas fa-redo text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Speakers Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Palestrantes em Destaque</h2>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Palestrante" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-medium text-slate-800 text-sm mb-1">Dr. Carlos Mendes</h4>
                <p className="text-xs text-slate-500 mb-2">Analista Sênior</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                  <i className="fas fa-video"></i>
                  <span>12 webinars</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Palestrante" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-medium text-slate-800 text-sm mb-1">Ana Paula Costa</h4>
                <p className="text-xs text-slate-500 mb-2">Especialista Blockchain</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                  <i className="fas fa-video"></i>
                  <span>8 webinars</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Palestrante" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-medium text-slate-800 text-sm mb-1">Dr. Roberto Lima</h4>
                <p className="text-xs text-slate-500 mb-2">Expert Macroeconomia</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                  <i className="fas fa-video"></i>
                  <span>15 webinars</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Palestrante" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-medium text-slate-800 text-sm mb-1">Profa. Marina Costa</h4>
                <p className="text-xs text-slate-500 mb-2">Consultora ESG</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                  <i className="fas fa-video"></i>
                  <span>10 webinars</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Palestrante" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-medium text-slate-800 text-sm mb-1">Prof. Ana Santos</h4>
                <p className="text-xs text-slate-500 mb-2">Derivativos</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                  <i className="fas fa-video"></i>
                  <span>9 webinars</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-lg transition">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Palestrante" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="font-medium text-slate-800 text-sm mb-1">Lucas Ferreira</h4>
                <p className="text-xs text-slate-500 mb-2">Trader Profissional</p>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
                  <i className="fas fa-video"></i>
                  <span>11 webinars</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
