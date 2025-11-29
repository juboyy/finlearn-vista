import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";

export const EntrevistasAnalyticsConsumption = () => {
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

    // Visualizações Semanais
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

    Plotly.newPlot('entrevistas-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Entrevistas Vistas' }
    }), { displayModeBar: false });

    // Entrevistas por Categoria
    const categoriesData = [{
      values: [32, 28, 25, 15],
      labels: ['Líderes', 'Especialistas', 'Empreendedores', 'Reguladores'],
      type: 'pie',
      marker: { colors: ['#D8BFD8', '#C5E8D4', '#F4C8D8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('entrevistas-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Visualização
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

    Plotly.newPlot('entrevistas-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Visualização', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Entrevistas' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Entrevistas Vistas'
    });

    Plotly.newPlot('entrevistas-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Entrevistas Vistas' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Entrevistas</h2>
        <p className="text-slate-600">Seu histórico de visualização de entrevistas</p>
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
            <span className="text-sm text-slate-500 font-medium">Total Vistas</span>
            <i className="fas fa-microphone text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">60</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +14 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">42h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +19% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">3.5</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Entrevistas por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Favoritas</span>
            <i className="fas fa-heart text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">18</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Salvas para revisitar
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Visualizações Semanais</h3>
          <div id="entrevistas-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="entrevistas-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Visualização</h3>
          <div id="entrevistas-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="entrevistas-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Entrevistas Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Entrevistas Vistas Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'CEO do Nubank: Futuro dos Bancos Digitais', guest: 'David Vélez', duration: '45 min', date: 'Hoje' },
            { title: 'Especialista em IA fala sobre o futuro', guest: 'Dra. Ana Santos', duration: '38 min', date: 'Ontem' },
            { title: 'Fundador de Fintech conta sua jornada', guest: 'Pedro Oliveira', duration: '52 min', date: '3 dias atrás' },
            { title: 'Presidente do Bacen sobre Open Finance', guest: 'Roberto Campos Neto', duration: '1h 5min', date: '5 dias atrás' },
            { title: 'Liderança Feminina no Mercado Financeiro', guest: 'Profa. Maria Silva', duration: '42 min', date: '1 semana atrás' }
          ].map((entrevista, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-microphone text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{entrevista.title}</p>
                  <p className="text-xs text-slate-500">{entrevista.guest} • {entrevista.duration} • {entrevista.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
