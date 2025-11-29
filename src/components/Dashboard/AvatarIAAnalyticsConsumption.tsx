import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const AvatarIAAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const avatarsBySpecialty: Record<string, Array<{
    avatar: string;
    specialty: string;
    duration: string;
    interactions: number;
    date: string;
  }>> = {
    'Análise': [{
      avatar: 'Agente de Análise',
      specialty: 'Análise de Dados',
      duration: '42 min',
      interactions: 18,
      date: 'Hoje'
    }, {
      avatar: 'Agente de Análise',
      specialty: 'Análise de Dados',
      duration: '38 min',
      interactions: 16,
      date: '4 dias atrás'
    }],
    'Compliance': [{
      avatar: 'Agente Compliance',
      specialty: 'Compliance',
      duration: '35 min',
      interactions: 12,
      date: 'Ontem'
    }],
    'Educação': [{
      avatar: 'Agente Educacional',
      specialty: 'Educação',
      duration: '28 min',
      interactions: 15,
      date: '2 dias atrás'
    }],
    'Estratégia': [{
      avatar: 'Agente Estratégia',
      specialty: 'Estratégia',
      duration: '51 min',
      interactions: 22,
      date: '3 dias atrás'
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

    // Interações Semanais
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

    Plotly.newPlot('avatar-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Sessões com Avatar IA' }
    }), { displayModeBar: false });

    // Avatares por Especialidade
    const specialtiesData = [{
      values: [30, 25, 22, 13, 10],
      labels: ['Análise', 'Compliance', 'Educação', 'Estratégia', 'Outros'],
      type: 'pie',
      hole: 0.4,
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8', '#F4E4A6'] },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value} sessões (%{percent})<br><i>Clique para ver detalhes</i><extra></extra>',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white', size: 14 } }
    }];

    Plotly.newPlot('avatar-specialties-chart', specialtiesData, {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff',
      hovermode: 'closest'
    }, { displayModeBar: false }).then(() => {
      const specialtiesChart = document.getElementById('avatar-specialties-chart');
      if (specialtiesChart) {
        specialtiesChart.style.cursor = 'pointer';
        (specialtiesChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedSpecialty(label);
          setShowDrillDown(true);
        });
      }
    });

    // Tempo de Sessão
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

    Plotly.newPlot('avatar-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Sessão', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Sessões' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Sessões Realizadas'
    });

    Plotly.newPlot('avatar-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Sessões Realizadas' }
    }), { displayModeBar: false });
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

      {/* Main KPIs - 5 cards inline */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">9.5</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Sessões por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Perguntas Feitas</span>
            <i className="fas fa-comments text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">542</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Total de interações
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Satisfação</span>
            <i className="fas fa-smile text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">94%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Avaliações positivas
          </p>
        </div>
      </div>

      {/* Meta + Top Creators Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Meta de Sessões do Mês</span>
            <i className="fas fa-target text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-800">136 de 150 sessões</p>
                <p className="text-[10px] font-bold text-slate-600">91%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(340,35%,65%)] rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Faltam 14 sessões</p>
            <div className="flex items-center gap-1.5 pt-1">
              <i className="fas fa-fire text-orange-500 text-xs"></i>
              <p className="text-[10px] font-bold text-slate-700">Sequência de 18 dias!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Agentes Mais Acessados</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(340,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">AA</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Agente de Análise</p>
                <p className="text-[10px] text-slate-500">42 sessões</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">AC</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Agente Compliance</p>
                <p className="text-[10px] text-slate-500">35 sessões</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Additional Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Respostas Recebidas</span>
            <i className="fas fa-message text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">1,248</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Do Avatar IA</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Favoritas</span>
            <i className="fas fa-star text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">86</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Respostas salvas</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">34</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Com a equipe</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Médio</span>
            <i className="fas fa-hourglass-half text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">32min</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Por sessão</p>
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
              Você está fazendo excelente uso dos Agentes de IA! Seu uso do Agente de Análise demonstra foco em dados. Explore o Agente Educacional para aprender novos conceitos de forma interativa.
            </p>
          </div>
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

      {/* Drill Down Modal */}
      {showDrillDown && selectedSpecialty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Avatar IA: {selectedSpecialty}</h3>
              <button 
                onClick={() => setShowDrillDown(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              {avatarsBySpecialty[selectedSpecialty]?.map((sessao, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{sessao.avatar}</h4>
                  <p className="text-sm text-slate-600 mb-2">Especialidade: {sessao.specialty}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><i className="fas fa-clock mr-1"></i>{sessao.duration}</span>
                    <span><i className="fas fa-comments mr-1"></i>{sessao.interactions} interações</span>
                    <span><i className="fas fa-calendar mr-1"></i>{sessao.date}</span>
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