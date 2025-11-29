import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";

export const CursosAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const getDataByPeriod = () => {
    const data = {
      '7d': {
        progress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [2, 3, 2, 4, 3, 1, 1] },
        enrolled: 12, hours: 48, certificates: 3, completion: 67
      },
      '30d': {
        progress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [2, 3, 2, 4, 3, 1, 1] },
        enrolled: 12, hours: 48, certificates: 3, completion: 67
      },
      '90d': {
        progress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [3, 4, 3, 5, 4, 2, 2] },
        enrolled: 28, hours: 124, certificates: 8, completion: 71
      },
      '1y': {
        progress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [4, 5, 4, 6, 5, 3, 3] },
        enrolled: 84, hours: 456, certificates: 24, completion: 75
      }
    };
    return data[selectedPeriod];
  };

  const initializeCharts = () => {
    const periodData = getDataByPeriod();
    const Plotly = (window as any).Plotly;

    // Progresso Semanal
    const progressData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [3.2, 2.8, 4.5, 3.8, 2.5, 1.2, 0.8],
      type: 'bar',
      marker: { color: '#F4E4A6' }
    }];

    Plotly.newPlot('cursos-progress-chart', progressData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Horas de Estudo' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Cursos por Categoria
    const categoriesData = [{
      values: [40, 30, 20, 10],
      labels: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance'],
      type: 'pie',
      marker: { colors: ['#F4E4A6', '#C5E8D4', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('cursos-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Taxa de Conclusão de Módulos
    const modulesCompletionData = [{
      x: ['0-25%', '26-50%', '51-75%', '76-100%'],
      y: [8, 15, 22, 35],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#F4E4A6'] }
    }];

    Plotly.newPlot('cursos-modules-chart', modulesCompletionData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Progresso' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Módulos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Certificados por Mês
    const certificatesData = [{
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [1, 2, 1, 3, 2, 3],
      type: 'bar',
      marker: { color: '#F4E4A6' }
    }];

    Plotly.newPlot('cursos-certificates-chart', certificatesData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Certificados' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Cursos</h2>
        <p className="text-slate-600">Acompanhe seu progresso e conquistas em aprendizado</p>
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
            <span className="text-sm text-slate-500 font-medium">Cursos Matriculados</span>
            <i className="fas fa-graduation-cap text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().enrolled}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +3 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Horas de Estudo</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().hours}h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +22% no período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Certificados</span>
            <i className="fas fa-certificate text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().certificates}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Total conquistados
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-trophy text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().completion}%</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            Acima da média
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Progresso Semanal</h3>
          <div id="cursos-progress-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="cursos-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Conclusão de Módulos</h3>
          <div id="cursos-modules-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Certificados Conquistados</h3>
          <div id="cursos-certificates-chart" className="h-64"></div>
        </div>
      </div>

      {/* Cursos em Andamento */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Cursos em Andamento</h3>
        <div className="space-y-3">
          {[
            { name: 'Análise Técnica Avançada', progress: 75, modules: '18/24', hours: '32h' },
            { name: 'Gestão de Riscos Financeiros', progress: 45, modules: '12/20', hours: '28h' },
            { name: 'Derivativos e Hedge', progress: 82, modules: '22/28', hours: '45h' },
            { name: 'Compliance Bancário', progress: 38, modules: '8/16', hours: '18h' },
            { name: 'Open Finance na Prática', progress: 92, modules: '28/30', hours: '42h' }
          ].map((curso, idx) => (
            <div key={idx} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-slate-700"></i>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{curso.name}</p>
                    <p className="text-xs text-slate-500">{curso.modules} módulos • {curso.hours} de conteúdo</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-700">{curso.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-pastel-yellow h-2 rounded-full" style={{ width: `${curso.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};