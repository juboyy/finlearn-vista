import { useEffect, useState } from "react";
import Plotly from 'plotly.js-dist';
import { TrendingUp, Clock, CheckCircle, Book, BarChart3, Highlighter, Bookmark, Target, Award } from "lucide-react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";

export const EbooksAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [insights, setInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const ebooksByCategory: Record<string, Array<{
    title: string;
    author: string;
    progress: number;
    pages: string;
  }>> = {
    'Mercado Financeiro': [
      { title: 'Open Finance: Guia Completo', author: 'Dr. Carlos Mendes', progress: 88, pages: '245/280' },
      { title: 'Análise Técnica Avançada', author: 'Prof. Ana Santos', progress: 65, pages: '182/295' },
      { title: 'Derivativos e Hedge', author: 'Roberto Lima', progress: 100, pages: '320/320' }
    ],
    'Tecnologia': [
      { title: 'Blockchain e Criptomoedas', author: 'Ana Paula Costa', progress: 72, pages: '215/298' },
      { title: 'IA no Mercado Financeiro', author: 'Dr. João Silva', progress: 58, pages: '142/245' }
    ],
    'Compliance': [
      { title: 'Compliance Bancário na Prática', author: 'Dra. Marina Costa', progress: 92, pages: '275/299' },
      { title: 'LGPD para Instituições Financeiras', author: 'Prof. Ricardo Santos', progress: 78, pages: '188/240' }
    ],
    'Gestão': [
      { title: 'Gestão de Riscos Financeiros', author: 'Dr. Paulo Mendes', progress: 55, pages: '165/300' },
      { title: 'ESG no Setor Financeiro', author: 'Ana Clara Lima', progress: 42, pages: '128/305' }
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
        `• **Velocidade de leitura consistente**: Sua média de 32 páginas/dia demonstra ritmo sustentável e disciplinado. Leitores com essa consistência têm 60% mais retenção de conteúdo comparado a padrões esporádicos de leitura intensiva.

• **Alto uso de anotações**: 156 destaques e notas indicam leitura ativa e engajada. Pesquisas mostram que leitores que fazem anotações retêm 40% mais informações. Continue marcando passagens importantes e fazendo resumos pessoais.

• **Taxa de conclusão excepcional**: 68% dos e-books iniciados foram completados, superando em 23% a média da plataforma (45%). Isso sugere curadoria criteriosa na seleção de materiais e alta motivação para aprender.

• **Diversificação de temas**: Equilibrar leituras entre Mercado Financeiro (35%), Tecnologia (28%), Compliance (22%) e Gestão (15%) garante visão holística do ecossistema financeiro, evitando especialização excessiva em área única.`,

        `• **Padrão de leitura noturna**: 42% das páginas são lidas entre 20:00-23:00, sugerindo hábito de leitura antes de dormir. Para otimizar, considere usar modo noturno para reduzir fadiga visual e melhorar qualidade do sono.

• **Oportunidade em finais de semana**: Sábados e domingos representam apenas 18% do total de páginas lidas. Implementar sessões de 1h nos finais de semana poderia adicionar 8-10 e-books completos por ano ao seu repertório.

• **E-books técnicos requerem mais tempo**: Livros de Mercado Financeiro têm 35% menos taxa de conclusão que outros temas, indicando densidade técnica. Use técnica Pomodoro (25min leitura + 5min pausa) para conteúdos complexos.

• **Marcadores subutilizados**: Apenas 28 marcadores para 28 e-books sugere baixo uso dessa funcionalidade. Marcar pontos-chave facilita revisões futuras e acelera localização de conceitos importantes.`
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

  const recentEbooks = [
    { title: 'Open Finance: Guia Completo', author: 'Dr. Carlos Mendes', progress: 88, pages: '245/280', date: 'Hoje' },
    { title: 'Blockchain e Criptomoedas', author: 'Ana Paula Costa', progress: 72, pages: '215/298', date: 'Ontem' },
    { title: 'Gestão de Riscos Financeiros', author: 'Roberto Lima', progress: 100, pages: '320/320', date: '2 dias atrás' },
    { title: 'ESG no Mercado Financeiro', author: 'Marina Costa', progress: 42, pages: '128/305', date: '3 dias atrás' },
    { title: 'Compliance Bancário na Prática', author: 'Prof. João Silva', progress: 75, pages: '180/240', date: '5 dias atrás' }
  ];

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;
    const pastelBlue = '#8AAACF';
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';
    const pastelPink = '#CC99A9';
    const pastelOrange = '#C9AF89';
    const pastelYellow = '#E6D595';

    const getDataByPeriod = () => {
      const datasets = {
        '7d': {
          weeklyProgress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [45, 52, 38, 61, 48, 24, 12] },
          categoryDistribution: { labels: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão'], values: [35, 28, 22, 15] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [2, 3, 4, 8] },
          readingTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [1.5, 1.8, 1.2, 2.0, 1.6, 0.8, 0.4] },
          topicEngagement: { x: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão', 'Investimentos'], y: [6, 4, 3, 2, 2], completion: [65, 75, 82, 58, 70] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [0, 2, 8, 12, 15, 42] },
          kpis: { total: 5, growth: 15, pages: 314, completion: 68, streak: 6, avgPages: 32, highlights: 28, bookmarks: 12, notes: 18 }
        },
        '30d': {
          weeklyProgress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [180, 210, 152, 244, 192, 96, 48] },
          categoryDistribution: { labels: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão'], values: [35, 28, 22, 15] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [6, 10, 14, 28] },
          readingTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [6.0, 7.0, 5.1, 8.1, 6.4, 3.2, 1.6] },
          topicEngagement: { x: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão', 'Investimentos'], y: [24, 18, 14, 10, 8], completion: [65, 75, 82, 58, 70] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [2, 8, 32, 48, 60, 168] },
          kpis: { total: 28, growth: 22, pages: 1256, completion: 68, streak: 23, avgPages: 32, highlights: 156, bookmarks: 28, notes: 89 }
        },
        '90d': {
          weeklyProgress: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [540, 630, 456, 732, 576, 288, 144] },
          categoryDistribution: { labels: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão'], values: [35, 28, 22, 15] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [18, 30, 42, 84] },
          readingTime: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [18.0, 21.0, 15.2, 24.4, 19.2, 9.6, 4.8] },
          topicEngagement: { x: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão', 'Investimentos'], y: [72, 54, 42, 30, 24], completion: [65, 75, 82, 58, 70] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [6, 24, 96, 144, 180, 504] },
          kpis: { total: 82, growth: 26, pages: 3768, completion: 70, streak: 68, avgPages: 32, highlights: 468, bookmarks: 84, notes: 267 }
        },
        '1y': {
          weeklyProgress: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [2160, 2520, 1824, 2928, 2304, 1152, 576, 2640, 2160, 2880, 2304, 2688] },
          categoryDistribution: { labels: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão'], values: [35, 28, 22, 15] },
          completionRate: { x: ['0-25%', '26-50%', '51-75%', '76-100%'], y: [72, 120, 168, 336] },
          readingTime: { x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], y: [72, 84, 61, 98, 77, 38, 19, 88, 72, 96, 77, 90] },
          topicEngagement: { x: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão', 'Investimentos'], y: [288, 216, 168, 120, 96], completion: [65, 75, 82, 58, 70] },
          hourlyDistribution: { x: ['00h', '04h', '08h', '12h', '16h', '20h'], y: [24, 96, 384, 576, 720, 2016] },
          kpis: { total: 336, growth: 30, pages: 15072, completion: 72, streak: 289, avgPages: 32, highlights: 1872, bookmarks: 336, notes: 1068 }
        }
      };
      return datasets[selectedPeriod];
    };

    const data = getDataByPeriod();

    // Weekly Progress Chart
    Plotly.newPlot('ebooks-weekly-chart', [{
      x: data.weeklyProgress.x,
      y: data.weeklyProgress.y,
      type: 'bar',
      marker: { color: pastelPurple }
    }], {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Páginas Lidas' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Category Distribution Chart
    Plotly.newPlot('ebooks-categories-chart', [{
      labels: data.categoryDistribution.labels,
      values: data.categoryDistribution.values,
      type: 'pie',
      marker: { colors: [pastelBlue, pastelGreen, pastelPink, pastelOrange] },
      textinfo: 'none',
      hoverinfo: 'label+percent+value'
    }], {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Completion Rate Chart
    Plotly.newPlot('ebooks-completion-chart', [{
      x: data.completionRate.x,
      y: data.completionRate.y,
      type: 'bar',
      marker: { color: [pastelPink, pastelYellow, pastelGreen, pastelBlue] }
    }], {
      margin: { l: 40, r: 20, t: 20, b: 60 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'E-books' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Reading Time Chart
    Plotly.newPlot('ebooks-time-chart', [{
      x: data.readingTime.x,
      y: data.readingTime.y,
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: pastelGreen, width: 3, shape: 'spline' },
      marker: { size: 8, color: pastelGreen }
    }], {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Horas' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Topic Engagement Correlation Chart
    Plotly.newPlot('ebooks-topic-chart', [{
      x: data.topicEngagement.x,
      y: data.topicEngagement.y,
      name: 'E-books Lidos',
      type: 'bar',
      marker: { color: pastelBlue },
      yaxis: 'y'
    }, {
      x: data.topicEngagement.x,
      y: data.topicEngagement.completion,
      name: 'Taxa Conclusão (%)',
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: pastelPink, width: 3 },
      marker: { size: 10, color: pastelPink },
      yaxis: 'y2'
    }], {
      margin: { l: 50, r: 50, t: 20, b: 80 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { title: 'E-books', gridcolor: '#f1f5f9', side: 'left' },
      yaxis2: { title: 'Taxa de Conclusão (%)', overlaying: 'y', side: 'right', range: [0, 100] },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: true,
      legend: { x: 0.5, y: 1.1, xanchor: 'center', orientation: 'h' }
    }, { displayModeBar: false });

    // Hourly Distribution Chart
    Plotly.newPlot('ebooks-hourly-chart', [{
      x: data.hourlyDistribution.x,
      y: data.hourlyDistribution.y,
      type: 'scatter',
      fill: 'tozeroy',
      fillcolor: 'rgba(172, 156, 201, 0.3)',
      line: { color: pastelPurple, width: 2 }
    }], {
      margin: { l: 40, r: 20, t: 20, b: 30 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: '% de Leitura' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Add click event to topic chart
    const topicChart = document.getElementById('ebooks-topic-chart');
    if (topicChart) {
      (topicChart as any).on('plotly_click', (data: any) => {
        const pointIndex = data.points[0].pointIndex;
        const categories = ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão', 'Investimentos'];
        const clickedCategory = categories[pointIndex];
        setSelectedCategory(clickedCategory);
        setShowDrillDown(true);
      });
    }
  };

  const data = (() => {
    const datasets = {
      '7d': { total: 5, growth: 15, pages: 314, completion: 68, streak: 6, avgPages: 32, highlights: 28, bookmarks: 12, notes: 18 },
      '30d': { total: 28, growth: 22, pages: 1256, completion: 68, streak: 23, avgPages: 32, highlights: 156, bookmarks: 28, notes: 89 },
      '90d': { total: 82, growth: 26, pages: 3768, completion: 70, streak: 68, avgPages: 32, highlights: 468, bookmarks: 84, notes: 267 },
      '1y': { total: 336, growth: 30, pages: 15072, completion: 72, streak: 289, avgPages: 32, highlights: 1872, bookmarks: 336, notes: 1068 }
    };
    return datasets[selectedPeriod];
  })();

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: E-books</h2>
        <p className="text-slate-600">Análise detalhada do seu histórico de leitura e anotações</p>
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

      {/* KPIs Overview - 9 Cards */}
      <section className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">E-books Lidos</p>
            <Book size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.total}</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> {data.growth}% no período
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Páginas Lidas</p>
            <BarChart3 size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.pages.toLocaleString()}</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Total de páginas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Taxa de Conclusão</p>
            <CheckCircle size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.completion}%</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Média da plataforma: 45%</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Streak de Leitura</p>
            <Award size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.streak} dias</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Consecutivos</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Média Diária</p>
            <Target size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.avgPages} pág</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Por dia de leitura</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Destaques</p>
            <Highlighter size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.highlights}</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Passagens destacadas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Marcadores</p>
            <Bookmark size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.bookmarks}</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Páginas marcadas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Anotações</p>
            <Clock size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.notes}</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Notas criadas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-500">Meta Semanal</p>
            <TrendingUp size={20} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">200 pág</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">✓ Cumprida {Math.round(data.streak * 0.75)} vezes</p>
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
          <h2 className="text-lg font-bold text-slate-800 mb-4">Progresso de Leitura</h2>
          <div id="ebooks-weekly-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Categoria</h2>
          <div id="ebooks-categories-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Taxa de Conclusão por Faixa</h2>
          <div id="ebooks-completion-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Tempo de Leitura</h2>
          <div id="ebooks-time-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Categorias por Engajamento e Conclusão</h2>
          <p className="text-sm text-slate-500 mb-4">Clique em uma categoria para ver e-books</p>
          <div id="ebooks-topic-chart" className="h-[280px] w-full"></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Distribuição por Horário</h2>
          <div id="ebooks-hourly-chart" className="h-[280px] w-full"></div>
        </div>
      </section>

      {/* E-books Recentes */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">E-books Lidos Recentemente</h2>
        <div className="space-y-3">
          {recentEbooks.map((ebook, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-[hsl(281,35%,75%)] rounded-lg flex items-center justify-center">
                  <Book size={18} className="text-slate-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{ebook.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{ebook.author} • {ebook.pages} páginas • {ebook.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: `${ebook.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-12">{ebook.progress}%</span>
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
              {ebooksByCategory[selectedCategory]?.map((ebook, idx) => (
                <div key={idx} className="p-4 border border-slate-100 rounded-lg">
                  <p className="font-semibold text-slate-800">{ebook.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{ebook.author} • {ebook.pages} páginas</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[hsl(142,35%,65%)]" style={{ width: `${ebook.progress}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{ebook.progress}%</span>
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