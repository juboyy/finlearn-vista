import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const WhitepaperAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const whitepapersByCategory: Record<string, Array<{
    title: string;
    author: string;
    category: string;
    date: string;
  }>> = {
    'Tecnologia': [{
      title: 'Open Finance Architecture Standards',
      author: 'Bacen Tech',
      category: 'Tecnologia',
      date: '3 dias atrás'
    }, {
      title: 'AI in Financial Services',
      author: 'Innovation Labs',
      category: 'Inovação',
      date: '1 semana atrás'
    }],
    'Regulação': [{
      title: 'Regulatory Framework for Digital Assets',
      author: 'Global Regulation',
      category: 'Regulação',
      date: '5 dias atrás'
    }],
    'Blockchain': [{
      title: 'Bitcoin: A Peer-to-Peer Electronic Cash System',
      author: 'Satoshi Nakamoto',
      category: 'Blockchain',
      date: 'Hoje'
    }, {
      title: 'Ethereum 2.0: Technical Specifications',
      author: 'Ethereum Foundation',
      category: 'Blockchain',
      date: '2 semanas atrás'
    }],
    'Inovação': [{
      title: 'AI in Financial Services',
      author: 'Innovation Labs',
      category: 'Inovação',
      date: '1 semana atrás'
    }]
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;
    const getData = generateMockDataByPeriod('weekly');

    // Leitura Semanal
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

    Plotly.newPlot('whitepaper-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Whitepapers Lidos' }
    }), { displayModeBar: false });

    // Whitepapers por Categoria
    const categoryValues = [40, 25, 20, 15];
    const categoryLabels = ['Tecnologia', 'Regulação', 'Blockchain', 'Inovação'];
    const initialCategoryValues = new Array(categoryValues.length).fill(0);
    
    const categoriesData = [{
      values: initialCategoryValues,
      labels: categoryLabels,
      type: 'pie',
      hole: 0.4,
      marker: { colors: ['#B8D4E8', '#C5E8D4', '#F4C8D8', '#D8BFD8'] },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value} whitepapers (%{percent})<br><i>Clique para ver detalhes</i><extra></extra>',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white', size: 14 } }
    }];

    Plotly.newPlot('whitepaper-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff',
      hovermode: 'closest'
    }, { displayModeBar: false }).then(() => {
      // Progressive animation for each slice
      categoryValues.forEach((value, index) => {
        setTimeout(() => {
          const animatedValues = [...initialCategoryValues];
          for (let i = 0; i <= index; i++) {
            animatedValues[i] = categoryValues[i];
          }
          Plotly.animate('whitepaper-categories-chart', {
            data: [{ values: animatedValues }]
          }, {
            transition: { duration: 400, easing: 'cubic-in-out' },
            frame: { duration: 400 }
          });
        }, index * 200);
      });
      
      const categoriesChart = document.getElementById('whitepaper-categories-chart');
      if (categoriesChart) {
        categoriesChart.style.cursor = 'pointer';
        (categoriesChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedCategory(label);
          setShowDrillDown(true);
        });
      }
    });

    // Tempo de Leitura
    const getTimeData = generateMockDataByPeriod('completion');
    const currentTimeData = getTimeData(selectedPeriod);
    const comparisonTimeData = comparisonMode ? getTimeData(comparisonPeriod) : null;
    
    const timeTraces = createComparisonBarChart({
      currentData: currentTimeData,
      comparisonData: comparisonTimeData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'bar'
    });

    Plotly.newPlot('whitepaper-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Leitura', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Whitepapers' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Whitepapers Lidos'
    });

    Plotly.newPlot('whitepaper-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Whitepapers Lidos' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Whitepapers</h2>
        <p className="text-slate-600">Seu histórico de leitura de whitepapers técnicos</p>
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
            <span className="text-sm text-slate-500 font-medium">Total Lidos</span>
            <i className="fas fa-file-lines text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">41</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +7 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">82h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +16% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Mensal</span>
            <i className="fas fa-chart-bar text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">6.8</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Whitepapers por mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Destaques</span>
            <i className="fas fa-highlighter text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">87</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Trechos marcados
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">68%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Média de leitura
          </p>
        </div>
      </div>

      {/* Meta + Top Creators Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Meta de Whitepapers do Mês</span>
            <i className="fas fa-target text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-800">41 de 50 whitepapers</p>
                <p className="text-[10px] font-bold text-slate-600">82%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(206,35%,65%)] rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Faltam 9 whitepapers</p>
            <div className="flex items-center gap-1.5 pt-1">
              <i className="fas fa-fire text-orange-500 text-xs"></i>
              <p className="text-[10px] font-bold text-slate-700">Sequência de 7 dias!</p>
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
              <div className="w-7 h-7 rounded-full bg-[hsl(206,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">SN</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Satoshi Nakamoto</p>
                <p className="text-[10px] text-slate-500">8 whitepapers</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">BT</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Bacen Tech</p>
                <p className="text-[10px] text-slate-500">7 whitepapers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Additional Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Downloads</span>
            <i className="fas fa-download text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">32</p>
          <p className="text-xs text-slate-500 font-medium mt-2">PDFs salvos</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Notas</span>
            <i className="fas fa-sticky-note text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">64</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Anotações</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Favoritos</span>
            <i className="fas fa-star text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">15</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Salvos</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">19</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Com colegas</p>
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
              Forte interesse em whitepapers de blockchain e tecnologia. Recomendamos explorar whitepapers de regulação para entender o contexto legal dessas inovações.
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leitura Semanal</h3>
          <div id="whitepaper-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="whitepaper-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura</h3>
          <div id="whitepaper-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="whitepaper-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Whitepapers Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Whitepapers Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Bitcoin: A Peer-to-Peer Electronic Cash System', author: 'Satoshi Nakamoto', category: 'Blockchain', date: 'Hoje' },
            { title: 'Open Finance Architecture Standards', author: 'Bacen Tech', category: 'Tecnologia', date: '3 dias atrás' },
            { title: 'Regulatory Framework for Digital Assets', author: 'Global Regulation', category: 'Regulação', date: '5 dias atrás' },
            { title: 'AI in Financial Services', author: 'Innovation Labs', category: 'Inovação', date: '1 semana atrás' },
            { title: 'Ethereum 2.0: Technical Specifications', author: 'Ethereum Foundation', category: 'Blockchain', date: '2 semanas atrás' }
          ].map((whitepaper, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-lines text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{whitepaper.title}</p>
                  <p className="text-xs text-slate-500">{whitepaper.author} • {whitepaper.category} • {whitepaper.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drill Down Modal */}
      {showDrillDown && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Whitepapers: {selectedCategory}</h3>
              <button 
                onClick={() => setShowDrillDown(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              {whitepapersByCategory[selectedCategory]?.map((whitepaper, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{whitepaper.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">Autor: {whitepaper.author}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><i className="fas fa-file-lines mr-1"></i>{whitepaper.category}</span>
                    <span><i className="fas fa-calendar mr-1"></i>{whitepaper.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};