import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";

export const EstudosAnalyticsConsumption = () => {
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

    // Estudos Semanais
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

    Plotly.newPlot('estudos-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Estudos Lidos' }
    }), { displayModeBar: false });

    // Estudos por Área
    const areasData = [{
      values: [30, 25, 20, 15, 10],
      labels: ['Finanças', 'Economia', 'Tecnologia', 'Regulação', 'Outros'],
      type: 'pie',
      marker: { colors: ['#D8BFD8', '#C5E8D4', '#F4C8D8', '#B8D4E8', '#F4E4A6'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('estudos-areas-chart', areasData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

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

    Plotly.newPlot('estudos-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Leitura', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Estudos' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Estudos Lidos'
    });

    Plotly.newPlot('estudos-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Estudos Lidos' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Estudos Acadêmicos</h2>
        <p className="text-slate-600">Seu histórico de leitura de papers e estudos científicos</p>
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

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Lidos</span>
            <i className="fas fa-graduation-cap text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">43</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +8 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">128h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +22% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Mensal</span>
            <i className="fas fa-chart-bar text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">7.2</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Estudos por mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Citações Salvas</span>
            <i className="fas fa-quote-right text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">124</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Referências marcadas
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Estudos Semanais</h3>
          <div id="estudos-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Área</h3>
          <div id="estudos-areas-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura</h3>
          <div id="estudos-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="estudos-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Estudos Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Estudos Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Machine Learning in Financial Risk Assessment', author: 'Journal of Finance', area: 'Finanças', date: 'Hoje' },
            { title: 'Blockchain Technology and Banking Sector', author: 'MIT Research', area: 'Tecnologia', date: '2 dias atrás' },
            { title: 'Economic Impact of Digital Currencies', author: 'Economic Review', area: 'Economia', date: '4 dias atrás' },
            { title: 'Regulatory Frameworks for Fintech', author: 'Regulation Studies', area: 'Regulação', date: '1 semana atrás' },
            { title: 'AI-Driven Portfolio Management', author: 'Financial Analytics', area: 'Finanças', date: '1 semana atrás' }
          ].map((estudo, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{estudo.title}</p>
                  <p className="text-xs text-slate-500">{estudo.author} • {estudo.area} • {estudo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
