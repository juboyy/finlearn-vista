import { ArrowLeft, Calendar, Users, DollarSign, Clock, TrendingUp, BarChart3, UserX, UserCheck, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Area, AreaChart
} from "recharts";

const Others = () => {
  const navigate = useNavigate();

  const colors = {
    blue: '#5b8db8',
    green: '#6d9886',
    red: '#d88c9a',
    purple: '#957dad',
    yellow: '#e2c275',
    slate: '#64748b',
    teal: '#4e8d93',
    orange: '#d4a574',
    pink: '#c4a4b0'
  };

  // Dados dos gráficos
  const arrGrowthData = [
    { month: 'Jan', rate: 15 },
    { month: 'Fev', rate: 17 },
    { month: 'Mar', rate: 18 },
    { month: 'Abr', rate: 16 },
    { month: 'Mai', rate: 19 },
    { month: 'Jun', rate: 21 }
  ];

  const newExpansionData = [
    { month: 'Jan', new: 850, expansion: 320 },
    { month: 'Fev', new: 920, expansion: 380 },
    { month: 'Mar', new: 890, expansion: 420 },
    { month: 'Abr', new: 1050, expansion: 450 },
    { month: 'Mai', new: 1120, expansion: 490 },
    { month: 'Jun', new: 1200, expansion: 530 }
  ];

  const quickRatioData = [
    { month: 'Jan', ratio: 3.2 },
    { month: 'Fev', ratio: 3.4 },
    { month: 'Mar', ratio: 3.6 },
    { month: 'Abr', ratio: 3.8 },
    { month: 'Mai', ratio: 4.0 },
    { month: 'Jun', ratio: 4.2 }
  ];

  const revenueRetentionData = [
    { month: 'M1', rate: 100 },
    { month: 'M2', rate: 95 },
    { month: 'M3', rate: 92 },
    { month: 'M4', rate: 90 },
    { month: 'M5', rate: 88 },
    { month: 'M6', rate: 87 }
  ];

  const ndrData = [
    { month: 'Jan', ndr: 112 },
    { month: 'Fev', ndr: 115 },
    { month: 'Mar', ndr: 118 },
    { month: 'Abr', ndr: 120 },
    { month: 'Mai', ndr: 122 },
    { month: 'Jun', ndr: 125 }
  ];

  const conversionFunnelData = [
    { stage: 'Visitantes', value: 10000 },
    { stage: 'Trials', value: 2500 },
    { stage: 'Conversões', value: 608 },
    { stage: 'Clientes Ativos', value: 573 }
  ];

  const salesCycleData = [
    { segment: 'SMB', days: 28 },
    { segment: 'Mid-Market', days: 45 },
    { segment: 'Enterprise', days: 72 }
  ];

  const dauMauData = [
    { month: 'Jan', ratio: 0.42 },
    { month: 'Fev', ratio: 0.45 },
    { month: 'Mar', ratio: 0.48 },
    { month: 'Abr', ratio: 0.50 },
    { month: 'Mai', ratio: 0.52 },
    { month: 'Jun', ratio: 0.54 }
  ];

  const featureAdoptionData = [
    { feature: 'Feature A', rate: 78 },
    { feature: 'Feature B', rate: 65 },
    { feature: 'Feature C', rate: 82 },
    { feature: 'Feature D', rate: 58 },
    { feature: 'Feature E', rate: 71 }
  ];

  const timeToValueData = [
    { range: '< 1 semana', users: 42 },
    { range: '1-2 semanas', users: 28 },
    { range: '2-4 semanas', users: 18 },
    { range: '> 4 semanas', users: 12 }
  ];

  const pqlData = [
    { month: 'Jan', pql: 145 },
    { month: 'Fev', pql: 168 },
    { month: 'Mar', pql: 192 },
    { month: 'Abr', pql: 215 },
    { month: 'Mai', pql: 238 },
    { month: 'Jun', pql: 265 }
  ];

  const activationRateData = [
    { month: 'Jan', rate: 68 },
    { month: 'Fev', rate: 72 },
    { month: 'Mar', rate: 75 },
    { month: 'Abr', rate: 78 },
    { month: 'Mai', rate: 81 },
    { month: 'Jun', rate: 84 }
  ];

  const revenueSegmentData = [
    { segment: 'Enterprise', value: 45, color: colors.blue },
    { segment: 'Mid-Market', value: 32, color: colors.green },
    { segment: 'SMB', value: 23, color: colors.yellow }
  ];

  const customerConcentrationData = [
    { tier: 'Top 10', revenue: 35 },
    { tier: '11-50', revenue: 42 },
    { tier: '51-100', revenue: 15 },
    { tier: 'Demais', revenue: 8 }
  ];

  const contractLengthData = [
    { length: 'Mensal', value: 25, color: colors.red },
    { length: 'Trimestral', value: 18, color: colors.yellow },
    { length: 'Anual', value: 45, color: colors.green },
    { length: 'Multi-ano', value: 12, color: colors.blue }
  ];

  const pricingTierData = [
    { tier: 'Starter', users: 3500 },
    { tier: 'Professional', users: 2800 },
    { tier: 'Business', users: 1500 },
    { tier: 'Enterprise', users: 742 }
  ];

  const opexBreakdownData = [
    { category: 'R&D', value: 42, color: colors.blue },
    { category: 'Vendas & Marketing', value: 35, color: colors.green },
    { category: 'Operações', value: 15, color: colors.yellow },
    { category: 'Outros', value: 8, color: colors.orange }
  ];

  const cashRunwayData = [
    { month: 'Jan', months: 24 },
    { month: 'Fev', months: 23 },
    { month: 'Mar', months: 22 },
    { month: 'Abr', months: 21 },
    { month: 'Mai', months: 20 },
    { month: 'Jun', months: 22 }
  ];

  const expansionRevenueData = [
    { month: 'Jan', rate: 8 },
    { month: 'Fev', rate: 9 },
    { month: 'Mar', rate: 11 },
    { month: 'Abr', rate: 12 },
    { month: 'Mai', rate: 14 },
    { month: 'Jun', rate: 15 }
  ];

  const upsellConversionData = [
    { plan: 'Starter → Pro', rate: 24 },
    { plan: 'Pro → Business', rate: 18 },
    { plan: 'Business → Ent', rate: 12 }
  ];

  const crosssellRateData = [
    { product: 'Produto A', rate: 32 },
    { product: 'Produto B', rate: 28 },
    { product: 'Produto C', rate: 22 },
    { product: 'Produto D', rate: 18 }
  ];

  const expansionTimelineData = [
    { month: 'M0', value: 100 },
    { month: 'M3', value: 112 },
    { month: 'M6', value: 128 },
    { month: 'M9', value: 145 },
    { month: 'M12', value: 168 }
  ];

  const seatExpansionData = [
    { month: 'Jan', seats: 12500 },
    { month: 'Fev', seats: 13200 },
    { month: 'Mar', seats: 14100 },
    { month: 'Abr', seats: 15200 },
    { month: 'Mai', seats: 16500 },
    { month: 'Jun', seats: 17900 }
  ];

  const healthScoreData = [
    { score: 'Excelente', count: 4200, color: colors.green },
    { score: 'Bom', count: 2800, color: colors.blue },
    { score: 'Regular', count: 1200, color: colors.yellow },
    { score: 'Em Risco', count: 342, color: colors.red }
  ];

  const ticketResolutionData = [
    { priority: 'Alta', hours: 4 },
    { priority: 'Média', hours: 12 },
    { priority: 'Baixa', hours: 24 }
  ];

  const onboardingCompletionData = [
    { week: 'Semana 1', rate: 85 },
    { week: 'Semana 2', rate: 92 },
    { week: 'Semana 3', rate: 95 },
    { week: 'Semana 4', rate: 97 }
  ];

  const bookingsRevenueData = [
    { month: 'Jan', bookings: 1200, revenue: 980 },
    { month: 'Fev', bookings: 1350, revenue: 1050 },
    { month: 'Mar', bookings: 1420, revenue: 1120 },
    { month: 'Abr', bookings: 1580, revenue: 1200 },
    { month: 'Mai', bookings: 1650, revenue: 1280 },
    { month: 'Jun', bookings: 1780, revenue: 1350 }
  ];

  const deferredRevenueData = [
    { month: 'Jan', deferred: 8500 },
    { month: 'Fev', deferred: 9200 },
    { month: 'Mar', deferred: 9800 },
    { month: 'Abr', deferred: 10500 },
    { month: 'Mai', deferred: 11200 },
    { month: 'Jun', deferred: 12000 }
  ];

  const salesEfficiencyData = [
    { quarter: 'Q1', roi: 2.8 },
    { quarter: 'Q2', roi: 3.2 },
    { quarter: 'Q3', roi: 3.6 },
    { quarter: 'Q4', roi: 4.1 }
  ];

  const sparkData1 = [{ v: 950 }, { v: 965 }, { v: 978 }, { v: 982 }];
  const sparkData2 = [{ v: 3600 }, { v: 3680 }, { v: 3710 }, { v: 3732 }];
  const sparkData3 = [{ v: 23.5 }, { v: 23.8 }, { v: 24.1 }, { v: 24.3 }];
  const sparkData4 = [{ v: 28 }, { v: 30 }, { v: 31 }, { v: 32 }];
  const sparkData5 = [{ v: 0.88 }, { v: 0.90 }, { v: 0.91 }, { v: 0.92 }];
  const sparkData6 = [{ v: 48 }, { v: 50 }, { v: 51 }, { v: 52 }];
  const sparkData7 = [{ v: 1.5 }, { v: 1.4 }, { v: 1.35 }, { v: 1.3 }];
  const sparkData8 = [{ v: 76 }, { v: 77 }, { v: 77.5 }, { v: 78 }];
  const sparkData9 = [{ v: 70 }, { v: 71 }, { v: 71.5 }, { v: 72 }];
  const sparkData10 = [{ v: 4.4 }, { v: 4.5 }, { v: 4.55 }, { v: 4.6 }];
  const sparkData11 = [{ v: 358 }, { v: 352 }, { v: 348 }, { v: 342 }];
  const sparkData12 = [{ v: 2.8 }, { v: 2.6 }, { v: 2.5 }, { v: 2.4 }];

  return (
    <div className="min-h-screen bg-background w-full flex">
      <SidebarFix />
      
      <div className="flex-1 w-full">
        <header className="bg-card border-b border-border w-full">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/metricas-mrr")} 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">Análise Completa de Desempenho</h1>
                <p className="text-xs text-muted-foreground">Todas as métricas de desempenho financeiro em um único painel</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 transition-all hover:bg-accent hover:text-accent-foreground"
                  onClick={() => navigate('/metricas-mrr')}
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
                  className="h-8 gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  Others
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 w-full">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(206, 35%, 85%)' }}>
                  <Calendar className="text-lg" style={{ color: colors.blue }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +18%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">ARR</p>
              <h3 className="text-2xl font-bold text-foreground">R$12.4M</h3>
              <p className="text-xs text-muted-foreground mt-1">Receita Anual Recorrente</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(152, 35%, 85%)' }}>
                  <Users className="text-lg" style={{ color: colors.green }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +12%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Active Customers</p>
              <h3 className="text-2xl font-bold text-foreground">8,542</h3>
              <p className="text-xs text-muted-foreground mt-1">Clientes ativos</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(270, 35%, 85%)' }}>
                  <DollarSign className="text-lg" style={{ color: colors.purple }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +5%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">ARPU</p>
              <h3 className="text-2xl font-bold text-foreground">R$121</h3>
              <p className="text-xs text-muted-foreground mt-1">Receita por usuário</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(180, 35%, 85%)' }}>
                  <Clock className="text-lg" style={{ color: colors.teal }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  -0.5m
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">CAC Payback</p>
              <h3 className="text-2xl font-bold text-foreground">8.2</h3>
              <p className="text-xs text-muted-foreground mt-1">Meses</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(45, 78%, 88%)' }}>
                  <TrendingUp className="text-lg" style={{ color: colors.yellow }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +0.3x
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">LTV:CAC Ratio</p>
              <h3 className="text-2xl font-bold text-foreground">3.8x</h3>
              <p className="text-xs text-muted-foreground mt-1">Retorno sobre aquisição</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Crescimento e Expansão</h2>

          {/* ARR Growth e New vs Expansion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">ARR Growth Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={arrGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.blue} strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">New vs Expansion Revenue</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={newExpansionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Bar dataKey="new" name="Novo" fill={colors.blue} />
                  <Bar dataKey="expansion" name="Expansão" fill={colors.green} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Ratio, Revenue Retention, NDR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Quick Ratio</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={quickRatioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Line type="monotone" dataKey="ratio" stroke={colors.green} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Revenue Retention Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Area type="monotone" dataKey="rate" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">NDR (Net Dollar Retention)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={ndrData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="ndr" stroke={colors.teal} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Aquisição e Conversão</h2>

          {/* Sparkline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">CAC</p>
                <DollarSign size={18} style={{ color: colors.blue }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">R$982</h3>
              <p className="text-xs text-muted-foreground mt-1">Custo de Aquisição</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData1}>
                  <Area type="monotone" dataKey="v" stroke={colors.blue} fill={colors.blue} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">LTV</p>
                <DollarSign size={18} style={{ color: colors.green }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">R$3,732</h3>
              <p className="text-xs text-muted-foreground mt-1">Lifetime Value</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData2}>
                  <Area type="monotone" dataKey="v" stroke={colors.green} fill={colors.green} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Trial Conversion</p>
                <TrendingUp size={18} style={{ color: colors.purple }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">24.3%</h3>
              <p className="text-xs text-muted-foreground mt-1">Trial para Pago</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData3}>
                  <Area type="monotone" dataKey="v" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Lead Velocity Rate</p>
                <TrendingUp size={18} style={{ color: colors.orange }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">+32%</h3>
              <p className="text-xs text-muted-foreground mt-1">MoM Growth</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData4}>
                  <Area type="monotone" dataKey="v" stroke={colors.orange} fill={colors.orange} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Funnel e Sales Cycle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Conversion Funnel</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={conversionFunnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="value">
                    {conversionFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.blue, colors.green, colors.yellow, colors.orange][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Sales Cycle Length</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salesCycleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="segment" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value} dias`}
                  />
                  <Bar dataKey="days">
                    {salesCycleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.yellow, colors.red][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Métricas de Produto</h2>

          {/* DAU/MAU, Feature Adoption, Time to Value */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">DAU / MAU Ratio</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={dauMauData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Line type="monotone" dataKey="ratio" stroke={colors.blue} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Feature Adoption Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={featureAdoptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="feature" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {featureAdoptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.blue, colors.green, colors.purple, colors.yellow, colors.teal][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Time to Value</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={timeToValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="users">
                    {timeToValueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.blue, colors.yellow, colors.red][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PQL e Activation Rate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Product Qualified Leads (PQL)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={pqlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="pql" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Activation Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={activationRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.green} strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Segmentação e Coortes</h2>

          {/* Revenue by Segment e Cohort Retention */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Revenue by Customer Segment</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={revenueSegmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    nameKey="segment"
                  >
                    {revenueSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Cohort Retention Analysis</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={revenueRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.blue} strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Concentration, Contract Length, Pricing Tier */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Customer Concentration</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={customerConcentrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="tier" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="revenue">
                    {customerConcentrationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.blue, colors.green, colors.yellow, colors.orange][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Contract Length Distribution</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={contractLengthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="length"
                  >
                    {contractLengthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Pricing Tier Distribution</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={pricingTierData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="tier" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="users">
                    {pricingTierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.yellow, colors.blue, colors.purple, colors.green][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Eficiência e Operações</h2>

          {/* Efficiency Sparklines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Magic Number</p>
                <TrendingUp size={18} style={{ color: colors.purple }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">0.92</h3>
              <p className="text-xs text-muted-foreground mt-1">Eficiência de vendas</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData5}>
                  <Area type="monotone" dataKey="v" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Rule of 40</p>
                <TrendingUp size={18} style={{ color: colors.teal }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">52%</h3>
              <p className="text-xs text-muted-foreground mt-1">Growth + Margin</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData6}>
                  <Area type="monotone" dataKey="v" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Burn Multiple</p>
                <TrendingUp size={18} style={{ color: colors.red }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">1.3x</h3>
              <p className="text-xs text-muted-foreground mt-1">Capital Efficiency</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData7}>
                  <Area type="monotone" dataKey="v" stroke={colors.red} fill={colors.red} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Gross Margin</p>
                <TrendingUp size={18} style={{ color: colors.green }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">78%</h3>
              <p className="text-xs text-muted-foreground mt-1">Margem bruta</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData8}>
                  <Area type="monotone" dataKey="v" stroke={colors.green} fill={colors.green} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* OpEx Breakdown e Cash Runway */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Operating Expenses Breakdown</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={opexBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    nameKey="category"
                  >
                    {opexBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Cash Runway</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={cashRunwayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value} meses`}
                  />
                  <Line type="monotone" dataKey="months" stroke={colors.orange} strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Expansão e Upsell</h2>

          {/* Expansion Revenue, Upsell, Cross-sell */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Expansion Revenue Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={expansionRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Area type="monotone" dataKey="rate" stroke={colors.green} fill={colors.green} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Upsell Conversion Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={upsellConversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="plan" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {upsellConversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.yellow, colors.orange][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Cross-sell Attach Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={crosssellRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="product" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {crosssellRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.blue, colors.green, colors.purple, colors.yellow][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Account Expansion Timeline e Seat Expansion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Account Expansion Timeline</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={expansionTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Line type="monotone" dataKey="value" stroke={colors.purple} strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Seat Expansion Growth</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={seatExpansionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="seats" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Saúde do Cliente</h2>

          {/* Customer Health Sparklines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">NPS Score</p>
                <TrendingUp size={18} style={{ color: colors.green }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">72</h3>
              <p className="text-xs text-muted-foreground mt-1">Net Promoter Score</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData9}>
                  <Area type="monotone" dataKey="v" stroke={colors.green} fill={colors.green} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">CSAT</p>
                <TrendingUp size={18} style={{ color: colors.yellow }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">4.6</h3>
              <p className="text-xs text-muted-foreground mt-1">Customer Satisfaction</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData10}>
                  <Area type="monotone" dataKey="v" stroke={colors.yellow} fill={colors.yellow} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Support Tickets</p>
                <TrendingUp size={18} style={{ color: colors.purple }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">342</h3>
              <p className="text-xs text-muted-foreground mt-1">Mensal</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData11}>
                  <Area type="monotone" dataKey="v" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Avg Response Time</p>
                <Clock size={18} style={{ color: colors.teal }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">2.4h</h3>
              <p className="text-xs text-muted-foreground mt-1">Tempo de resposta</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={sparkData12}>
                  <Area type="monotone" dataKey="v" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Score, Ticket Resolution, Onboarding */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Customer Health Score</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={healthScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="score" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="count">
                    {healthScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Support Ticket Resolution</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ticketResolutionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="priority" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}h`}
                  />
                  <Bar dataKey="hours">
                    {ticketResolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.red, colors.yellow, colors.green][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Onboarding Completion</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={onboardingCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.blue} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Métricas Avançadas</h2>

          {/* Bookings vs Revenue e Deferred Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Bookings vs Revenue Recognition</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={bookingsRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" name="Bookings" stroke={colors.blue} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke={colors.green} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Deferred Revenue Trend</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={deferredRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="deferred" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Efficiency */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Sales Efficiency (S&M ROI)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={salesEfficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="roi">
                    {salesEfficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.yellow, colors.blue, colors.green, colors.purple][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Others;