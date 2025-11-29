import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import Plotly from 'plotly.js-dist';
import { TrendingUp, Clock, CheckCircle, GraduationCap, BarChart3, Zap, BookOpen, Award, Target } from "lucide-react";
import { getPeriodLabel } from "./PeriodComparisonToggle";

export const CursosAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [insights, setInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const cursosByCategory: Record<string, Array<{
    title: string;
    modules: string;
    completionRate: number;
    hours: string;
  }>> = {
    'Análise Técnica': [
      { title: 'Análise Técnica Avançada', modules: '18/24', completionRate: 75, hours: '32h' },
      { title: 'Indicadores e Osciladores', modules: '12/15', completionRate: 80, hours: '18h' }
    ],
    'Gestão de Riscos': [
      { title: 'Gestão de Riscos Financeiros', modules: '12/20', completionRate: 60, hours: '28h' },
      { title: 'Compliance e Controles', modules: '8/12', completionRate: 67, hours: '15h' }
    ],
    'Derivativos': [
      { title: 'Derivativos e Hedge', modules: '22/28', completionRate: 79, hours: '45h' }
    ],
    'Compliance': [
      { title: 'Compliance Bancário', modules: '8/16', completionRate: 50, hours: '18h' }
    ]
  };

  useEffect(() => {
    initializeCharts();
    generateInsights();
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const generateInsights = async () => {
    try {
      setLoadingInsights(true);
      const insightTemplates = [
        `• **Ritmo de conclusão acelerado**: Finalizar 3 cursos em 30 dias demonstra dedicação excepcional. Sua média de 1.6h/dia de estudo está 85% acima da média da plataforma, indicando comprometimento sério com desenvolvimento profissional.

• **Especialização estratégica**: Concentrar 72% dos módulos em Análise Técnica e Derivativos cria expertise profunda nessas áreas. Para maximizar empregabilidade, considere complementar com 2-3 módulos de Compliance e Gestão de Riscos, criando perfil T-shaped valorizado pelo mercado.

• **Eficiência em módulos práticos**: Taxa de conclusão 35% maior em módulos com exercícios práticos vs. teóricos sugere aprendizado cinestésico. Priorize cursos com labs, simuladores e cases reais para otimizar retenção e aplicação prática do conhecimento.

• **Janela de estudo consistente**: Estudar 82% do conteúdo entre 20:00-23:00 aproveita pico de foco noturno. Para otimizar, implemente técnica Pomodoro (50min estudo + 10min pausa) nesse horário, aumentando retenção em até 25%.`,

        `• **Certificação estratégica**: Obter 3 certificados em 30 dias posiciona você no top 5% dos profissionais da área. Para maximizar ROI, compartilhe certificações no LinkedIn imediatamente após conclusão - posts com certificados geram 340% mais engajamento que posts regulares.

• **Gap de prática identificado**: 89% do tempo em vídeos teóricos vs. apenas 11% em exercícios práticos. Dados mostram que profissionais que equilibram teoria/prática 60/40 retêm 50% mais conteúdo. Implemente regra: para cada hora de vídeo, 40min de exercícios.

• **Oportunidade em fim de semana**: Apenas 8% de progresso nos finais de semana representa 16h mensais não aproveitadas. Uma sessão leve de 2h aos domingos adicionaria 1.5 cursos completos por mês sem sobrecarga.

• **Cursos abandonados**: 4 cursos iniciados mas com <15% de progresso nos últimos 60 dias. Considere arquivá-los formalmente e focar energia nos 3 cursos ativos com >50% de progresso para evitar fragmentação cognitiva e manter momentum.`
      ];
      
      const randomInsight = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];
      await new Promise(resolve => setTimeout(resolve, 1500));
      setInsights(randomInsight);
    } catch (error) {
      console.error('Error generating insights:', error);
      setInsights("Não foi possível gerar insights no momento.");
    } finally {
      setLoadingInsights(false);
    }
  };

  const recentCursos = [
    { title: 'Análise Técnica Avançada', instructor: 'Prof. Carlos Mendes', progress: 75, modules: '18/24', date: 'Hoje' },
    { title: 'Gestão de Riscos Financeiros', instructor: 'Dra. Ana Santos', progress: 60, modules: '12/20', date: 'Ontem' },
    { title: 'Derivativos e Hedge', instructor: 'Prof. Roberto Lima', progress: 79, modules: '22/28', date: '2 dias atrás' },
    { title: 'Compliance Bancário', instructor: 'Dr. João Silva', progress: 50, modules: '8/16', date: '3 dias atrás' },
    { title: 'Open Finance na Prática', instructor: 'Marina Costa', progress: 92, modules: '28/30', date: '5 dias atrás' }
  ];

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;
    const pastelBlue = '#8AAACF';
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';
    const pastelPink = '#CC99A9';
    const pastelOrange = '#C9AF89';
    const pastelYellow = '#E6D595';

    const getDataByPeriod = (period: '7d' | '30d' | '90d' | '1y') => {
      const datasets = {
        '7d': {
          weeklyProgress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [2, 3, 2, 4, 3, 1, 1] },
          categoryDistribution: { labels: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Outros'], values: [8, 6, 5, 4, 9] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [1, 2, 3, 6] },
          studyTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [1.6, 2.4, 1.6, 3.2, 2.4, 0.8, 0.8] },
          topicEngagement: { x: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Open Finance'], y: [8, 6, 5, 4, 3], completion: [75, 60, 79, 50, 92] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [0, 1, 3, 4, 6, 18] }
        },
        '30d': {
          weeklyProgress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [8, 12, 8, 16, 12, 4, 4] },
          categoryDistribution: { labels: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Outros'], values: [35, 28, 22, 18, 42] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [4, 8, 12, 24] },
          studyTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [6.4, 9.6, 6.4, 12.8, 9.6, 3.2, 3.2] },
          topicEngagement: { x: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Open Finance'], y: [35, 28, 22, 18, 12], completion: [75, 60, 79, 50, 92] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [2, 4, 12, 16, 24, 72] }
        },
        '90d': {
          weeklyProgress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [24, 36, 24, 48, 36, 12, 12] },
          categoryDistribution: { labels: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Outros'], values: [105, 84, 66, 54, 126] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [12, 24, 36, 72] },
          studyTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [19.2, 28.8, 19.2, 38.4, 28.8, 9.6, 9.6] },
          topicEngagement: { x: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Open Finance'], y: [105, 84, 66, 54, 36], completion: [75, 60, 79, 50, 92] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [6, 12, 36, 48, 72, 216] }
        },
        '1y': {
          weeklyProgress: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [28, 32, 38, 36, 42, 40, 37, 41, 39, 44, 42, 45] },
          categoryDistribution: { labels: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Outros'], values: [420, 336, 264, 216, 504] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [48, 96, 144, 288] },
          studyTime: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [22.4, 25.6, 30.4, 28.8, 33.6, 32.0, 29.6, 32.8, 31.2, 35.2, 33.6, 36.0] },
          topicEngagement: { x: ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Open Finance'], y: [420, 336, 264, 216, 144], completion: [75, 60, 79, 50, 92] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [24, 48, 144, 192, 288, 864] }
        }
      };
      return datasets[period];
    };

    const currentData = getDataByPeriod(selectedPeriod);
    const comparisonData = comparisonMode ? getDataByPeriod(comparisonPeriod) : null;

    // Weekly Progress Chart
    const weeklyProgressData = [{
      x: currentData.weeklyProgress.x,
      y: currentData.weeklyProgress.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Módulos',
      line: { color: pastelYellow, width: 3, shape: 'spline' },
      marker: { size: 8, color: pastelYellow }
    }];

    if (comparisonMode && comparisonData) {
      weeklyProgressData.push({
        x: comparisonData.weeklyProgress.x,
        y: comparisonData.weeklyProgress.y,
        type: 'scatter',
        mode: 'lines+markers',
        name: getPeriodLabel(comparisonPeriod),
        line: { color: pastelPurple, width: 3, shape: 'spline', dash: 'dash' },
        marker: { size: 8, color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('cursos-weekly-chart', weeklyProgressData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Módulos Concluídos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Category Distribution Chart
    Plotly.newPlot('cursos-categories-chart', [{
      labels: currentData.categoryDistribution.labels,
      values: currentData.categoryDistribution.values,
      type: 'pie',
      marker: { colors: [pastelYellow, pastelBlue, pastelPurple, pastelPink, pastelOrange] },
      textinfo: 'none',
      hoverinfo: 'label+percent+value'
    }], {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Completion Rate Chart
    const completionRateData = [{
      x: currentData.completionRate.x,
      y: currentData.completionRate.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Cursos',
      marker: { color: pastelYellow }
    }];

    if (comparisonMode && comparisonData) {
      completionRateData.push({
        x: comparisonData.completionRate.x,
        y: comparisonData.completionRate.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('cursos-completion-chart', completionRateData, {
      margin: { l: 40, r: 20, t: 20, b: 60 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Cursos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: comparisonMode ? 'group' : 'relative',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Study Time Chart
    const studyTimeData = [{
      x: currentData.studyTime.x,
      y: currentData.studyTime.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Horas',
      marker: { color: pastelBlue }
    }];

    if (comparisonMode && comparisonData) {
      studyTimeData.push({
        x: comparisonData.studyTime.x,
        y: comparisonData.studyTime.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('cursos-time-chart', studyTimeData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Horas' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: comparisonMode ? 'group' : 'relative',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Topic Engagement Correlation Chart
    Plotly.newPlot('cursos-topic-chart', [{
      x: currentData.topicEngagement.x,
      y: currentData.topicEngagement.y,
      name: comparisonMode ? `Módulos (${getPeriodLabel(selectedPeriod)})` : 'Módulos Concluídos',
      type: 'bar',
      marker: { color: pastelYellow },
      yaxis: 'y'
    }, {
      x: currentData.topicEngagement.x,
      y: currentData.topicEngagement.completion,
      name: 'Taxa Conclusão (%)',
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: pastelPink, width: 3 },
      marker: { size: 10, color: pastelPink },
      yaxis: 'y2'
    }], {
      margin: { l: 50, r: 50, t: 20, b: 80 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { title: 'Módulos', gridcolor: '#f1f5f9', side: 'left' },
      yaxis2: { title: 'Taxa de Conclusão (%)', overlaying: 'y', side: 'right', range: [0, 100] },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: true,
      legend: { x: 0.5, y: 1.1, xanchor: 'center', orientation: 'h' }
    }, { displayModeBar: false });

    // Hourly Distribution Chart
    const hourlyDistData = [{
      x: currentData.hourlyDistribution.x,
      y: currentData.hourlyDistribution.y,
      type: 'scatter',
      fill: 'tozeroy',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : '% de Estudo',
      fillcolor: 'rgba(230, 213, 149, 0.3)',
      line: { color: pastelYellow, width: 2 }
    }];

    if (comparisonMode && comparisonData) {
      hourlyDistData.push({
        x: comparisonData.hourlyDistribution.x,
        y: comparisonData.hourlyDistribution.y,
        type: 'scatter',
        fill: 'tozeroy',
        name: getPeriodLabel(comparisonPeriod),
        fillcolor: 'rgba(172, 156, 201, 0.3)',
        line: { color: pastelPurple, width: 2, dash: 'dash' }
      } as any);
    }

    Plotly.newPlot('cursos-hourly-chart', hourlyDistData, {
      margin: { l: 40, r: 20, t: 20, b: 30 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: '% de Estudo' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Add click event to topic chart
    const topicChart = document.getElementById('cursos-topic-chart');
    if (topicChart) {
      (topicChart as any).on('plotly_click', (data: any) => {
        const pointIndex = data.points[0].pointIndex;
        const categories = ['Análise Técnica', 'Gestão de Riscos', 'Derivativos', 'Compliance', 'Open Finance'];
        const clickedCategory = categories[pointIndex];
        setSelectedCategory(clickedCategory);
        setShowDrillDown(true);
      });
    }
  };

  const data = (() => {
    const datasets = {
      '7d': { total: 12, growth: 18, hours: 12.8, completion: 67, streak: 7, avgDuration: 64, certificates: 1, modules: 32, engagement: 88 },
      '30d': { total: 48, growth: 24, hours: 48.2, completion: 67, streak: 23, avgDuration: 60, certificates: 3, modules: 145, engagement: 85 },
      '90d': { total: 144, growth: 28, hours: 153.6, completion: 69, streak: 68, avgDuration: 64, certificates: 8, modules: 435, engagement: 87 },
      '1y': { total: 576, growth: 32, hours: 535.2, completion: 71, streak: 289, avgDuration: 62, certificates: 24, modules: 1740, engagement: 84 }
    };
    return datasets[selectedPeriod];
  })();

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
            selectedPeriod === '7d' ? 'bg-[hsl(142,35%,50%)] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          7 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('30d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '30d' ? 'bg-[hsl(142,35%,50%)] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          30 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('90d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '90d' ? 'bg-[hsl(142,35%,50%)] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          90 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('1y')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '1y' ? 'bg-[hsl(142,35%,50%)] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          1 ano
        </button>
      </div>

      {/* KPIs Overview - Novo Layout Atrativo */}
      <section className="mb-8 space-y-6">
        {/* 5 Cards Principais na Mesma Linha */}
        <div className="grid grid-cols-5 gap-4">
          {/* Card 1 - Total de Módulos */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-yellow/50 rounded-xl flex items-center justify-center">
                <GraduationCap size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-yellow/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark flex items-center gap-1">
                  <TrendingUp size={10} /> +{data.growth}%
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Módulos Concluídos</p>
            <h2 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.modules}</h2>
            <p className="text-[10px] text-pastel-gray-dark/70">em {data.total} cursos</p>
          </div>

          {/* Card 2 - Horas de Estudo */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <Clock size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark">Tempo</p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Horas de Estudo</p>
            <h2 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.hours.toFixed(1)}h</h2>
            <p className="text-[10px] text-pastel-gray-dark/70">de conteúdo</p>
          </div>

          {/* Card 3 - Taxa de Conclusão */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <CheckCircle size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark">Top 15%</p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Taxa de Conclusão</p>
            <h2 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.completion}%</h2>
            <p className="text-[10px] text-pastel-gray-dark/70">média: 52%</p>
          </div>

          {/* Card 4 - Streak */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <Zap size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark flex items-center gap-1">
                  <TrendingUp size={10} />
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Streak Atual</p>
            <h3 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.streak}</h3>
            <p className="text-[10px] text-pastel-gray-dark/70">dias consecutivos</p>
          </div>

          {/* Card 5 - Engajamento */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <Target size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark">Top</p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Engajamento</p>
            <h3 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.engagement}%</h3>
            <p className="text-[10px] text-pastel-gray-dark/70">acima da média</p>
          </div>
        </div>

        {/* Meta de Estudo + Instrutores Mais Seguidos */}
        <div className="grid grid-cols-3 gap-6">
          {/* Gráfico de Meta Grande - 2/3 da largura */}
          <div className="col-span-2 bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Meta de Estudo do Mês</h3>
                <p className="text-sm text-muted-foreground">Acompanhe seu progresso e mantenha a consistência</p>
              </div>
              <div className="px-4 py-2 bg-pastel-yellow/[0.2] rounded-xl">
                <p className="text-sm font-bold text-pastel-gray-dark flex items-center gap-1">
                  <Zap size={14} className="text-pastel-gray-dark" />
                  Streak de {data.streak} dias
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              {/* Gráfico Circular Grande */}
              <div className="relative w-64 h-64 flex-shrink-0">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="none"
                    stroke="hsl(220, 15%, 95%)"
                    strokeWidth="20"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="none"
                    stroke="hsl(44, 40%, 65%)"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 110}`}
                    strokeDashoffset={`${2 * Math.PI * 110 * (1 - (data.total / (selectedPeriod === '7d' ? 15 : selectedPeriod === '30d' ? 60 : selectedPeriod === '90d' ? 180 : 720)))}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-bold text-foreground">{Math.round((data.total / (selectedPeriod === '7d' ? 15 : selectedPeriod === '30d' ? 60 : selectedPeriod === '90d' ? 180 : 720)) * 100)}%</p>
                  <p className="text-sm text-muted-foreground mt-2">Concluído</p>
                </div>
              </div>

              {/* Estatísticas da Meta */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Módulos Concluídos</p>
                    <p className="text-2xl font-bold text-foreground">{data.modules}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Meta Total</p>
                    <p className="text-2xl font-bold text-foreground">{selectedPeriod === '7d' ? 15 : selectedPeriod === '30d' ? 60 : selectedPeriod === '90d' ? 180 : 720}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Faltam</p>
                    <p className="text-2xl font-bold text-amber-600">{(selectedPeriod === '7d' ? 15 : selectedPeriod === '30d' ? 60 : selectedPeriod === '90d' ? 180 : 720) - data.modules}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Média Diária</p>
                      <p className="text-2xl font-bold text-foreground">{(data.modules / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365)).toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground mt-1">módulos/dia</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Dias Ativos</p>
                      <p className="text-2xl font-bold text-foreground">{data.streak}</p>
                      <p className="text-xs text-emerald-600 mt-1 font-bold flex items-center gap-1">
                        <Zap size={12} className="text-emerald-600" />
                        Sequência ativa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pastel-yellow/[0.2] to-pastel-blue/[0.2] rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp size={16} className="text-foreground" />
                    Você está no caminho certo!
                  </p>
                  <p className="text-xs text-muted-foreground">Mantenha o ritmo atual para atingir sua meta em {Math.ceil(((selectedPeriod === '7d' ? 15 : selectedPeriod === '30d' ? 60 : selectedPeriod === '90d' ? 180 : 720) - data.modules) / (data.modules / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365)))} dias.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instrutores Mais Seguidos - 1/3 da largura, vertical */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-6">Instrutores Mais Seguidos</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">CM</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Prof. Carlos Mendes</p>
                  <p className="text-sm text-muted-foreground">15 cursos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">AS</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Dra. Ana Santos</p>
                  <p className="text-sm text-muted-foreground">12 cursos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">RL</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Prof. Roberto Lima</p>
                  <p className="text-sm text-muted-foreground">10 cursos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">JS</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Dr. João Silva</p>
                  <p className="text-sm text-muted-foreground">8 cursos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">MC</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Marina Costa</p>
                  <p className="text-sm text-muted-foreground">6 cursos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Menores em Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-yellow/[0.2] rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Duração Média</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">{data.avgDuration}</h4>
            <p className="text-sm text-muted-foreground">minutos por módulo</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-purple/[0.2] rounded-lg flex items-center justify-center">
                <Award size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Certificados</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">{data.certificates}</h4>
            <p className="text-sm text-muted-foreground">obtidos no período</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-green/[0.2] rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Cursos Ativos</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">{data.total}</h4>
            <p className="text-sm text-muted-foreground">em andamento</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-pink/[0.2] rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Meta Diária</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">1.6h</h4>
            <p className="text-sm text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle size={14} className="text-emerald-600" />
              {Math.round(data.streak * 0.85)} dias
            </p>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src="/src/assets/auxiliar-do-dia-avatar.png" 
              alt="AI Agent" 
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-lg font-bold text-slate-800">Insights Personalizados por IA</h2>
          </div>
          {loadingInsights && <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>}
        </div>
        {loadingInsights ? (
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-4/6"></div>
          </div>
        ) : (
          <div className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none prose-strong:text-slate-800 prose-strong:font-bold">
            {insights.split('\n').map((line, index) => {
              const formattedLine = line
                .replace(/^\s*•\s*/, '')
                .split(/(\*\*.*?\*\*)/)
                .map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });
              
              if (line.trim().startsWith('•')) {
                return (
                  <div key={index} className="mb-3 flex gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{formattedLine}</span>
                  </div>
                );
              }
              return line.trim() ? <div key={index} className="mb-2">{formattedLine}</div> : null;
            })}
          </div>
        )}
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Progresso Semanal</h2>
          <div id="cursos-weekly-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Categoria</h2>
          <div id="cursos-categories-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Taxa de Conclusão por Faixa</h2>
          <div id="cursos-completion-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Tempo de Estudo por Dia</h2>
          <div id="cursos-time-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Temas por Engajamento e Conclusão</h2>
          <p className="text-sm text-slate-500 mb-4">Clique em um tema para ver cursos</p>
          <div id="cursos-topic-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Horário</h2>
          <div id="cursos-hourly-chart" className="h-[280px] w-full"></div>
        </div>
      </section>

      {/* Cursos em Andamento */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Cursos em Andamento</h2>
        <div className="space-y-3">
          {recentCursos.map((curso, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-[hsl(44,40%,65%)] rounded-lg flex items-center justify-center">
                  <GraduationCap size={18} className="text-slate-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{curso.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{curso.instructor} • {curso.modules} módulos • {curso.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[hsl(44,40%,65%)] rounded-full" style={{ width: `${curso.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-12">{curso.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drill-down Modal */}
      {showDrillDown && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">{selectedCategory}</h2>
              <button onClick={() => setShowDrillDown(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3">
              {cursosByCategory[selectedCategory]?.map((curso, idx) => (
                <div key={idx} className="p-4 border border-slate-100 rounded-lg">
                  <p className="font-semibold text-slate-800">{curso.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{curso.modules} módulos • {curso.hours}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[hsl(44,40%,65%)]" style={{ width: `${curso.completionRate}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{curso.completionRate}%</span>
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