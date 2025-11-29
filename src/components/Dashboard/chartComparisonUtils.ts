import { getPeriodLabel } from "./PeriodComparisonToggle";

const pastelGreen = '#8EBC9F';
const pastelPurple = '#AC9CC9';
const pastelBlue = '#8AAACF';
const pastelPink = '#CC99A9';

interface ChartData {
  x: string[] | number[];
  y: number[];
}

interface ComparisonChartConfig {
  currentData: ChartData;
  comparisonData: ChartData | null;
  currentPeriod: '7d' | '30d' | '90d' | '1y';
  comparisonPeriod: '7d' | '30d' | '90d' | '1y';
  comparisonMode: boolean;
  chartType: 'line' | 'bar';
  title?: string;
}

export const createComparisonLineChart = (config: ComparisonChartConfig) => {
  const traces: any[] = [{
    x: config.currentData.x,
    y: config.currentData.y,
    type: 'scatter',
    mode: 'lines+markers',
    name: config.comparisonMode ? getPeriodLabel(config.currentPeriod) : config.title || 'Dados',
    line: { color: pastelGreen, width: 3, shape: 'spline' },
    marker: { size: 8, color: pastelGreen }
  }];

  if (config.comparisonMode && config.comparisonData) {
    traces.push({
      x: config.comparisonData.x,
      y: config.comparisonData.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: getPeriodLabel(config.comparisonPeriod),
      line: { color: pastelPurple, width: 3, shape: 'spline', dash: 'dash' },
      marker: { size: 8, color: pastelPurple }
    });
  }

  return traces;
};

export const createComparisonBarChart = (config: ComparisonChartConfig) => {
  const traces: any[] = [{
    x: config.currentData.x,
    y: config.currentData.y,
    type: 'bar',
    name: config.comparisonMode ? getPeriodLabel(config.currentPeriod) : config.title || 'Dados',
    marker: { color: pastelGreen }
  }];

  if (config.comparisonMode && config.comparisonData) {
    traces.push({
      x: config.comparisonData.x,
      y: config.comparisonData.y,
      type: 'bar',
      name: getPeriodLabel(config.comparisonPeriod),
      marker: { color: pastelPurple }
    });
  }

  return traces;
};

export const createComparisonLayout = (comparisonMode: boolean, additionalConfig: any = {}) => {
  return {
    ...additionalConfig,
    showlegend: comparisonMode,
    legend: comparisonMode ? { orientation: 'h', y: 1.1 } : undefined,
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    barmode: comparisonMode ? 'group' : 'relative',
  };
};

export const createComparisonAreaChart = (config: ComparisonChartConfig) => {
  const traces: any[] = [{
    x: config.currentData.x,
    y: config.currentData.y,
    type: 'scatter',
    fill: 'tozeroy',
    name: config.comparisonMode ? getPeriodLabel(config.currentPeriod) : config.title || 'Dados',
    fillcolor: 'rgba(142, 188, 159, 0.3)',
    line: { color: pastelGreen, width: 2 }
  }];

  if (config.comparisonMode && config.comparisonData) {
    traces.push({
      x: config.comparisonData.x,
      y: config.comparisonData.y,
      type: 'scatter',
      fill: 'tozeroy',
      name: getPeriodLabel(config.comparisonPeriod),
      fillcolor: 'rgba(172, 156, 201, 0.3)',
      line: { color: pastelPurple, width: 2, dash: 'dash' }
    });
  }

  return traces;
};

// Mock data generator for periods (can be customized per component)
export const generateMockDataByPeriod = (periodType: 'weekly' | 'completion' | 'time') => {
  return (period: '7d' | '30d' | '90d' | '1y') => {
    const baseMultipliers = {
      '7d': 1,
      '30d': 4,
      '90d': 12,
      '1y': 50
    };
    
    const multiplier = baseMultipliers[period];

    if (periodType === 'weekly') {
      const labels = period === '1y' 
        ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        : ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      const baseValues = period === '1y'
        ? [62, 71, 84, 79, 92, 88, 81, 89, 86, 95, 92, 98]
        : [18, 15, 20, 17, 14, 8, 5];
      return {
        x: labels,
        y: baseValues.map(v => Math.round(v * multiplier / 4))
      };
    } else if (periodType === 'completion') {
      return {
        x: ['0-25%', '26-50%', '51-75%', '76-100%'],
        y: [8, 15, 28, 94].map(v => Math.round(v * multiplier / 4))
      };
    } else {
      const labels = period === '1y'
        ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        : ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      const baseValues = period === '1y'
        ? [43.4, 49.7, 58.8, 55.3, 64.4, 61.6, 56.7, 62.3, 60.2, 66.5, 64.4, 68.6]
        : [12.6, 10.5, 14.0, 11.9, 9.8, 5.6, 3.5];
      return {
        x: labels,
        y: baseValues.map(v => parseFloat((v * multiplier / 4).toFixed(1)))
      };
    }
  };
};
