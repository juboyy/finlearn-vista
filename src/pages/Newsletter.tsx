import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Settings, BarChart3, Plus, Users, ChevronRight, Calendar, SlidersHorizontal, EllipsisVertical, ChartLine, CreditCard, Scale, Globe, Building, Lightbulb, MailOpen, CheckCircle, Percent, Clock, FileText } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Plotly: any;
  }
}

export default function Newsletter() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load Plotly if not already loaded
    if (!window.Plotly) {
      const script = document.createElement('script');
      script.src = 'https://cdn.plot.ly/plotly-2.24.1.min.js';
      script.async = true;
      script.onload = () => {
        createCharts();
      };
      document.head.appendChild(script);
    } else {
      createCharts();
    }
  }, []);

  const createCharts = () => {
    if (!window.Plotly) return;

    try {
      // Chart 1: Weekly Reads Line Chart
      const weeklyData = [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        y: [4, 2, 6, 3, 7, 5, 8],
        line: {
          color: '#B8D4E8',
          width: 3,
          shape: 'spline'
        },
        marker: {
          color: '#8ab6d6',
          size: 8
        },
        fill: 'tozeroy',
        fillcolor: 'rgba(184, 212, 232, 0.2)'
      }];

      const weeklyLayout = {
        margin: { t: 20, r: 20, b: 40, l: 40 },
        showlegend: false,
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      };

      window.Plotly.newPlot('weekly-reads-chart', weeklyData, weeklyLayout, {
        responsive: true,
        displayModeBar: false
      });

      // Chart 2: Category Reads Bar Chart
      const categoryData = [{
        type: 'bar',
        x: ['Mercado', 'Payments', 'Compliance', 'Economia', 'Banking'],
        y: [45, 30, 25, 35, 20],
        marker: {
          color: ['#B8D4E8', '#D4C5E8', '#C5E8D4', '#E8E0C5', '#E8D4C5']
        }
      }];

      const categoryLayout = {
        margin: { t: 20, r: 20, b: 40, l: 40 },
        showlegend: false,
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      };

      window.Plotly.newPlot('category-reads-chart', categoryData, categoryLayout, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Chart error:", e);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Newsletter</h1>
              <p className="text-sm text-slate-500 mt-1">Mantenha-se atualizado com as principais notícias do mercado financeiro</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/criar-newsletter')}
                className="w-10 h-10 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center" 
                style={{ backgroundColor: '#E8E0C5' }}
              >
                <FileText size={18} className="text-slate-700" />
              </button>
              <button 
                onClick={() => navigate('/newsletter-settings')}
                className="w-10 h-10 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center justify-center"
              >
                <Settings size={18} />
              </button>
              <button 
                onClick={() => navigate('/newsletter-analytics')}
                className="w-10 h-10 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center" 
                style={{ backgroundColor: '#C5E8D4' }}
              >
                <BarChart3 size={18} />
              </button>
              <button 
                onClick={() => navigate('/nova-assinatura')}
                className="px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition" 
                style={{ backgroundColor: '#D4C5E8' }}
              >
                <Plus size={18} className="inline mr-2" />
                Nova Assinatura
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Newsletter Stats */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                  <MailOpen className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+12</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">47</h3>
              <p className="text-sm text-slate-500">Newsletters Lidas</p>
              <p className="text-xs text-slate-600 mt-2">Este mês</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                  <CheckCircle className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">8 ativas</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">8</h3>
              <p className="text-sm text-slate-500">Assinaturas Ativas</p>
              <p className="text-xs text-slate-600 mt-2">5 pagas, 3 gratuitas</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                  <Percent className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">92%</h3>
              <p className="text-sm text-slate-500">Taxa de Abertura</p>
              <p className="text-xs text-slate-600 mt-2">Média mensal</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8E0C5' }}>
                  <Clock className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Próxima</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">2d</h3>
              <p className="text-sm text-slate-500">Próxima Edição</p>
              <p className="text-xs text-slate-600 mt-2">Segunda, 08:00</p>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-slate-700 rounded-lg text-sm font-medium" style={{ backgroundColor: '#B8D4E8' }}>Todas</button>
                <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Assinadas</button>
                <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Disponíveis</button>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <button className="p-4 bg-white rounded-xl hover:shadow-lg transition" style={{ border: '2px solid #B8D4E8' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#B8D4E8' }}>
                  <ChartLine className="text-slate-700" size={18} />
                </div>
                <p className="text-sm font-medium text-slate-800 text-center">Mercado de Capitais</p>
                <p className="text-xs text-slate-500 text-center mt-1">12 newsletters</p>
              </button>

              <button className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#C5E8D4' }}>
                  <Scale className="text-slate-700" size={18} />
                </div>
                <p className="text-sm font-medium text-slate-800 text-center">Regulamentação</p>
                <p className="text-xs text-slate-500 text-center mt-1">8 newsletters</p>
              </button>

              <button className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#D4C5E8' }}>
                  <CreditCard className="text-slate-700" size={18} />
                </div>
                <p className="text-sm font-medium text-slate-800 text-center">Payments</p>
                <p className="text-xs text-slate-500 text-center mt-1">10 newsletters</p>
              </button>

              <button className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#E8E0C5' }}>
                  <Building className="text-slate-700" size={18} />
                </div>
                <p className="text-sm font-medium text-slate-800 text-center">Banking</p>
                <p className="text-xs text-slate-500 text-center mt-1">6 newsletters</p>
              </button>

              <button className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#E8C5D8' }}>
                  <Globe className="text-slate-700" size={18} />
                </div>
                <p className="text-sm font-medium text-slate-800 text-center">Economia Global</p>
                <p className="text-xs text-slate-500 text-center mt-1">9 newsletters</p>
              </button>

              <button className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#E8D4C5' }}>
                  <Lightbulb className="text-slate-700" size={18} />
                </div>
                <p className="text-sm font-medium text-slate-800 text-center">Inovação</p>
                <p className="text-xs text-slate-500 text-center mt-1">7 newsletters</p>
              </button>
            </div>
          </section>

          {/* Featured Newsletters */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Newsletters em Destaque</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver todas <ChevronRight className="inline ml-1" size={16} />
              </a>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                <div className="h-48 overflow-hidden p-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 212, 232, 0.2)' }}>
                  <img className="w-full h-full object-contain" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-cc3eeac0dc56bb648ccb.png" alt="Análise de Mercado" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#B8D4E8' }}>Premium</span>
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#C5E8D4' }}>Semanal</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">Análise de Mercado</h3>
                  <p className="text-sm text-slate-600 mb-4 flex-1">Análises profundas sobre tendências do mercado de capitais, com insights exclusivos.</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={14} />
                        <span>2.4K assinantes</span>
                      </div>
                      <div className="text-sm font-bold text-slate-800">R$ 49/mês</div>
                    </div>
                    <button className="w-full px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#B8D4E8' }}>
                      Assinar Newsletter
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                <div className="h-48 overflow-hidden p-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(197, 232, 212, 0.2)' }}>
                  <img className="w-full h-full object-contain" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-dbb8223ec5d2a88ce637.png" alt="Compliance em Foco" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Gratuita</span>
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#E8E0C5' }}>Quinzenal</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">Compliance em Foco</h3>
                  <p className="text-sm text-slate-600 mb-4 flex-1">Atualizações sobre mudanças regulatórias e melhores práticas de compliance.</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={14} />
                        <span>5.8K assinantes</span>
                      </div>
                      <div className="text-sm font-bold text-green-600">Gratuita</div>
                    </div>
                    <button className="w-full px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#C5E8D4' }}>
                      Assinar Newsletter
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                <div className="h-48 overflow-hidden p-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 197, 232, 0.2)' }}>
                  <img className="w-full h-full object-contain" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-640177462dea5e4389d0.png" alt="Payments Insider" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#D4C5E8' }}>Premium</span>
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#E8C5D8' }}>Semanal</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">Payments Insider</h3>
                  <p className="text-sm text-slate-600 mb-4 flex-1">Novidades do mercado de pagamentos, PIX, Open Finance e tendências.</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={14} />
                        <span>3.2K assinantes</span>
                      </div>
                      <div className="text-sm font-bold text-slate-800">R$ 39/mês</div>
                    </div>
                    <button className="w-full px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#D4C5E8' }}>
                      Assinar Newsletter
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                <div className="h-48 overflow-hidden p-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 224, 197, 0.2)' }}>
                  <img className="w-full h-full object-contain" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-c6cf0c9d44219dd579b3.png" alt="Economia em Números" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Gratuita</span>
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#B8D4E8' }}>Semanal</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">Economia em Números</h3>
                  <p className="text-sm text-slate-600 mb-4 flex-1">Principais indicadores econômicos e análise de cenários.</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={14} />
                        <span>7.1K assinantes</span>
                      </div>
                      <div className="text-sm font-bold text-green-600">Gratuita</div>
                    </div>
                    <button className="w-full px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#E8E0C5' }}>
                      Assinar Newsletter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Subscriptions */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Suas Assinaturas</h2>
              <button 
                onClick={() => navigate('/minhas-assinaturas')}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:opacity-80 transition" 
                style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.5)' }}
              >
                <SlidersHorizontal className="inline mr-2" size={16} />
                Gerenciar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#B8D4E8' }}>
                      <ChartLine className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Análise de Mercado Premium</h3>
                      <p className="text-sm text-slate-600 mb-2">Toda segunda-feira às 08:00</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#B8D4E8' }}>Premium</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Ativa</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <EllipsisVertical size={18} />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Newsletters lidas</span>
                    <span className="font-semibold text-slate-800">18/20</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: '90%', backgroundColor: '#B8D4E8' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Taxa de abertura</span>
                    <span className="font-semibold text-slate-800">95%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                    Ver Arquivo
                  </button>
                  <button className="flex-1 px-4 py-2 text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#B8D4E8' }}>
                    Última Edição
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4C5E8' }}>
                      <CreditCard className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Payments Insider</h3>
                      <p className="text-sm text-slate-600 mb-2">Toda quarta-feira às 09:00</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#D4C5E8' }}>Premium</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Ativa</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <EllipsisVertical size={18} />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Newsletters lidas</span>
                    <span className="font-semibold text-slate-800">15/20</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: '75%', backgroundColor: '#D4C5E8' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Taxa de abertura</span>
                    <span className="font-semibold text-slate-800">88%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                    Ver Arquivo
                  </button>
                  <button className="flex-1 px-4 py-2 text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#D4C5E8' }}>
                    Última Edição
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C5E8D4' }}>
                      <Scale className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Compliance em Foco</h3>
                      <p className="text-sm text-slate-600 mb-2">Quinzenalmente às 10:00</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Gratuita</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Ativa</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <EllipsisVertical size={18} />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Newsletters lidas</span>
                    <span className="font-semibold text-slate-800">8/10</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: '80%', backgroundColor: '#C5E8D4' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Taxa de abertura</span>
                    <span className="font-semibold text-slate-800">92%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                    Ver Arquivo
                  </button>
                  <button className="flex-1 px-4 py-2 text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#C5E8D4' }}>
                    Última Edição
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8E0C5' }}>
                      <Globe className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Economia em Números</h3>
                      <p className="text-sm text-slate-600 mb-2">Toda sexta-feira às 07:00</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Gratuita</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Ativa</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <EllipsisVertical size={18} />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Newsletters lidas</span>
                    <span className="font-semibold text-slate-800">19/20</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: '95%', backgroundColor: '#E8E0C5' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Taxa de abertura</span>
                    <span className="font-semibold text-slate-800">98%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                    Ver Arquivo
                  </button>
                  <button className="flex-1 px-4 py-2 text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#E8E0C5' }}>
                    Última Edição
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Newsletters */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Próximas Edições</h2>
              <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver calendário completo <Calendar className="inline ml-1" size={16} />
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">18</div>
                      <div className="text-xs text-slate-500">DEZ</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                      <ChartLine className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Análise de Mercado Premium</h3>
                      <p className="text-sm text-slate-600">Balanço do ano: principais movimentos do mercado de capitais em 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800 mb-1">Segunda, 08:00</div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Em 2 dias</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-b border-slate-200 hover:bg-slate-50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">20</div>
                      <div className="text-xs text-slate-500">DEZ</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                      <CreditCard className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Payments Insider</h3>
                      <p className="text-sm text-slate-600">Retrospectiva PIX 2024: números e tendências para 2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800 mb-1">Quarta, 09:00</div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Em 4 dias</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-b border-slate-200 hover:bg-slate-50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">22</div>
                      <div className="text-xs text-slate-500">DEZ</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8E0C5' }}>
                      <Globe className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Economia em Números</h3>
                      <p className="text-sm text-slate-600">Indicadores econômicos da semana e projeções para o final do ano</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800 mb-1">Sexta, 07:00</div>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Em 6 dias</span>
                  </div>
                </div>
              </div>

              <div className="p-5 hover:bg-slate-50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">27</div>
                      <div className="text-xs text-slate-500">DEZ</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                      <Scale className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">Compliance em Foco</h3>
                      <p className="text-sm text-slate-600">Mudanças regulatórias para 2025: prepare-se para o novo ano</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800 mb-1">Sexta, 10:00</div>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Em 11 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Archive */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Arquivo de Newsletters</h2>
              <div className="flex gap-2">
                <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Todas as newsletters</option>
                  <option>Análise de Mercado Premium</option>
                  <option>Payments Insider</option>
                  <option>Compliance em Foco</option>
                  <option>Economia em Números</option>
                </select>
                <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Últimos 30 dias</option>
                  <option>Últimos 7 dias</option>
                  <option>Últimos 90 dias</option>
                  <option>Este ano</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                    <ChartLine className="text-slate-700" size={18} />
                  </div>
                  <span className="text-xs text-slate-500">11 Dez, 2024</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Volatilidade no mercado: como se preparar</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">Análise detalhada dos fatores que têm causado oscilações no mercado e estratégias para mitigar riscos.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Análise de Mercado Premium</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Lida</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                    <CreditCard className="text-slate-700" size={18} />
                  </div>
                  <span className="text-xs text-slate-500">13 Dez, 2024</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Novas funcionalidades do PIX em 2025</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">Banco Central anuncia expansão das funcionalidades do PIX com foco em pagamentos internacionais.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Payments Insider</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Lida</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8E0C5' }}>
                    <Globe className="text-slate-700" size={18} />
                  </div>
                  <span className="text-xs text-slate-500">15 Dez, 2024</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">IPCA fecha novembro em 0,39%</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">Inflação acumula 4,87% no ano. Análise dos principais grupos que pressionaram o índice.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Economia em Números</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Lida</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                    <ChartLine className="text-slate-700" size={18} />
                  </div>
                  <span className="text-xs text-slate-500">04 Dez, 2024</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Fundos imobiliários: análise do setor</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">Panorama completo do mercado de FIIs com foco em vacância e rentabilidade dos principais fundos.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Análise de Mercado Premium</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Não lida</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                    <Scale className="text-slate-700" size={18} />
                  </div>
                  <span className="text-xs text-slate-500">06 Dez, 2024</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">CVM atualiza normas sobre fundos</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">Principais mudanças nas regras de divulgação de informações e prestação de contas dos fundos.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Compliance em Foco</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Lida</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                    <CreditCard className="text-slate-700" size={18} />
                  </div>
                  <span className="text-xs text-slate-500">06 Dez, 2024</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Open Finance atinge 40 milhões de usuários</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">Ecossistema de compartilhamento de dados financeiros cresce 180% em relação ao ano anterior.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Payments Insider</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Lida</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                Carregar mais newsletters
              </button>
            </div>
          </section>

          {/* Newsletter Analytics */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Analytics de Leitura</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-slate-700 rounded-lg text-sm font-medium" style={{ backgroundColor: '#B8D4E8' }}>Semanal</button>
                <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Mensal</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Engajamento Semanal</h3>
                <div id="weekly-reads-chart" className="h-[300px] w-full"></div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Leituras por Categoria</h3>
                <div id="category-reads-chart" className="h-[300px] w-full"></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
