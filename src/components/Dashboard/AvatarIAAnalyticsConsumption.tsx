import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";

export const AvatarIAAnalyticsConsumption = () => {
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

    // Interações Semanais
    const weeklyData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [6, 8, 7, 10, 9, 4, 3],
      type: 'bar',
      marker: { color: '#F4C8D8' }
    }];

    Plotly.newPlot('avatar-weekly-chart', weeklyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Sessões com Avatar IA' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Avatares por Especialidade
    const specialtiesData = [{
      values: [30, 25, 22, 13, 10],
      labels: ['Análise', 'Compliance', 'Educação', 'Estratégia', 'Outros'],
      type: 'pie',
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8', '#F4E4A6'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('avatar-specialties-chart', specialtiesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Sessão
    const timeData = [{
      x: ['0-15 min', '15-30 min', '30-60 min', '60+ min'],
      y: [12, 28, 32, 18],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#F4C8D8'] }
    }];

    Plotly.newPlot('avatar-time-chart', timeData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Sessão' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Sessões' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Engajamento Mensal
    const monthlyData = [{
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [35, 42, 48, 45, 52, 58],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#F4C8D8', width: 3 },
      marker: { size: 8, color: '#F4C8D8' }
    }];

    Plotly.newPlot('avatar-monthly-chart', monthlyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Sessões Realizadas' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Avatar IA</h2>
        <p className="text-slate-600">Seu histórico de interações com avatares de IA</p>
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
            <span className="text-sm text-slate-500 font-medium">Total de Sessões</span>
            <i className="fas fa-robot text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">136</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +28 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">72h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +35% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">9.5</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Sessões por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Perguntas Feitas</span>
            <i className="fas fa-comments text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">542</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Total de interações
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Interações Semanais</h3>
          <div id="avatar-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Especialidade</h3>
          <div id="avatar-specialties-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Sessão</h3>
          <div id="avatar-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="avatar-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Sessões Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Sessões Recentes com Avatar IA</h3>
        <div className="space-y-3">
          {[
            { avatar: 'Agente de Análise', specialty: 'Análise de Dados', duration: '42 min', interactions: 18, date: 'Hoje' },
            { avatar: 'Agente Compliance', specialty: 'Compliance', duration: '35 min', interactions: 12, date: 'Ontem' },
            { avatar: 'Agente Educacional', specialty: 'Educação', duration: '28 min', interactions: 15, date: '2 dias atrás' },
            { avatar: 'Agente Estratégia', specialty: 'Estratégia', duration: '51 min', interactions: 22, date: '3 dias atrás' },
            { avatar: 'Agente de Análise', specialty: 'Análise de Dados', duration: '38 min', interactions: 16, date: '4 dias atrás' }
          ].map((sessao, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-robot text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{sessao.avatar}</p>
                  <p className="text-xs text-slate-500">{sessao.specialty} • {sessao.duration} • {sessao.interactions} interações • {sessao.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
