import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";

export const ArtigosAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const getDataByPeriod = (period: '7d' | '30d' | '90d' | '1y') => {
    const data = {
      '7d': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [8, 12, 9, 15, 11, 4, 2] },
        total: 284, growth: 32, avgDaily: 4.2, saved: 47,
        timeData: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [25, 42, 28, 15] },
        monthly: { x: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'], y: [8, 12, 9, 15, 11, 4, 2] }
      },
      '30d': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [32, 42, 36, 52, 44, 18, 12] },
        total: 1142, growth: 128, avgDaily: 16.8, saved: 189,
        timeData: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [98, 168, 112, 62] },
        monthly: { x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], y: [248, 292, 278, 324] }
      },
      '90d': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [92, 113, 98, 142, 125, 56, 38] },
        total: 3382, growth: 385, avgDaily: 18.2, saved: 512,
        timeData: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [282, 472, 338, 182] },
        monthly: { x: ['Mês 1', 'Mês 2', 'Mês 3'], y: [982, 1112, 1288] }
      },
      '1y': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [382, 452, 412, 572, 492, 228, 162] },
        total: 13826, growth: 1568, avgDaily: 19.2, saved: 2184,
        timeData: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [1124, 1892, 1348, 728] },
        monthly: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [982, 1076, 1158, 1212, 1268, 1312, 1372, 1428, 1472, 1532, 1588, 1652] }
      }
    };
    return data[period];
  };

  const initializeCharts = () => {
    const currentData = getDataByPeriod(selectedPeriod);
    const comparisonData = comparisonMode ? getDataByPeriod(comparisonPeriod) : null;
    const Plotly = (window as any).Plotly;
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';

    // Leitura Semanal - with comparison
    const weeklyChartData = [{
      x: currentData.weekly.x,
      y: currentData.weekly.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Artigos Lidos',
      marker: { color: pastelGreen }
    }];

    if (comparisonMode && comparisonData) {
      weeklyChartData.push({
        x: comparisonData.weekly.x,
        y: comparisonData.weekly.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('artigos-weekly-chart', weeklyChartData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: comparisonMode ? 'group' : 'relative',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Tempo de Leitura - with comparison
    const timeChartData = [{
      x: currentData.timeData.x,
      y: currentData.timeData.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Artigos',
      marker: { color: pastelGreen }
    }];

    if (comparisonMode && comparisonData) {
      timeChartData.push({
        x: comparisonData.timeData.x,
        y: comparisonData.timeData.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('artigos-time-chart', timeChartData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Leitura' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: comparisonMode ? 'group' : 'relative',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Engajamento Mensal - with comparison
    const monthlyChartData = [{
      x: currentData.monthly.x,
      y: currentData.monthly.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Artigos',
      line: { color: pastelGreen, width: 3 },
      marker: { size: 8, color: pastelGreen }
    }];

    if (comparisonMode && comparisonData) {
      monthlyChartData.push({
        x: comparisonData.monthly.x,
        y: comparisonData.monthly.y,
        type: 'scatter',
        mode: 'lines+markers',
        name: getPeriodLabel(comparisonPeriod),
        line: { color: pastelPurple, width: 3, dash: 'dash' },
        marker: { size: 8, color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('artigos-monthly-chart', monthlyChartData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Artigos por Tema (Pie Chart não precisa de comparação)
    const topicsData = [{
      values: [32, 25, 20, 13, 10],
      labels: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'],
      type: 'pie',
      marker: { colors: ['#B8D4E8', '#C5E8D4', '#F4C8D8', '#D8BFD8', '#F4E4A6'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('artigos-topics-chart', topicsData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Artigos</h2>
        <p className="text-slate-600">Seu histórico de leitura e temas de interesse</p>
      </div>

      {/* Period Comparison Toggle */}
      <PeriodComparisonToggle
        comparisonMode={comparisonMode}
        setComparisonMode={setComparisonMode}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        comparisonPeriod={comparisonPeriod}
        setComparisonPeriod={setComparisonPeriod}
      />

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Lidos</span>
            <i className="fas fa-newspaper text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod(selectedPeriod).total}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +{getDataByPeriod(selectedPeriod).growth} no período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">86h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +15% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Diária</span>
            <i className="fas fa-chart-bar text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod(selectedPeriod).avgDaily}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Artigos por dia
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Salvos</span>
            <i className="fas fa-bookmark text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod(selectedPeriod).saved}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Para ler depois
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leitura Semanal</h3>
          <div id="artigos-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Tema</h3>
          <div id="artigos-topics-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura</h3>
          <div id="artigos-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="artigos-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Artigos Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Artigos Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Nova Resolução do Bacen sobre Open Finance', author: 'Banco Central', time: '8 min', date: 'Hoje' },
            { title: 'IA Generativa no Setor Financeiro', author: 'Tech Finance', time: '12 min', date: 'Ontem' },
            { title: 'Cenário Regulatório para Fintechs 2025', author: 'Regulação Brasil', time: '15 min', date: '2 dias atrás' },
            { title: 'ESG e Investimentos Sustentáveis', author: 'Mercado Sustentável', time: '10 min', date: '3 dias atrás' },
            { title: 'Blockchain em Pagamentos Instantâneos', author: 'Crypto Finance', time: '18 min', date: '4 dias atrás' }
          ].map((artigo, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-newspaper text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{artigo.title}</p>
                  <p className="text-xs text-slate-500">{artigo.author} • {artigo.time} • {artigo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
