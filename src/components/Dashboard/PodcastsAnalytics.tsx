import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import Plotly from 'plotly.js-dist';
import { TrendingUp, Clock, CheckCircle, Headphones, BarChart3, Zap, PlayCircle, Award, Target } from "lucide-react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const PodcastsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [insights, setInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [selectedHost, setSelectedHost] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const podcastsByHost: Record<string, Array<{
    title: string;
    duration: string;
    completionRate: number;
    date: string;
  }>> = {
    'Fintech Brasil': [
      { title: 'Open Finance: Implementação completa', duration: '42 min', completionRate: 100, date: 'Hoje' },
      { title: 'PIX internacional explicado', duration: '38 min', completionRate: 95, date: 'Ontem' },
      { title: 'Carteiras digitais vs bancos', duration: '45 min', completionRate: 88, date: '2 dias atrás' }
    ],
    'Payments Evolution': [
      { title: 'Tokenização de pagamentos', duration: '35 min', completionRate: 92, date: 'Hoje' },
      { title: 'Fraudes em pagamentos digitais', duration: '40 min', completionRate: 85, date: 'Ontem' }
    ],
    'Mercado em Foco': [
      { title: 'Análise técnica do mercado de capitais', duration: '55 min', completionRate: 78, date: 'Ontem' },
      { title: 'Estratégias de investimento 2025', duration: '48 min', completionRate: 82, date: '3 dias atrás' }
    ],
    'Banking Insights': [
      { title: 'Compliance bancário atualizado', duration: '48 min', completionRate: 100, date: 'Ontem' },
      { title: 'Banking as a Service', duration: '42 min', completionRate: 90, date: '2 dias atrás' }
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
        `• **Padrão de escuta otimizado**: Seus 67% de episódios ouvidos durante deslocamentos (08:00-09:00 e 18:00-19:00) demonstram uso inteligente do tempo morto. Essa estratégia transforma 2h diárias de commute em aprendizado ativo, acumulando 40h mensais de desenvolvimento profissional.

• **Taxa de conclusão impressionante**: Concluir 84% dos episódios iniciados coloca você no top 10% dos ouvintes da plataforma. Isso indica seleção criteriosa de conteúdo e alto engajamento. Para otimizar, considere criar playlists temáticas com 3-4 episódios relacionados para aprendizado em profundidade.

• **Velocidade de reprodução estratégica**: Ouvir 72% do conteúdo em 1.5x permite absorver 50% mais conteúdo mantendo compreensão. Seu equilíbrio entre velocidade (1.5x para entrevistas, 1.0x para técnicos) demonstra adaptação inteligente ao tipo de conteúdo.

• **Diversificação de hosts**: Alternar entre 12 podcasters diferentes evita viés de perspectiva única. Sua distribuição equilibrada (host principal 28%, demais 72%) garante exposição a múltiplas visões do mercado financeiro.`,

        `• **Engagement em séries**: Completar 3 séries inteiras (Open Finance Deep Dive, Mercado em Foco, Payments Revolution) indica comprometimento com aprendizado estruturado. Episódios em série têm 40% mais retenção que episódios isolados.

• **Janela de oportunidade matinal**: Apenas 12% das escutas antes das 07:00 sugere potencial inexplorado. Experimente episódios de 15-20min durante café da manhã para aproveitar clareza mental matinal e adicionar 1.5h semanais de aprendizado.

• **Padrão de abandono**: 16% dos episódios são abandonados nos primeiros 5 minutos, tipicamente em episódios >60min. Priorize episódios de 30-45min para otimizar conclusão, ou use recursos de "pular intro" para conteúdos longos.

• **Fim de semana estratégico**: Domingos com 0.8h vs 2.2h em dias úteis representam oportunidade. Implemente "Sunday Deep Dive" - um episódio longo (60-90min) sobre tema complexo quando você tem tempo para reflexão sem interrupções.`
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

  const recentPodcasts = [
    { title: 'Open Finance: Desafios da implementação completa', host: 'Fintech Brasil', duration: '42 min', completionRate: 100, date: 'Hoje' },
    { title: 'PIX internacional e o futuro dos pagamentos', host: 'Payments Evolution', duration: '38 min', completionRate: 85, date: 'Hoje' },
    { title: 'Análise técnica: Mercado de capitais 2025', host: 'Mercado em Foco', duration: '55 min', completionRate: 72, date: 'Ontem' },
    { title: 'Compliance e regulamentação bancária', host: 'Banking Insights', duration: '48 min', completionRate: 100, date: 'Ontem' },
    { title: 'Tokenização de ativos: Oportunidades e riscos', host: 'Cripto & Fintech', duration: '35 min', completionRate: 68, date: '2 dias atrás' }
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
          weeklyListening: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [4, 3, 5, 4, 3, 2, 1] },
          hostDistribution: { labels: ['Fintech Brasil', 'Payments Evolution', 'Mercado em Foco', 'Banking Insights', 'Outros'], values: [8, 6, 5, 4, 9] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [2, 4, 6, 20] },
          listeningTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [2.8, 2.1, 3.5, 2.8, 2.1, 1.4, 0.7] },
          topicEngagement: { x: ['Open Finance', 'Payments', 'Regulamentação', 'Banking', 'Mercado de Capitais'], y: [12, 8, 6, 5, 4], completion: [88, 82, 90, 85, 78] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [0, 1, 12, 8, 6, 5] }
        },
        '30d': {
          weeklyListening: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [18, 15, 20, 17, 14, 8, 5] },
          hostDistribution: { labels: ['Fintech Brasil', 'Payments Evolution', 'Mercado em Foco', 'Banking Insights', 'Outros'], values: [35, 28, 22, 18, 42] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [8, 15, 28, 94] },
          listeningTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [12.6, 10.5, 14.0, 11.9, 9.8, 5.6, 3.5] },
          topicEngagement: { x: ['Open Finance', 'Payments', 'Regulamentação', 'Banking', 'Mercado de Capitais'], y: [52, 38, 28, 24, 20], completion: [86, 80, 88, 83, 75] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [2, 4, 48, 32, 24, 20] }
        },
        '90d': {
          weeklyListening: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [52, 48, 58, 50, 42, 28, 18] },
          hostDistribution: { labels: ['Fintech Brasil', 'Payments Evolution', 'Mercado em Foco', 'Banking Insights', 'Outros'], values: [98, 82, 68, 54, 124] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [28, 42, 78, 278] },
          listeningTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [36.4, 33.6, 40.6, 35.0, 29.4, 19.6, 12.6] },
          topicEngagement: { x: ['Open Finance', 'Payments', 'Regulamentação', 'Banking', 'Mercado de Capitais'], y: [148, 112, 84, 68, 58], completion: [85, 79, 87, 82, 74] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [8, 12, 142, 98, 72, 58] }
        },
        '1y': {
          weeklyListening: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [62, 71, 84, 79, 92, 88, 81, 89, 86, 95, 92, 98] },
          hostDistribution: { labels: ['Fintech Brasil', 'Payments Evolution', 'Mercado em Foco', 'Banking Insights', 'Outros'], values: [385, 324, 268, 214, 486] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [112, 168, 298, 1089] },
          listeningTime: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [43.4, 49.7, 58.8, 55.3, 64.4, 61.6, 56.7, 62.3, 60.2, 66.5, 64.4, 68.6] },
          topicEngagement: { x: ['Open Finance', 'Payments', 'Regulamentação', 'Banking', 'Mercado de Capitais'], y: [584, 442, 332, 268, 228], completion: [84, 78, 86, 81, 73] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [32, 48, 562, 388, 284, 228] }
        }
      };
      return datasets[period];
    };

    const currentData = getDataByPeriod(selectedPeriod);
    const comparisonData = comparisonMode ? getDataByPeriod(comparisonPeriod) : null;

    // Weekly Listening Chart
    const weeklyListeningData = [{
      x: currentData.weeklyListening.x,
      y: currentData.weeklyListening.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Episódios',
      line: { color: pastelGreen, width: 3, shape: 'spline' },
      marker: { size: 8, color: pastelGreen }
    }];

    if (comparisonMode && comparisonData) {
      weeklyListeningData.push({
        x: comparisonData.weeklyListening.x,
        y: comparisonData.weeklyListening.y,
        type: 'scatter',
        mode: 'lines+markers',
        name: getPeriodLabel(comparisonPeriod),
        line: { color: pastelPurple, width: 3, shape: 'spline', dash: 'dash' },
        marker: { size: 8, color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('podcast-weekly-chart', weeklyListeningData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Episódios Ouvidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Host Distribution Chart
    Plotly.newPlot('podcast-hosts-chart', [{
      labels: currentData.hostDistribution.labels,
      values: currentData.hostDistribution.values,
      type: 'pie',
      marker: { colors: [pastelBlue, pastelGreen, pastelPurple, pastelPink, pastelOrange] },
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
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Episódios',
      marker: { color: pastelGreen }
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

    Plotly.newPlot('podcast-completion-chart', completionRateData, {
      margin: { l: 40, r: 20, t: 20, b: 60 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Episódios' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: comparisonMode ? 'group' : 'relative',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Listening Time Chart
    const listeningTimeData = [{
      x: currentData.listeningTime.x,
      y: currentData.listeningTime.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Horas',
      marker: { color: pastelBlue }
    }];

    if (comparisonMode && comparisonData) {
      listeningTimeData.push({
        x: comparisonData.listeningTime.x,
        y: comparisonData.listeningTime.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('podcast-time-chart', listeningTimeData, {
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
    Plotly.newPlot('podcast-topic-chart', [{
      x: currentData.topicEngagement.x,
      y: currentData.topicEngagement.y,
      name: comparisonMode ? `Episódios (${getPeriodLabel(selectedPeriod)})` : 'Episódios Ouvidos',
      type: 'bar',
      marker: { color: pastelBlue },
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
      yaxis: { title: 'Episódios', gridcolor: '#f1f5f9', side: 'left' },
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
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : '% de Escuta',
      fillcolor: 'rgba(142, 188, 159, 0.3)',
      line: { color: pastelGreen, width: 2 }
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

    Plotly.newPlot('podcast-hourly-chart', hourlyDistData, {
      margin: { l: 40, r: 20, t: 20, b: 30 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: '% de Escuta' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Add click event to topic chart
    const topicChart = document.getElementById('podcast-topic-chart');
    if (topicChart) {
      (topicChart as any).on('plotly_click', (data: any) => {
        const pointIndex = data.points[0].pointIndex;
        const topics = ['Fintech Brasil', 'Payments Evolution', 'Mercado em Foco', 'Banking Insights', 'Cripto & Fintech'];
        const clickedHost = topics[pointIndex];
        setSelectedHost(clickedHost);
        setShowDrillDown(true);
      });
    }
  };

  const data = (() => {
    const datasets = {
      '7d': { total: 32, growth: 18, hours: 14.8, completion: 84, streak: 7, avgDuration: 28, favorites: 8, speed: 1.5, engagement: 92 },
      '30d': { total: 142, growth: 24, hours: 68.5, completion: 84, streak: 23, avgDuration: 29, favorites: 35, speed: 1.5, engagement: 88 },
      '90d': { total: 426, growth: 28, hours: 207.2, completion: 82, streak: 68, avgDuration: 29, favorites: 98, speed: 1.5, engagement: 85 },
      '1y': { total: 1817, growth: 32, hours: 730.3, completion: 81, streak: 289, avgDuration: 29, favorites: 428, speed: 1.5, engagement: 83 }
    };
    return datasets[selectedPeriod];
  })();

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Podcasts</h2>
        <p className="text-slate-600">Análise detalhada do seu histórico de escuta e engajamento</p>
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
        {/* Hero Cards - Top 3 Métricas Principais */}
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1 - Total de Episódios */}
          <div className="relative bg-gradient-to-br from-pastel-blue to-pastel-blue/70 rounded-2xl p-8 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Headphones size={28} className="text-white" />
                </div>
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur rounded-full">
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    <TrendingUp size={12} /> +{data.growth}%
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-white/80 mb-2">Total de Episódios</p>
              <h2 className="text-5xl font-bold text-white mb-1">{data.total}</h2>
              <p className="text-sm text-white/70">episódios ouvidos no período</p>
            </div>
          </div>

          {/* Card 2 - Horas de Escuta */}
          <div className="relative bg-gradient-to-br from-pastel-green to-pastel-green/70 rounded-2xl p-8 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Clock size={28} className="text-white" />
                </div>
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur rounded-full">
                  <p className="text-xs font-bold text-white">Tempo Total</p>
                </div>
              </div>
              <p className="text-sm font-medium text-white/80 mb-2">Horas de Escuta</p>
              <h2 className="text-5xl font-bold text-white mb-1">{data.hours.toFixed(1)}h</h2>
              <p className="text-sm text-white/70">de conteúdo consumido</p>
            </div>
          </div>

          {/* Card 3 - Taxa de Conclusão */}
          <div className="relative bg-gradient-to-br from-pastel-purple to-pastel-purple/70 rounded-2xl p-8 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <CheckCircle size={28} className="text-white" />
                </div>
                <div className="px-3 py-1.5 bg-emerald-500/30 backdrop-blur rounded-full">
                  <p className="text-xs font-bold text-white">Top 10%</p>
                </div>
              </div>
              <p className="text-sm font-medium text-white/80 mb-2">Taxa de Conclusão</p>
              <h2 className="text-5xl font-bold text-white mb-1">{data.completion}%</h2>
              <p className="text-sm text-white/70">média da plataforma: 60%</p>
            </div>
          </div>
        </div>

        {/* Gráfico de Meta Grande + Cards Secundários */}
        <div className="grid grid-cols-3 gap-6">
          {/* Gráfico de Meta Grande - Ocupa 2 colunas */}
          <div className="col-span-2 bg-white rounded-2xl p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Meta de Escuta do Mês</h3>
                <p className="text-sm text-muted-foreground">Acompanhe seu progresso e mantenha a consistência</p>
              </div>
              <div className="px-4 py-2 bg-pastel-green/[0.2] rounded-xl">
                <p className="text-sm font-bold text-pastel-gray-dark">Streak de {data.streak} dias 🔥</p>
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
                    stroke="hsl(152, 48%, 55%)"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 110}`}
                    strokeDashoffset={`${2 * Math.PI * 110 * (1 - (data.total / (selectedPeriod === '7d' ? 35 : selectedPeriod === '30d' ? 150 : selectedPeriod === '90d' ? 450 : 1900)))}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-bold text-foreground">{Math.round((data.total / (selectedPeriod === '7d' ? 35 : selectedPeriod === '30d' ? 150 : selectedPeriod === '90d' ? 450 : 1900)) * 100)}%</p>
                  <p className="text-sm text-muted-foreground mt-2">Concluído</p>
                </div>
              </div>

              {/* Estatísticas da Meta */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Episódios Ouvidos</p>
                    <p className="text-2xl font-bold text-foreground">{data.total}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Meta Total</p>
                    <p className="text-2xl font-bold text-foreground">{selectedPeriod === '7d' ? 35 : selectedPeriod === '30d' ? 150 : selectedPeriod === '90d' ? 450 : 1900}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Faltam</p>
                    <p className="text-2xl font-bold text-amber-600">{(selectedPeriod === '7d' ? 35 : selectedPeriod === '30d' ? 150 : selectedPeriod === '90d' ? 450 : 1900) - data.total}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Média Diária</p>
                      <p className="text-2xl font-bold text-foreground">{(data.total / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365)).toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground mt-1">episódios/dia</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Dias Ativos</p>
                      <p className="text-2xl font-bold text-foreground">{data.streak}</p>
                      <p className="text-xs text-emerald-600 mt-1 font-bold">🔥 Sequência ativa</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pastel-green/[0.2] to-pastel-blue/[0.2] rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-2">💪 Você está no caminho certo!</p>
                  <p className="text-xs text-muted-foreground">Mantenha o ritmo atual para atingir sua meta em {Math.ceil(((selectedPeriod === '7d' ? 35 : selectedPeriod === '30d' ? 150 : selectedPeriod === '90d' ? 450 : 1900) - data.total) / (data.total / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365)))} dias.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna de Cards Secundários */}
          <div className="space-y-6">
            {/* Streak */}
            <div className="bg-gradient-to-br from-pastel-yellow to-pastel-yellow/70 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-white/30 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap size={24} className="text-white" />
              </div>
              <p className="text-sm font-medium text-white/80 mb-1">Streak Atual</p>
              <h3 className="text-4xl font-bold text-white mb-1">{data.streak}</h3>
              <p className="text-xs text-white/70">dias consecutivos</p>
            </div>

            {/* Engajamento */}
            <div className="bg-gradient-to-br from-pastel-pink to-pastel-pink/70 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-white/30 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target size={24} className="text-white" />
              </div>
              <p className="text-sm font-medium text-white/80 mb-1">Engajamento</p>
              <h3 className="text-4xl font-bold text-white mb-1">{data.engagement}%</h3>
              <p className="text-xs text-white/70">acima da média</p>
            </div>
          </div>
        </div>

        {/* Cards Menores em Grid */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pastel-blue/[0.2] rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-pastel-gray-dark" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground">Duração Média</p>
            </div>
            <h4 className="text-3xl font-bold text-foreground mb-1">{data.avgDuration}</h4>
            <p className="text-xs text-muted-foreground">minutos por episódio</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pastel-purple/[0.2] rounded-lg flex items-center justify-center">
                <Award size={20} className="text-pastel-gray-dark" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground">Favoritos</p>
            </div>
            <h4 className="text-3xl font-bold text-foreground mb-1">{data.favorites}</h4>
            <p className="text-xs text-muted-foreground">episódios salvos</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pastel-green/[0.2] rounded-lg flex items-center justify-center">
                <PlayCircle size={20} className="text-pastel-gray-dark" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground">Velocidade</p>
            </div>
            <h4 className="text-3xl font-bold text-foreground mb-1">{data.speed}x</h4>
            <p className="text-xs text-muted-foreground">velocidade média</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pastel-pink/[0.2] rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-pastel-gray-dark" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground">Meta Diária</p>
            </div>
            <h4 className="text-3xl font-bold text-foreground mb-1">1.5h</h4>
            <p className="text-xs text-emerald-600 font-bold">✓ {Math.round(data.streak * 0.85)} dias</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Hosts Mais Ouvidos</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-pastel-blue rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-pastel-gray-dark">FB</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">Fintech Brasil</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-pastel-green rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-pastel-gray-dark">PE</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">Payments Evolution</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-pastel-purple rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-pastel-gray-dark">MF</span>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">Mercado em Foco</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Insights Personalizados por IA</h2>
          {loadingInsights && <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>}
        </div>
        {loadingInsights ? (
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded animate-pulse w-4/6"></div>
          </div>
        ) : (
          <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{insights}</div>
        )}
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Episódios Ouvidos</h2>
          <div id="podcast-weekly-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Host</h2>
          <div id="podcast-hosts-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Taxa de Conclusão por Faixa</h2>
          <div id="podcast-completion-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Tempo de Escuta por Dia</h2>
          <div id="podcast-time-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Temas por Engajamento e Conclusão</h2>
          <p className="text-sm text-slate-500 mb-4">Clique em um tema para ver episódios</p>
          <div id="podcast-topic-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Horário</h2>
          <div id="podcast-hourly-chart" className="h-[280px] w-full"></div>
        </div>
      </section>

      {/* Episódios Recentes */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Episódios Ouvidos Recentemente</h2>
        <div className="space-y-3">
          {recentPodcasts.map((podcast, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-[hsl(281,35%,75%)] rounded-lg flex items-center justify-center">
                  <Headphones size={18} className="text-slate-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{podcast.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{podcast.host} • {podcast.duration} • {podcast.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: `${podcast.completionRate}%` }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-12">{podcast.completionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drill-down Modal */}
      {showDrillDown && selectedHost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">{selectedHost}</h2>
              <button onClick={() => setShowDrillDown(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3">
              {podcastsByHost[selectedHost]?.map((podcast, idx) => (
                <div key={idx} className="p-4 border border-slate-100 rounded-lg">
                  <p className="font-semibold text-slate-800">{podcast.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{podcast.duration} • {podcast.date}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[hsl(142,35%,65%)]" style={{ width: `${podcast.completionRate}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{podcast.completionRate}%</span>
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