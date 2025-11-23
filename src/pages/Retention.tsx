import { ArrowLeft, UserCheck, Calendar, CalendarDays, Magnet, Clock, RotateCw, BarChart3, UserX, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Area, AreaChart
} from "recharts";

const Retention = () => {
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
  const cohortRetentionData = [
    { cohort: 'Jan 24', M0: 100, M1: 92, M2: 85, M3: 78, M4: 72, M5: 68 },
    { cohort: 'Fev 24', M0: 100, M1: 94, M2: 87, M3: 81, M4: 76, M5: null },
    { cohort: 'Mar 24', M0: 100, M1: 95, M2: 89, M3: 83, M4: null, M5: null },
    { cohort: 'Abr 24', M0: 100, M1: 96, M2: 91, M3: null, M4: null, M5: null },
    { cohort: 'Mai 24', M0: 100, M1: 97, M2: null, M3: null, M4: null, M5: null },
    { cohort: 'Jun 24', M0: 100, M1: null, M2: null, M3: null, M4: null, M5: null }
  ];

  const customerLifetimeData = [
    { month: 'Jan', year2024: 24, year2023: 22 },
    { month: 'Fev', year2024: 26, year2023: 23 },
    { month: 'Mar', year2024: 28, year2023: 25 },
    { month: 'Abr', year2024: 30, year2023: 27 },
    { month: 'Mai', year2024: 32, year2023: 28 },
    { month: 'Jun', year2024: 34, year2023: 30 }
  ];

  const monthlyRetentionData = [
    { month: 'M1', rate: 100 },
    { month: 'M2', rate: 94 },
    { month: 'M3', rate: 87 },
    { month: 'M4', rate: 82 },
    { month: 'M5', rate: 78 },
    { month: 'M6', rate: 75 }
  ];

  const ndayRetentionData = [
    { day: 'D1', rate: 85 },
    { day: 'D7', rate: 72 },
    { day: 'D14', rate: 65 },
    { day: 'D30', rate: 58 },
    { day: 'D60', rate: 52 },
    { day: 'D90', rate: 48 }
  ];

  const retentionSegmentData = [
    { month: 'M1', enterprise: 100, smb: 100 },
    { month: 'M2', enterprise: 96, smb: 92 },
    { month: 'M3', enterprise: 92, smb: 85 },
    { month: 'M4', enterprise: 88, smb: 79 },
    { month: 'M5', enterprise: 85, smb: 74 },
    { month: 'M6', enterprise: 82, smb: 70 }
  ];

  const sessionsUserSparkData = [
    { value: 7.8 }, { value: 8.0 }, { value: 8.2 }, { value: 8.3 }, { value: 8.4 }
  ];

  const featureUsageSparkData = [
    { value: 5.8 }, { value: 5.9 }, { value: 6.0 }, { value: 6.1 }, { value: 6.2 }
  ];

  const dailyActiveSparkData = [
    { value: 48 }, { value: 49 }, { value: 50 }, { value: 51 }, { value: 52 }
  ];

  const powerUsersSparkData = [
    { value: 15 }, { value: 16 }, { value: 17 }, { value: 17.5 }, { value: 18 }
  ];

  const engagementScoreData = [
    { month: 'Jan', score: 72 },
    { month: 'Fev', score: 75 },
    { month: 'Mar', score: 78 },
    { month: 'Abr', score: 81 },
    { month: 'Mai', score: 84 },
    { month: 'Jun', score: 87 }
  ];

  const sessionFrequencyData = [
    { name: 'Diário', value: 42, color: colors.green },
    { name: 'Semanal', value: 28, color: colors.blue },
    { name: 'Quinzenal', value: 18, color: colors.yellow },
    { name: 'Mensal', value: 12, color: colors.orange }
  ];

  const firstActionData = [
    { time: '< 5min', users: 45 },
    { time: '5-15min', users: 28 },
    { time: '15-30min', users: 15 },
    { time: '30-60min', users: 8 },
    { time: '> 60min', users: 4 }
  ];

  const returnRateData = [
    { day: 'Seg', rate: 68 },
    { day: 'Ter', rate: 72 },
    { day: 'Qua', rate: 75 },
    { day: 'Qui', rate: 74 },
    { day: 'Sex', rate: 70 },
    { day: 'Sáb', rate: 45 },
    { day: 'Dom', rate: 38 }
  ];

  const activeDaysData = [
    { range: '1-7 dias', value: 15, color: colors.red },
    { range: '8-15 dias', value: 25, color: colors.yellow },
    { range: '16-23 dias', value: 35, color: colors.blue },
    { range: '24-30 dias', value: 25, color: colors.green }
  ];

  const peakHoursData = [
    { hour: '00h', users: 120 },
    { hour: '03h', users: 80 },
    { hour: '06h', users: 150 },
    { hour: '09h', users: 850 },
    { hour: '12h', users: 1200 },
    { hour: '15h', users: 1450 },
    { hour: '18h', users: 1850 },
    { hour: '21h', users: 980 }
  ];

  const weeklyPatternData = [
    { day: 'Seg', users: 4200 },
    { day: 'Ter', users: 4500 },
    { day: 'Qua', users: 4650 },
    { day: 'Qui', users: 4580 },
    { day: 'Sex', users: 4350 },
    { day: 'Sáb', users: 2800 },
    { day: 'Dom', users: 2200 }
  ];

  const cohortValueData = [
    { month: 'M0', q1: 100, q4: 100 },
    { month: 'M1', q1: 125, q4: 118 },
    { month: 'M2', q1: 145, q4: 132 },
    { month: 'M3', q1: 168, q4: 148 },
    { month: 'M4', q1: 192, q4: 165 },
    { month: 'M5', q1: 215, q4: 180 }
  ];

  const featureTimelineData = [
    { week: 'Semana 1', adoption: 32 },
    { week: 'Semana 2', adoption: 58 },
    { week: 'Semana 3', adoption: 72 },
    { week: 'Semana 4', adoption: 85 }
  ];

  const coreActionsData = [
    { action: 'Ação A', freq: 1850 },
    { action: 'Ação B', freq: 1520 },
    { action: 'Ação C', freq: 1280 },
    { action: 'Ação D', freq: 980 },
    { action: 'Ação E', freq: 650 }
  ];

  const activationMilestoneData = [
    { milestone: 'Ativo', conversion: 42 },
    { milestone: 'Segunda Sessão', conversion: 52 },
    { milestone: 'Primeira Ação', conversion: 68 },
    { milestone: 'Primeiro Login', conversion: 85 },
    { milestone: 'Cadastro', conversion: 100 }
  ];

  const retentionUserTypeData = [
    { month: 'M1', power: 100, regular: 100, casual: 100 },
    { month: 'M2', power: 95, regular: 88, casual: 75 },
    { month: 'M3', power: 90, regular: 78, casual: 58 },
    { month: 'M4', power: 86, regular: 70, casual: 45 },
    { month: 'M5', power: 82, regular: 64, casual: 35 },
    { month: 'M6', power: 79, regular: 59, casual: 28 }
  ];

  const engagementPlanData = [
    { plan: 'Starter', score: 65 },
    { plan: 'Professional', score: 78 },
    { plan: 'Business', score: 85 },
    { plan: 'Enterprise', score: 92 }
  ];

  const churnRiskData = [
    { risk: 'Baixo Risco', value: 62, color: colors.green },
    { risk: 'Médio Risco', value: 25, color: colors.yellow },
    { risk: 'Alto Risco', value: 10, color: colors.orange },
    { risk: 'Crítico', value: 3, color: colors.red }
  ];

  const reactivationData = [
    { month: 'Jan', rate: 12 },
    { month: 'Fev', rate: 15 },
    { month: 'Mar', rate: 18 },
    { month: 'Abr', rate: 22 },
    { month: 'Mai', rate: 25 },
    { month: 'Jun', rate: 28 }
  ];

  const dormantRecoveryData = [
    { period: '< 30d', recovery: 45 },
    { period: '30-60d', recovery: 28 },
    { period: '60-90d', recovery: 15 },
    { period: '> 90d', recovery: 8 }
  ];

  const l7l30Data = [
    { month: 'Jan', ratio: 0.42 },
    { month: 'Fev', ratio: 0.45 },
    { month: 'Mar', ratio: 0.48 },
    { month: 'Abr', ratio: 0.51 },
    { month: 'Mai', ratio: 0.54 },
    { month: 'Jun', ratio: 0.57 }
  ];

  const resurrectionData = [
    { month: 'Jan', rate: 8 },
    { month: 'Fev', rate: 10 },
    { month: 'Mar', rate: 12 },
    { month: 'Abr', rate: 14 },
    { month: 'Mai', rate: 16 },
    { month: 'Jun', rate: 18 }
  ];

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
                  className="h-8 gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <UserCheck className="h-4 w-4" />
                  Retention
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 transition-all hover:bg-accent hover:text-accent-foreground"
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
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(152, 35%, 85%)' }}>
                  <UserCheck className="text-lg" style={{ color: colors.green }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +2.1%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Customer Retention</p>
              <h3 className="text-2xl font-bold text-foreground">94.2%</h3>
              <p className="text-xs text-muted-foreground mt-1">Taxa de retenção</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(206, 35%, 85%)' }}>
                  <Calendar className="text-lg" style={{ color: colors.blue }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +8.5%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">DAU</p>
              <h3 className="text-2xl font-bold text-foreground">4,285</h3>
              <p className="text-xs text-muted-foreground mt-1">Usuários ativos diários</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(270, 35%, 85%)' }}>
                  <CalendarDays className="text-lg" style={{ color: colors.purple }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +5.3%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">MAU</p>
              <h3 className="text-2xl font-bold text-foreground">8,742</h3>
              <p className="text-xs text-muted-foreground mt-1">Usuários ativos mensais</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(180, 35%, 85%)' }}>
                  <Magnet className="text-lg" style={{ color: colors.teal }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +3%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Stickiness</p>
              <h3 className="text-2xl font-bold text-foreground">49%</h3>
              <p className="text-xs text-muted-foreground mt-1">DAU/MAU Ratio</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(45, 78%, 88%)' }}>
                  <Clock className="text-lg" style={{ color: colors.yellow }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  +2.3m
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Avg Session</p>
              <h3 className="text-2xl font-bold text-foreground">18.5m</h3>
              <p className="text-xs text-muted-foreground mt-1">Duração média</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Análise de Retenção</h2>

          {/* Cohort Retention e Customer Lifetime */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Cohort Retention Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="h-[280px] flex items-center justify-center">
                <div className="grid grid-cols-6 gap-1 w-full px-2">
                  {cohortRetentionData.map((cohort, i) => (
                    <div key={i} className="flex flex-col gap-1">
                  {Object.entries(cohort).filter(([key]) => key !== 'cohort').map(([key, val], j) => (
                        val !== null && typeof val === 'number' && (
                          <div
                            key={j}
                            className="aspect-square rounded text-[9px] flex items-center justify-center text-foreground font-medium"
                            style={{
                              backgroundColor: val > 90 ? colors.green : val > 75 ? colors.yellow : colors.red,
                              opacity: 0.8
                            }}
                          >
                            {val}
                          </div>
                        )
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Customer Lifetime by Cohort</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={customerLifetimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="year2024" name="2024" stroke={colors.blue} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="year2023" name="2023" stroke={colors.purple} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly, N-Day, Segment Retention */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Monthly Retention Curve</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyRetentionData}>
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
                <h3 className="text-sm font-bold text-foreground">N-Day Retention</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ndayRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {ndayRetentionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.blue, colors.teal, colors.yellow, colors.orange, colors.red][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Retention by Segment</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={retentionSegmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="enterprise" name="Enterprise" stroke={colors.blue} strokeWidth={2} />
                  <Line type="monotone" dataKey="smb" name="SMB" stroke={colors.purple} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Engajamento de Usuários</h2>

          {/* Métricas de Engajamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Sessions/User</p>
                <RotateCw className="h-4 w-4" style={{ color: colors.blue }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">8.4</h3>
              <p className="text-xs text-muted-foreground mt-1">Média mensal</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sessionsUserSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.blue} fill={colors.blue} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Feature Usage</p>
                <BarChart3 className="h-4 w-4" style={{ color: colors.green }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">6.2</h3>
              <p className="text-xs text-muted-foreground mt-1">Features/usuário</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={featureUsageSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.green} fill={colors.green} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Daily Active Rate</p>
                <BarChart3 className="h-4 w-4" style={{ color: colors.purple }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">52%</h3>
              <p className="text-xs text-muted-foreground mt-1">Taxa de atividade</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyActiveSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Power Users</p>
                <UserCheck className="h-4 w-4" style={{ color: colors.yellow }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">18%</h3>
              <p className="text-xs text-muted-foreground mt-1">% da base</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={powerUsersSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.yellow} fill={colors.yellow} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Engagement Score e Session Frequency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">User Engagement Score</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={engagementScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="score" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Session Frequency Distribution</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={sessionFrequencyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={(entry) => entry.name}
                  >
                    {sessionFrequencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Padrões de Comportamento</h2>

          {/* First Action, Return Rate, Active Days */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Time to First Action</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={firstActionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="users">
                    {firstActionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.blue, colors.yellow, colors.orange, colors.red][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Return Rate by Day</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={returnRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.purple} strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Active Days per Month</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={activeDaysData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={(entry) => entry.range}
                  >
                    {activeDaysData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours e Weekly Pattern */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Peak Usage Hours</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="users" fill={colors.blue} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Weekly Activity Pattern</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={weeklyPatternData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="users" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Análise de Coortes</h2>

          {/* Cohort Heatmap e Value Progression */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Cohort Engagement Heatmap</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="h-[280px] flex items-center justify-center">
                <div className="text-sm text-muted-foreground">Cohort Heatmap Visualization</div>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Cohort Value Progression</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={cohortValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="q1" name="Q1 2024" stroke={colors.blue} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="q4" name="Q4 2023" stroke={colors.purple} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Métricas de Produto</h2>

          {/* Feature Timeline, Core Actions, Activation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Feature Adoption Timeline</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={featureTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="adoption" stroke={colors.green} strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Core Action Frequency</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={coreActionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="action" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="freq">
                    {coreActionsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.blue, colors.teal, colors.yellow, colors.orange][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Activation Milestone</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={activationMilestoneData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="milestone" type="category" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="conversion">
                    {activationMilestoneData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.orange, colors.yellow, colors.green, colors.teal, colors.blue][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Análise de Segmentos</h2>

          {/* Retention by User Type e Engagement by Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Retention by User Type</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={retentionUserTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="power" name="Power Users" stroke={colors.green} strokeWidth={2} />
                  <Line type="monotone" dataKey="regular" name="Regular Users" stroke={colors.blue} strokeWidth={2} />
                  <Line type="monotone" dataKey="casual" name="Casual Users" stroke={colors.orange} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Engagement by Plan Tier</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={engagementPlanData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="plan" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="score">
                    {engagementPlanData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.yellow, colors.blue, colors.purple, colors.green][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Churn Risk, Reactivation, Dormant Recovery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Churn Risk Distribution</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={churnRiskData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={(entry) => entry.risk}
                  >
                    {churnRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Reactivation Rate</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={reactivationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.purple} strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Dormant User Recovery</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dormantRecoveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="recovery">
                    {dormantRecoveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.yellow, colors.orange, colors.red][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Métricas Avançadas</h2>

          {/* L7/L30 e Resurrection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">L7/L30 Engagement Ratio</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={l7l30Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="ratio" stroke={colors.blue} fill={colors.blue} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Resurrection Rate Trend</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={resurrectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.teal} strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Retention;