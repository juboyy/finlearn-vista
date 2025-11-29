import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import Plotly from 'plotly.js-dist';
import { TrendingUp, Clock, CheckCircle, FileText, BarChart3, Zap, Bookmark, Award, Target } from "lucide-react";
import { getPeriodLabel } from "./PeriodComparisonToggle";

export const ArtigosAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [insights, setInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const artigosByTopic: Record<string, Array<{
    title: string;
    author: string;
    readTime: string;
    date: string;
  }>> = {
    'Regulação': [
      { title: 'Nova Resolução do Bacen sobre Open Finance', author: 'Banco Central', readTime: '8 min', date: 'Hoje' },
      { title: 'Cenário Regulatório para Fintechs 2025', author: 'Regulação Brasil', readTime: '15 min', date: '2 dias atrás' }
    ],
    'Inovação': [
      { title: 'IA Generativa no Setor Financeiro', author: 'Tech Finance', readTime: '12 min', date: 'Ontem' }
    ],
    'Mercado': [
      { title: 'Análise: Mercado de Capitais Q4', author: 'Market Insights', readTime: '10 min', date: '3 dias atrás' }
    ],
    'Tecnologia': [
      { title: 'Blockchain em Pagamentos Instantâneos', author: 'Crypto Finance', readTime: '18 min', date: '4 dias atrás' }
    ],
    'ESG': [
      { title: 'ESG e Investimentos Sustentáveis', author: 'Mercado Sustentável', readTime: '10 min', date: '3 dias atrás' }
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
        `• **Curadoria especializada em regulação**: 32% dos artigos focados em Regulação demonstra interesse estratégico em compliance e frameworks legais. Profissionais com expertise regulatória ganham em média 18% mais que generalistas no mercado financeiro.

• **Velocidade de leitura otimizada**: Média de 4.2 artigos/dia com tempo médio de 12min por artigo indica scanning eficiente. Para maximizar retenção, implemente técnica Cornell Notes: reserve 2-3min após cada artigo para anotar 3 pontos-chave e 1 ação aplicável.

• **Janela de leitura estratégica**: 68% dos artigos lidos entre 08:00-09:00 (café da manhã) e 12:00-13:00 (almoço) aproveita micro-momentos produtivos. Essa estratégia transforma 1.5h diárias de pausas em 30h mensais de atualização profissional.

• **Taxa de salvamento alta**: 47 artigos salvos vs. 284 lidos (16.5%) sugere curadoria criteriosa. Para otimizar, crie sistema de tags pessoais (Ação Imediata, Referência Futura, Compartilhar) no momento de salvar para facilitar revisão posterior.`,

        `• **Diversificação de fontes**: Ler de 8+ publishers diferentes evita câmara de eco informacional. Sua distribuição equilibrada (Bacen 28%, Tech Finance 22%, demais 50%) garante perspectivas múltiplas sobre o mercado financeiro.

• **Padrão de abandono identificado**: 38% dos artigos >15min são abandonados antes do final. Priorize artigos de 8-12min ou use técnica de pré-leitura (ler primeiro e último parágrafo) para decidir se vale investimento completo de tempo.

• **Oportunidade em fim de semana**: Sábados e domingos representam apenas 12% das leituras. Implementar "Sunday Deep Read" - 3-4 artigos longos (20-30min) no domingo - adicionaria 12-15 artigos mensais de conteúdo aprofundado.

• **Engajamento pós-leitura baixo**: Apenas 8% dos artigos lidos resultam em compartilhamento ou discussão. Aumentar compartilhamentos para 20% pode gerar networking valioso e posicionamento como thought leader na sua rede.`
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

  const recentArtigos = [
    { title: 'Nova Resolução do Bacen sobre Open Finance', author: 'Banco Central', readTime: '8 min', date: 'Hoje' },
    { title: 'IA Generativa no Setor Financeiro', author: 'Tech Finance', readTime: '12 min', date: 'Ontem' },
    { title: 'Cenário Regulatório para Fintechs 2025', author: 'Regulação Brasil', readTime: '15 min', date: '2 dias atrás' },
    { title: 'ESG e Investimentos Sustentáveis', author: 'Mercado Sustentável', readTime: '10 min', date: '3 dias atrás' },
    { title: 'Blockchain em Pagamentos Instantâneos', author: 'Crypto Finance', readTime: '18 min', date: '4 dias atrás' }
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
          weeklyReading: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [8, 12, 9, 15, 11, 4, 2] },
          topicDistribution: { labels: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], values: [32, 25, 20, 13, 10] },
          readTimeDistribution: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [25, 42, 28, 15] },
          dailyReading: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [1.1, 1.6, 1.2, 2.0, 1.5, 0.5, 0.3] },
          topicEngagement: { x: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], y: [32, 25, 20, 13, 10], completion: [92, 85, 88, 78, 82] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [0, 2, 42, 28, 15, 13] }
        },
        '30d': {
          weeklyReading: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [32, 48, 36, 60, 44, 16, 8] },
          topicDistribution: { labels: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], values: [128, 100, 80, 52, 40] },
          readTimeDistribution: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [98, 168, 112, 62] },
          dailyReading: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [4.3, 6.4, 4.8, 8.0, 5.9, 2.1, 1.1] },
          topicEngagement: { x: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], y: [128, 100, 80, 52, 40], completion: [92, 85, 88, 78, 82] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [2, 8, 168, 112, 60, 50] }
        },
        '90d': {
          weeklyReading: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [96, 144, 108, 180, 132, 48, 24] },
          topicDistribution: { labels: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], values: [384, 300, 240, 156, 120] },
          readTimeDistribution: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [294, 504, 336, 186] },
          dailyReading: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [12.8, 19.2, 14.4, 24.0, 17.6, 6.4, 3.2] },
          topicEngagement: { x: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], y: [384, 300, 240, 156, 120], completion: [92, 85, 88, 78, 82] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [6, 24, 504, 336, 180, 150] }
        },
        '1y': {
          weeklyReading: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [112, 128, 144, 136, 152, 146, 138, 148, 142, 156, 150, 160] },
          topicDistribution: { labels: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], values: [1536, 1200, 960, 624, 480] },
          readTimeDistribution: { x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'], y: [1176, 2016, 1344, 744] },
          dailyReading: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [14.9, 17.1, 19.2, 18.1, 20.3, 19.5, 18.4, 19.7, 18.9, 20.8, 20.0, 21.3] },
          topicEngagement: { x: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'], y: [1536, 1200, 960, 624, 480], completion: [92, 85, 88, 78, 82] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [24, 96, 2016, 1344, 720, 600] }
        }
      };
      return datasets[period];
    };

    const currentData = getDataByPeriod(selectedPeriod);
    const comparisonData = comparisonMode ? getDataByPeriod(comparisonPeriod) : null;

    // Weekly Reading Chart
    const weeklyReadingData = [{
      x: currentData.weeklyReading.x,
      y: currentData.weeklyReading.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Artigos',
      line: { color: pastelBlue, width: 3, shape: 'spline' },
      marker: { size: 8, color: pastelBlue }
    }];

    if (comparisonMode && comparisonData) {
      weeklyReadingData.push({
        x: comparisonData.weeklyReading.x,
        y: comparisonData.weeklyReading.y,
        type: 'scatter',
        mode: 'lines+markers',
        name: getPeriodLabel(comparisonPeriod),
        line: { color: pastelPurple, width: 3, shape: 'spline', dash: 'dash' },
        marker: { size: 8, color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('artigos-weekly-chart', weeklyReadingData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Topic Distribution Chart
    Plotly.newPlot('artigos-topics-chart', [{
      labels: currentData.topicDistribution.labels,
      values: currentData.topicDistribution.values,
      type: 'pie',
      hole: 0.4,
      marker: { colors: [pastelBlue, pastelGreen, pastelPink, pastelOrange, pastelYellow] },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value} artigos (%{percent})<br><i>Clique para ver detalhes</i><extra></extra>',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white', size: 14 } }
    }], {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff',
      hovermode: 'closest'
    }, { displayModeBar: false }).then(() => {
      const topicsChart = document.getElementById('artigos-topics-chart');
      if (topicsChart) {
        topicsChart.style.cursor = 'pointer';
        (topicsChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedTopic(label);
          setShowDrillDown(true);
        });
      }
    });

    // Read Time Distribution Chart
    const readTimeData = [{
      x: currentData.readTimeDistribution.x,
      y: currentData.readTimeDistribution.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Artigos',
      marker: { color: pastelGreen }
    }];

    if (comparisonMode && comparisonData) {
      readTimeData.push({
        x: comparisonData.readTimeDistribution.x,
        y: comparisonData.readTimeDistribution.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('artigos-time-chart', readTimeData, {
      margin: { l: 40, r: 20, t: 20, b: 60 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: comparisonMode ? 'group' : 'relative',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Daily Reading Time Chart
    const dailyReadingData = [{
      x: currentData.dailyReading.x,
      y: currentData.dailyReading.y,
      type: 'bar',
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : 'Horas',
      marker: { color: pastelPink }
    }];

    if (comparisonMode && comparisonData) {
      dailyReadingData.push({
        x: comparisonData.dailyReading.x,
        y: comparisonData.dailyReading.y,
        type: 'bar',
        name: getPeriodLabel(comparisonPeriod),
        marker: { color: pastelPurple }
      } as any);
    }

    Plotly.newPlot('artigos-daily-chart', dailyReadingData, {
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
    Plotly.newPlot('artigos-engagement-chart', [{
      x: currentData.topicEngagement.x,
      y: currentData.topicEngagement.y,
      name: comparisonMode ? `Artigos (${getPeriodLabel(selectedPeriod)})` : 'Artigos Lidos',
      type: 'bar',
      marker: { color: pastelBlue },
      yaxis: 'y'
    }, {
      x: currentData.topicEngagement.x,
      y: currentData.topicEngagement.completion,
      name: 'Taxa Leitura Completa (%)',
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: pastelPink, width: 3 },
      marker: { size: 10, color: pastelPink },
      yaxis: 'y2'
    }], {
      margin: { l: 50, r: 50, t: 20, b: 80 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { title: 'Artigos', gridcolor: '#f1f5f9', side: 'left' },
      yaxis2: { title: 'Taxa Leitura Completa (%)', overlaying: 'y', side: 'right', range: [0, 100] },
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
      name: comparisonMode ? getPeriodLabel(selectedPeriod) : '% de Leitura',
      fillcolor: 'rgba(138, 170, 207, 0.3)',
      line: { color: pastelBlue, width: 2 }
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

    Plotly.newPlot('artigos-hourly-chart', hourlyDistData, {
      margin: { l: 40, r: 20, t: 20, b: 30 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: '% de Leitura' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: comparisonMode,
      legend: { orientation: 'h', y: 1.1 }
    }, { displayModeBar: false });

    // Add click event to engagement chart
    const engagementChart = document.getElementById('artigos-engagement-chart');
    if (engagementChart) {
      (engagementChart as any).on('plotly_click', (data: any) => {
        const pointIndex = data.points[0].pointIndex;
        const topics = ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'];
        const clickedTopic = topics[pointIndex];
        setSelectedTopic(clickedTopic);
        setShowDrillDown(true);
      });
    }
  };

  const data = (() => {
    const datasets = {
      '7d': { total: 61, growth: 18, hours: 8.2, completion: 88, streak: 7, avgTime: 8, saved: 10, shares: 5, engagement: 90 },
      '30d': { total: 244, growth: 24, hours: 32.5, completion: 88, streak: 23, avgTime: 8, saved: 47, shares: 22, engagement: 87 },
      '90d': { total: 732, growth: 28, hours: 97.6, completion: 89, streak: 68, avgTime: 8, saved: 141, shares: 66, engagement: 88 },
      '1y': { total: 2928, growth: 32, hours: 390.4, completion: 90, streak: 289, avgTime: 8, saved: 564, shares: 264, engagement: 86 }
    };
    return datasets[selectedPeriod];
  })();

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Artigos</h2>
        <p className="text-slate-600">Seu histórico de leitura e temas de interesse</p>
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
          {/* Card 1 - Total de Artigos */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <FileText size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark flex items-center gap-1">
                  <TrendingUp size={10} /> +{data.growth}%
                </p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Total de Artigos</p>
            <h2 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.total}</h2>
            <p className="text-[10px] text-pastel-gray-dark/70">artigos lidos</p>
          </div>

          {/* Card 2 - Horas de Leitura */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <Clock size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark">Tempo</p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Horas de Leitura</p>
            <h2 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.hours.toFixed(1)}h</h2>
            <p className="text-[10px] text-pastel-gray-dark/70">de conteúdo</p>
          </div>

          {/* Card 3 - Taxa de Leitura Completa */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-pastel-blue/50 rounded-xl flex items-center justify-center">
                <CheckCircle size={22} className="text-pastel-gray-dark" />
              </div>
              <div className="px-2 py-1 bg-pastel-blue/50 rounded-full">
                <p className="text-[10px] font-bold text-pastel-gray-dark">Top 12%</p>
              </div>
            </div>
            <p className="text-xs font-medium text-pastel-gray-dark/80 mb-1">Taxa Leitura Completa</p>
            <h2 className="text-3xl font-bold text-pastel-gray-dark mb-1">{data.completion}%</h2>
            <p className="text-[10px] text-pastel-gray-dark/70">média: 65%</p>
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

        {/* Meta de Leitura + Autores Mais Lidos */}
        <div className="grid grid-cols-3 gap-6">
          {/* Gráfico de Meta Grande - 2/3 da largura */}
          <div className="col-span-2 bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Meta de Leitura do Mês</h3>
                <p className="text-sm text-muted-foreground">Acompanhe seu progresso e mantenha a consistência</p>
              </div>
              <div className="px-4 py-2 bg-pastel-blue/[0.2] rounded-xl">
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
                    stroke="hsl(207, 35%, 50%)"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 110}`}
                    strokeDashoffset={`${2 * Math.PI * 110 * (1 - (data.total / (selectedPeriod === '7d' ? 70 : selectedPeriod === '30d' ? 280 : selectedPeriod === '90d' ? 840 : 3360)))}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-bold text-foreground">{Math.round((data.total / (selectedPeriod === '7d' ? 70 : selectedPeriod === '30d' ? 280 : selectedPeriod === '90d' ? 840 : 3360)) * 100)}%</p>
                  <p className="text-sm text-muted-foreground mt-2">Concluído</p>
                </div>
              </div>

              {/* Estatísticas da Meta */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Artigos Lidos</p>
                    <p className="text-2xl font-bold text-foreground">{data.total}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Meta Total</p>
                    <p className="text-2xl font-bold text-foreground">{selectedPeriod === '7d' ? 70 : selectedPeriod === '30d' ? 280 : selectedPeriod === '90d' ? 840 : 3360}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Faltam</p>
                    <p className="text-2xl font-bold text-amber-600">{(selectedPeriod === '7d' ? 70 : selectedPeriod === '30d' ? 280 : selectedPeriod === '90d' ? 840 : 3360) - data.total}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Média Diária</p>
                      <p className="text-2xl font-bold text-foreground">{(data.total / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365)).toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground mt-1">artigos/dia</p>
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

                <div className="bg-gradient-to-r from-pastel-blue/[0.2] to-pastel-green/[0.2] rounded-xl p-4">
                  <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp size={16} className="text-foreground" />
                    Você está no caminho certo!
                  </p>
                  <p className="text-xs text-muted-foreground">Mantenha o ritmo atual para atingir sua meta em {Math.ceil(((selectedPeriod === '7d' ? 70 : selectedPeriod === '30d' ? 280 : selectedPeriod === '90d' ? 840 : 3360) - data.total) / (data.total / (selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365)))} dias.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Autores Mais Lidos - 1/3 da largura, vertical */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-6">Autores Mais Lidos</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">BC</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Banco Central</p>
                  <p className="text-sm text-muted-foreground">78 artigos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">TF</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Tech Finance</p>
                  <p className="text-sm text-muted-foreground">61 artigos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">RB</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Regulação Brasil</p>
                  <p className="text-sm text-muted-foreground">49 artigos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">MI</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Market Insights</p>
                  <p className="text-sm text-muted-foreground">32 artigos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-pastel-gray-dark">CF</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground mb-0.5">Crypto Finance</p>
                  <p className="text-sm text-muted-foreground">24 artigos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Menores em Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-blue/[0.2] rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Tempo Médio</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">{data.avgTime}</h4>
            <p className="text-sm text-muted-foreground">minutos por artigo</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-purple/[0.2] rounded-lg flex items-center justify-center">
                <Bookmark size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Salvos</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">{data.saved}</h4>
            <p className="text-sm text-muted-foreground">para ler depois</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-green/[0.2] rounded-lg flex items-center justify-center">
                <Award size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Compartilhados</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">{data.shares}</h4>
            <p className="text-sm text-muted-foreground">com sua rede</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pastel-pink/[0.2] rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-pastel-gray-dark" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">Meta Diária</p>
            </div>
            <h4 className="text-4xl font-bold text-foreground mb-2">4.2</h4>
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
          <h2 className="text-lg font-bold text-slate-800 mb-4">Artigos Lidos</h2>
          <div id="artigos-weekly-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Tema</h2>
          <div id="artigos-topics-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Tempo de Leitura por Faixa</h2>
          <div id="artigos-time-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Tempo de Leitura por Dia</h2>
          <div id="artigos-daily-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Temas por Engajamento e Taxa de Leitura</h2>
          <p className="text-sm text-slate-500 mb-4">Clique em um tema para ver artigos</p>
          <div id="artigos-engagement-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Horário</h2>
          <div id="artigos-hourly-chart" className="h-[280px] w-full"></div>
        </div>
      </section>

      {/* Artigos Lidos Recentemente */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Artigos Lidos Recentemente</h2>
        <div className="space-y-3">
          {recentArtigos.map((artigo, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-[hsl(207,35%,65%)] rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-slate-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{artigo.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{artigo.author} • {artigo.readTime} • {artigo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drill-down Modal */}
      {showDrillDown && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">{selectedTopic}</h2>
              <button onClick={() => setShowDrillDown(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3">
              {artigosByTopic[selectedTopic]?.map((artigo, idx) => (
                <div key={idx} className="p-4 border border-slate-100 rounded-lg">
                  <p className="font-semibold text-slate-800">{artigo.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{artigo.author} • {artigo.readTime} • {artigo.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};