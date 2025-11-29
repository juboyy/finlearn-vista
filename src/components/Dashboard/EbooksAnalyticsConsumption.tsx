import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const EbooksAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;
    const getData = generateMockDataByPeriod('weekly');

    // Progresso de Leitura
    const currentData = getData(selectedPeriod);
    const comparisonData = comparisonMode ? getData(comparisonPeriod) : null;
    
    const weeklyTraces = createComparisonBarChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'bar'
    });

    Plotly.newPlot('ebooks-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Páginas Lidas' }
    }), { displayModeBar: false });

    // Distribuição por Categoria
    const categoriesData = [{
      values: [35, 28, 22, 15],
      labels: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão'],
      type: 'pie',
      marker: { colors: ['#D8BFD8', '#C5E8D4', '#F4C8D8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('ebooks-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Taxa de Conclusão
    const getCompletionData = generateMockDataByPeriod('completion');
    const currentCompletionData = getCompletionData(selectedPeriod);
    const comparisonCompletionData = comparisonMode ? getCompletionData(comparisonPeriod) : null;
    
    const completionTraces = createComparisonBarChart({
      currentData: currentCompletionData,
      comparisonData: comparisonCompletionData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'bar'
    });

    Plotly.newPlot('ebooks-completion-chart', completionTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Taxa de Conclusão', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'E-books' }
    }), { displayModeBar: false });

    // Tempo de Leitura
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Horas de Leitura'
    });

    Plotly.newPlot('ebooks-time-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Horas' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: E-books</h2>
        <p className="text-slate-600">Análise detalhada do seu histórico de leitura</p>
      </div>

      {/* Filtros de Período */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setSelectedPeriod('7d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '7d'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          7 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('30d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '30d'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          30 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('90d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '90d'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          90 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('1y')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '1y'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          1 ano
        </button>
      </div>

      {/* Main KPIs - 5 cards inline */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">E-books Lidos</span>
            <i className="fas fa-book text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">28</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +22% este período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Páginas Totais</span>
            <i className="fas fa-file-alt text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">1,256</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +18% este período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Diária</span>
            <i className="fas fa-calendar-day text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">32</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Páginas por dia
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Destaques</span>
            <i className="fas fa-highlighter text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">156</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            Passagens destacadas
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">68%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Média da plataforma: 45%
          </p>
        </div>
      </div>

      {/* Meta + Top Authors Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Meta de Leitura do Mês</span>
            <i className="fas fa-target text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-800">6 de 8 e-books</p>
                <p className="text-[10px] font-bold text-slate-600">75%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(280,35%,65%)] rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Faltam 2 e-books</p>
            <div className="flex items-center gap-1.5 pt-1">
              <i className="fas fa-fire text-orange-500 text-xs"></i>
              <p className="text-[10px] font-bold text-slate-700">Sequência de 23 dias!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Autores Mais Lidos</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(206,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">CM</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Dr. Carlos Mendes</p>
                <p className="text-[10px] text-slate-500">3 e-books</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">AS</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Prof. Ana Santos</p>
                <p className="text-[10px] text-slate-500">2 e-books</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Additional Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Anotações</span>
            <i className="fas fa-sticky-note text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">89</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Notas criadas</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Marcadores</span>
            <i className="fas fa-bookmark text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">28</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Páginas marcadas</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">15</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Com sua rede</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Streak Leitura</span>
            <i className="fas fa-medal text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">23 dias</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Consecutivos</p>
        </div>
      </div>

      {/* AI Insights with Agent Avatar */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div className="flex items-start gap-3">
          <img 
            src="/src/assets/auxiliar-do-dia-avatar.png" 
            alt="AI Agent" 
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Insights Personalizados por IA</h3>
            <p className="text-slate-700 leading-relaxed">
              Sua velocidade de leitura de 32 páginas/dia demonstra consistência excepcional. Com 156 destaques criados e 68% de taxa de conclusão, você está 23% acima da média da plataforma. Continue equilibrando temas para manter visão holística do mercado financeiro.
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Progresso de Leitura</h3>
          <div id="ebooks-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="ebooks-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Taxa de Conclusão</h3>
          <div id="ebooks-completion-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura</h3>
          <div id="ebooks-time-chart" className="h-64"></div>
        </div>
      </div>

      {/* E-books Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">E-books Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Open Finance: Guia Completo', author: 'Dr. Carlos Mendes', progress: 88, pages: '245/280', date: 'Hoje' },
            { title: 'Blockchain e Criptomoedas', author: 'Ana Paula Costa', progress: 72, pages: '215/298', date: 'Ontem' },
            { title: 'Gestão de Riscos Financeiros', author: 'Roberto Lima', progress: 100, pages: '320/320', date: '2 dias atrás' },
            { title: 'ESG no Mercado Financeiro', author: 'Marina Costa', progress: 42, pages: '128/305', date: '3 dias atrás' },
            { title: 'Compliance Bancário na Prática', author: 'Prof. João Silva', progress: 75, pages: '180/240', date: '5 dias atrás' }
          ].map((ebook, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-book text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{ebook.title}</p>
                  <p className="text-xs text-slate-500">{ebook.author} • {ebook.pages} páginas • {ebook.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-600">{ebook.progress}%</p>
                  <p className="text-[10px] text-slate-400">concluído</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
