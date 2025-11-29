import { useState } from "react";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Percent, BarChart3, Layers, ArrowUpRight, Users, UserX, UserCheck, MoreHorizontal, Calendar as CalendarIcon, Bot } from "lucide-react";
import { MetricsAgentChat } from "@/components/MetricsAgentChat";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { SelectableChartWrapper } from "@/components/Dashboard/SelectableChartWrapper";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const MetricasMRR = () => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<'MRR' | 'Churn' | 'Retention' | 'Others'>('MRR');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 5, 30),
  });
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [selectedChartData, setSelectedChartData] = useState<any>(null);

  const handleAskAgent = (selectionData: any) => {
    console.log('Chart selection data:', selectionData);
    setSelectedChartData({
      chartTitle: selectionData.chartTitle,
      chartData: selectionData.chartData,
      selectionArea: `X: ${selectionData.startX.toFixed(0)}-${selectionData.endX.toFixed(0)}, Y: ${selectionData.startY.toFixed(0)}-${selectionData.endY.toFixed(0)}`
    });
    setShowAgentChat(true);
  };

  // Cores pastel escuro do sistema
  const colors = {
    blue: '#5b8db8',
    green: '#6d9886',
    red: '#d88c9a',
    purple: '#957dad',
    yellow: '#e2c275',
    slate: '#64748b',
    teal: '#4e8d93'
  };

  // Dados para os gráficos
  const waterfallData = [{
    name: 'MRR Inicial',
    value: 420000,
    type: 'absolute'
  }, {
    name: 'Novo MRR',
    value: 85200,
    type: 'positive'
  }, {
    name: 'Expansão',
    value: 32800,
    type: 'positive'
  }, {
    name: 'Reativação',
    value: 5800,
    type: 'positive'
  }, {
    name: 'Contração',
    value: -8200,
    type: 'negative'
  }, {
    name: 'Churn',
    value: -18700,
    type: 'negative'
  }, {
    name: 'MRR Final',
    value: 516900,
    type: 'total'
  }];
  const compositionData = [{
    name: 'Novo MRR',
    value: 85200,
    color: colors.green
  }, {
    name: 'Expansão',
    value: 32800,
    color: colors.purple
  }, {
    name: 'Reativação',
    value: 5800,
    color: colors.teal
  }, {
    name: 'Contração',
    value: 8200,
    color: colors.yellow
  }, {
    name: 'Churn',
    value: 18700,
    color: colors.red
  }];
  const evolutionData = [{
    month: 'Jan',
    value: 320000
  }, {
    month: 'Fev',
    value: 345000
  }, {
    month: 'Mar',
    value: 368000
  }, {
    month: 'Abr',
    value: 392000
  }, {
    month: 'Mai',
    value: 415000
  }, {
    month: 'Jun',
    value: 428900
  }, {
    month: 'Jul',
    value: 445000
  }, {
    month: 'Ago',
    value: 460000
  }, {
    month: 'Set',
    value: 470000
  }, {
    month: 'Out',
    value: 480000
  }, {
    month: 'Nov',
    value: 482500
  }, {
    month: 'Dez',
    value: 495000
  }];
  const netNewMRRData = [{
    month: 'Jan',
    value: 25000
  }, {
    month: 'Fev',
    value: 23000
  }, {
    month: 'Mar',
    value: 24000
  }, {
    month: 'Abr',
    value: 22000
  }, {
    month: 'Mai',
    value: 23800
  }, {
    month: 'Jun',
    value: 53600
  }];
  const planDistributionData = [{
    name: 'Enterprise',
    value: 180000,
    color: colors.blue
  }, {
    name: 'Pro',
    value: 220000,
    color: colors.purple
  }, {
    name: 'Basic',
    value: 82500,
    color: colors.slate
  }];
  const contractionData = [{
    month: 'Jan',
    value: 6500
  }, {
    month: 'Fev',
    value: 7200
  }, {
    month: 'Mar',
    value: 8800
  }, {
    month: 'Abr',
    value: 7500
  }, {
    month: 'Mai',
    value: 8200
  }, {
    month: 'Jun',
    value: 8200
  }];
  const reactivationData = [{
    month: 'Jan',
    value: 4200
  }, {
    month: 'Fev',
    value: 5500
  }, {
    month: 'Mar',
    value: 6800
  }, {
    month: 'Abr',
    value: 5200
  }, {
    month: 'Mai',
    value: 4900
  }, {
    month: 'Jun',
    value: 5800
  }];
  const arpuData = [{
    month: 'Jan',
    value: 32.00
  }, {
    month: 'Fev',
    value: 32.50
  }, {
    month: 'Mar',
    value: 33.00
  }, {
    month: 'Abr',
    value: 33.80
  }, {
    month: 'Mai',
    value: 34.00
  }, {
    month: 'Jun',
    value: 34.50
  }];
  const quickRatioData = [{
    month: 'Jan',
    value: 3.8
  }, {
    month: 'Fev',
    value: 4.2
  }, {
    month: 'Mar',
    value: 3.9
  }, {
    month: 'Abr',
    value: 4.5
  }, {
    month: 'Mai',
    value: 4.1
  }, {
    month: 'Jun',
    value: 4.6
  }];
  const churnRateData = [{
    month: 'Jan',
    value: 4.2
  }, {
    month: 'Fev',
    value: 3.8
  }, {
    month: 'Mar',
    value: 4.5
  }, {
    month: 'Abr',
    value: 3.9
  }, {
    month: 'Mai',
    value: 4.1
  }, {
    month: 'Jun',
    value: 3.9
  }];
  const expansionRateData = [{
    month: 'Jan',
    value: 6.8
  }, {
    month: 'Fev',
    value: 7.2
  }, {
    month: 'Mar',
    value: 7.5
  }, {
    month: 'Abr',
    value: 8.1
  }, {
    month: 'Mai',
    value: 7.8
  }, {
    month: 'Jun',
    value: 7.6
  }];
  const segmentDistributionData = [{
    name: 'Enterprise',
    value: 180000
  }, {
    name: 'Pro',
    value: 220000
  }, {
    name: 'Basic',
    value: 82500
  }, {
    name: 'Trial',
    value: 0
  }];
  const forecastData = [{
    month: 'Jun',
    actual: 482500,
    realistic: 482500,
    conservative: 482500,
    optimistic: 482500
  }, {
    month: 'Jul',
    realistic: 495000,
    conservative: 490000,
    optimistic: 502000
  }, {
    month: 'Ago',
    realistic: 508000,
    conservative: 498000,
    optimistic: 522000
  }, {
    month: 'Set',
    realistic: 520000,
    conservative: 505000,
    optimistic: 542000
  }, {
    month: 'Out',
    realistic: 533000,
    conservative: 512000,
    optimistic: 563000
  }, {
    month: 'Nov',
    realistic: 546000,
    conservative: 518000,
    optimistic: 585000
  }, {
    month: 'Dez',
    realistic: 560000,
    conservative: 525000,
    optimistic: 608000
  }];
  return <div className="min-h-screen bg-background w-full flex">
      <SidebarFix />
      
      <div className="flex-1 w-full">
        <header className="bg-card border-b border-border w-full">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/financeiro")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <ArrowLeft size={18} />
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Análise Completa de Desempenho

 </h1>
                <p className="text-xs text-muted-foreground">Todas as métricas de desempenho financeiro em um único painel</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <BarChart3 className="h-4 w-4" />
                  MRR
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 transition-all hover:bg-accent hover:text-accent-foreground"
                  onClick={() => navigate('/churn')}
                >
                  <UserX className="h-4 w-4" />
                  Churn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 transition-all hover:bg-accent hover:text-accent-foreground"
                  onClick={() => navigate('/retention')}
                >
                  <UserCheck className="h-4 w-4" />
                  Retention
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 transition-all hover:bg-accent hover:text-accent-foreground"
                  onClick={() => navigate('/others')}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  Others
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Subheader with filters */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 gap-2 text-sm"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd MMM yyyy", { locale: ptBR })} -{" "}
                          {format(dateRange.to, "dd MMM yyyy", { locale: ptBR })}
                        </>
                      ) : (
                        format(dateRange.from, "dd MMM yyyy", { locale: ptBR })
                      )
                    ) : (
                      <span>Selecionar período</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                    classNames={{
                      months: "flex gap-8 relative",
                      month: "space-y-4 first:pr-8 last:pl-8 last:border-l last:border-border",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button className="h-9 gap-2" onClick={() => setShowAgentChat(true)}>
              <Bot className="h-4 w-4" />
              Agente de IA
            </Button>
          </div>
        </div>

        <main className="p-4 w-full">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{
                backgroundColor: 'hsl(210, 35%, 85%)'
              }}>
                  <DollarSign className="text-lg" style={{
                  color: colors.slate
                }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                backgroundColor: 'hsl(152, 32%, 85%)',
                color: 'hsl(152, 32%, 28%)'
              }}>+12.5%</span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">MRR Total</p>
              <h3 className="text-2xl font-bold text-foreground">R$ 482.5k</h3>
              <p className="text-xs text-muted-foreground mt-1">vs R$ 428.9k mês anterior</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{
                backgroundColor: 'hsl(152, 25%, 85%)'
              }}>
                  <TrendingUp className="text-lg" style={{
                  color: colors.slate
                }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                backgroundColor: 'hsl(152, 32%, 85%)',
                color: 'hsl(152, 32%, 28%)'
              }}>+R$ 60k</span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Novo MRR</p>
              <h3 className="text-2xl font-bold text-foreground">R$ 85.2k</h3>
              <p className="text-xs text-muted-foreground mt-1">Novos assinantes</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{
                backgroundColor: 'hsl(270, 25%, 85%)'
              }}>
                  <BarChart3 className="text-lg" style={{
                  color: colors.slate
                }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                backgroundColor: 'hsl(152, 32%, 85%)',
                color: 'hsl(152, 32%, 28%)'
              }}>+R$ 25k</span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Expansão MRR</p>
              <h3 className="text-2xl font-bold text-foreground">R$ 32.8k</h3>
              <p className="text-xs text-muted-foreground mt-1">Upgrades e upsells</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{
                backgroundColor: 'hsl(350, 35%, 85%)'
              }}>
                  <TrendingDown className="text-lg" style={{
                  color: colors.slate
                }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                backgroundColor: 'hsl(350, 35%, 85%)',
                color: 'hsl(350, 35%, 35%)'
              }}>-R$ 12.5k</span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Churn MRR</p>
              <h3 className="text-2xl font-bold text-foreground">R$ 18.7k</h3>
              <p className="text-xs text-muted-foreground mt-1">Cancelamentos</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{
                backgroundColor: 'hsl(45, 35%, 85%)'
              }}>
                  <Percent className="text-lg" style={{
                  color: colors.slate
                }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                backgroundColor: 'hsl(210, 25%, 85%)',
                color: 'hsl(210, 25%, 35%)'
              }}>+0.2%</span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">MRR Growth Rate</p>
              <h3 className="text-2xl font-bold text-foreground">12.5%</h3>
              <p className="text-xs text-muted-foreground mt-1">Crescimento mensal</p>
            </div>
          </div>

          {/* Movimentação e Composição */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2 bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Movimentação de MRR (Waterfall)</h3>
                  <p className="text-xs text-muted-foreground">Visualização detalhada das mudanças no MRR</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Movimentação de MRR (Waterfall)" chartData={waterfallData}>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={waterfallData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{
                    fontSize: 11
                  }} height={60} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                    <Bar dataKey="value" fill={colors.blue}>
                      {waterfallData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.type === 'positive' ? colors.green : entry.type === 'negative' ? colors.red : colors.blue} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-base font-bold text-foreground">Composição MRR</h3>
                  <p className="text-xs text-muted-foreground">Por tipo de movimento</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Composição MRR" chartData={compositionData}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={compositionData} 
                      cx="50%" 
                      cy="38%" 
                      innerRadius={65} 
                      outerRadius={100} 
                      paddingAngle={0} 
                      dataKey="value"
                    >
                      {compositionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))'
                      }}
                      formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} 
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      wrapperStyle={{ paddingTop: '0px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>
          </div>

          {/* Evolução e Net New MRR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Evolução do MRR (12 meses)</h3>
                  <p className="text-xs text-muted-foreground">Tendência histórica mensal</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Evolução do MRR (12 meses)" chartData={evolutionData}>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={evolutionData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.blue} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.blue} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{
                    fontSize: 11
                  }} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                    <Area type="monotone" dataKey="value" stroke={colors.blue} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Net New MRR</h3>
                  <p className="text-xs text-muted-foreground">Novo + Expansão - Contração - Churn</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Net New MRR" chartData={netNewMRRData}>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={netNewMRRData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{
                    fontSize: 11
                  }} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                    <Bar dataKey="value" fill={colors.green} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>
          </div>

          {/* Mini Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-3 rounded-xl border border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">MRR por Plano</h4>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="MRR por Plano" chartData={planDistributionData}>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={planDistributionData} cx="50%" cy="50%" innerRadius={30} outerRadius={60} paddingAngle={2} dataKey="value">
                      {planDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                  </PieChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>

            <div className="bg-card p-3 rounded-xl border border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Contração MRR</h4>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Contração MRR" chartData={contractionData}>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={contractionData}>
                    <defs>
                      <linearGradient id="colorContraction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.yellow} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.yellow} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{
                    fontSize: 9
                  }} hide />
                    <YAxis hide />
                    <Tooltip formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                    <Area type="monotone" dataKey="value" stroke={colors.yellow} strokeWidth={2} fill="url(#colorContraction)" />
                  </AreaChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">Downgrades</p>
                <p className="text-lg font-bold text-foreground">R$ 8.2k</p>
              </div>
            </div>

            <div className="bg-card p-3 rounded-xl border border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Reativação MRR</h4>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Reativação MRR" chartData={reactivationData}>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={reactivationData}>
                    <defs>
                      <linearGradient id="colorReactivation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.teal} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.teal} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{
                    fontSize: 9
                  }} hide />
                    <YAxis hide />
                    <Tooltip formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                    <Area type="monotone" dataKey="value" stroke={colors.teal} strokeWidth={2} fill="url(#colorReactivation)" />
                  </AreaChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">Clientes retornados</p>
                <p className="text-lg font-bold text-foreground">R$ 5.8k</p>
              </div>
            </div>

            <div className="bg-card p-3 rounded-xl border border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">MRR Médio/Cliente</h4>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="MRR Médio/Cliente (ARPU)" chartData={arpuData}>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={arpuData}>
                    <XAxis dataKey="month" tick={{
                    fontSize: 9
                  }} hide />
                    <YAxis hide />
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Line type="monotone" dataKey="value" stroke={colors.purple} strokeWidth={2} dot={{
                    r: 3
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">ARPU</p>
                <p className="text-lg font-bold text-foreground">R$ 34.50</p>
              </div>
            </div>
          </div>

          {/* Advanced Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Quick Ratio MRR</h3>
                  <p className="text-xs text-muted-foreground">(Novo + Expansão) / (Contração + Churn)</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Quick Ratio MRR" chartData={quickRatioData}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={quickRatioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{
                    fontSize: 11
                  }} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} />
                    <Bar dataKey="value" fill={colors.green} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">MRR Churn Rate</h3>
                  <p className="text-xs text-muted-foreground">Taxa mensal de perda de MRR</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="MRR Churn Rate" chartData={churnRateData}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={churnRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{
                    fontSize: 11
                  }} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Line type="monotone" dataKey="value" stroke={colors.red} strokeWidth={3} dot={{
                    r: 5
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">MRR Expansion Rate</h3>
                  <p className="text-xs text-muted-foreground">Taxa de crescimento via expansão</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="MRR Expansion Rate" chartData={expansionRateData}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={expansionRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{
                    fontSize: 11
                  }} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Line type="monotone" dataKey="value" stroke={colors.purple} strokeWidth={3} dot={{
                    r: 5
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>
          </div>

          {/* Segment Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Análise de Coorte MRR</h3>
                  <p className="text-xs text-muted-foreground">Retenção de receita por coorte de entrada</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-muted-foreground font-medium">Coorte</th>
                      <th className="text-center p-2 text-muted-foreground font-medium">M0</th>
                      <th className="text-center p-2 text-muted-foreground font-medium">M1</th>
                      <th className="text-center p-2 text-muted-foreground font-medium">M2</th>
                      <th className="text-center p-2 text-muted-foreground font-medium">M3</th>
                      <th className="text-center p-2 text-muted-foreground font-medium">M4</th>
                      <th className="text-center p-2 text-muted-foreground font-medium">M5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['Jan', 100, 98, 95, 92, 90, 88], ['Fev', 100, 97, 94, 91, 89, 87], ['Mar', 100, 96, 93, 90, 88, null], ['Abr', 100, 95, 92, 89, null, null], ['Mai', 100, 94, 91, null, null, null], ['Jun', 100, 93, null, null, null, null]].map((row, i) => <tr key={i} className="border-b border-border/50">
                        <td className="p-2 font-medium">{row[0]}</td>
                        {row.slice(1).map((val, j) => <td key={j} className="text-center p-2" style={{
                      backgroundColor: val ? `hsl(210, 35%, ${100 - (val as number) / 2}%)` : 'transparent',
                      color: val && val as number < 95 ? 'white' : 'inherit'
                    }}>
                            {val ? `${val}%` : '-'}
                          </td>)}
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Distribuição MRR por Segmento</h3>
                  <p className="text-xs text-muted-foreground">Breakdown por tipo de cliente</p>
                </div>
              </div>
              <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Distribuição MRR por Segmento" chartData={segmentDistributionData}>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={segmentDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{
                    fontSize: 11
                  }} />
                    <YAxis tick={{
                    fontSize: 11
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))'
                  }} formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {segmentDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={[colors.blue, colors.purple, colors.slate, colors.slate][index]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </SelectableChartWrapper>
            </div>
          </div>

          {/* Forecast */}
          <div className="bg-card p-4 rounded-xl border border-border mb-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Projeção de MRR (6 meses)</h3>
                <p className="text-xs text-muted-foreground">Baseado em tendências históricas e pipeline</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 rounded-full" style={{
                backgroundColor: 'hsl(210, 25%, 85%)',
                color: 'hsl(210, 25%, 35%)'
              }}>Conservador</span>
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
                backgroundColor: 'hsl(210, 35%, 85%)',
                color: colors.blue
              }}>Realista</span>
                <span className="text-xs px-3 py-1 rounded-full" style={{
                backgroundColor: 'hsl(210, 25%, 85%)',
                color: 'hsl(210, 25%, 35%)'
              }}>Otimista</span>
              </div>
            </div>
            <SelectableChartWrapper onAskAgent={handleAskAgent} chartTitle="Projeção de MRR (6 meses)" chartData={forecastData}>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{
                  fontSize: 11
                }} />
                  <YAxis tick={{
                  fontSize: 11
                }} />
                  <Tooltip contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))'
                }} formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke={colors.blue} strokeWidth={3} name="MRR Real" dot={{
                  r: 5
                }} />
                  <Line type="monotone" dataKey="realistic" stroke={colors.green} strokeWidth={3} strokeDasharray="5 5" name="Projeção Realista" dot={{
                  r: 4
                }} />
                  <Line type="monotone" dataKey="conservative" stroke={colors.slate} strokeWidth={2} strokeDasharray="3 3" name="Conservador" dot={false} opacity={0.7} />
                  <Line type="monotone" dataKey="optimistic" stroke={colors.purple} strokeWidth={2} strokeDasharray="3 3" name="Otimista" dot={false} opacity={0.7} />
                </LineChart>
              </ResponsiveContainer>
            </SelectableChartWrapper>
          </div>
        </main>
      </div>
      
      {showAgentChat && (
        <MetricsAgentChat 
          metricType="MRR" 
          onClose={() => {
            setShowAgentChat(false);
            setSelectedChartData(null);
          }}
          initialContext={selectedChartData}
        />
      )}
    </div>;
};
export default MetricasMRR;