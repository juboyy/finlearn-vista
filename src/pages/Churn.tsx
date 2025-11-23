import { useState } from "react";
import { ArrowLeft, UserX, DollarSign, Building, TrendingDown, Clock, Brain, RotateCw, ArrowDown, MoreHorizontal, BarChart3, UserCheck, Calendar as CalendarIcon, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Area, AreaChart, ScatterChart, Scatter 
} from "recharts";

const Churn = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 5, 30),
  });

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
  const netChurnData = [
    { month: 'Jan', gross: 4.5, net: 2.8 },
    { month: 'Fev', gross: 4.2, net: 2.5 },
    { month: 'Mar', gross: 3.8, net: 2.2 },
    { month: 'Abr', gross: 3.5, net: 1.9 },
    { month: 'Mai', gross: 3.2, net: 1.6 },
    { month: 'Jun', gross: 2.9, net: 1.3 },
    { month: 'Jul', gross: 2.5, net: 0.9 },
    { month: 'Ago', gross: 2.1, net: 0.5 },
    { month: 'Set', gross: 1.8, net: 0.2 },
    { month: 'Out', gross: 1.5, net: -0.2 },
    { month: 'Nov', gross: 1.2, net: -0.5 },
    { month: 'Dez', gross: 0.8, net: -0.8 }
  ];

  const voluntaryInvoluntaryData = [
    { month: 'Jan', voluntario: 1.8, involuntario: 1.0 },
    { month: 'Fev', voluntario: 1.7, involuntario: 0.9 },
    { month: 'Mar', voluntario: 1.6, involuntario: 1.1 },
    { month: 'Abr', voluntario: 1.9, involuntario: 0.8 },
    { month: 'Mai', voluntario: 2.0, involuntario: 0.8 },
    { month: 'Jun', voluntario: 1.8, involuntario: 1.0 }
  ];

  const churnTenureData = [
    { tenure: '0-3m', rate: 6.5 },
    { tenure: '3-6m', rate: 4.2 },
    { tenure: '6-12m', rate: 2.8 },
    { tenure: '12-18m', rate: 1.9 },
    { tenure: '18-24m', rate: 1.2 },
    { tenure: '24m+', rate: 0.8 }
  ];

  const cohortChurnData = [
    { cohort: 'Jan 24', M0: 0, M1: 5.2, M2: 4.8, M3: 4.5, M4: 4.2, M5: 3.9 },
    { cohort: 'Fev 24', M0: 0, M1: 4.9, M2: 4.5, M3: 4.2, M4: 3.9, M5: null },
    { cohort: 'Mar 24', M0: 0, M1: 4.6, M2: 4.2, M3: 3.9, M4: null, M5: null },
    { cohort: 'Abr 24', M0: 0, M1: 4.3, M2: 3.9, M3: null, M4: null, M5: null },
    { cohort: 'Mai 24', M0: 0, M1: 4.0, M2: null, M3: null, M4: null, M5: null },
    { cohort: 'Jun 24', M0: 0, M1: null, M2: null, M3: null, M4: null, M5: null }
  ];

  const churnPlanData = [
    { name: 'Basic', value: 45, color: colors.red },
    { name: 'Pro', value: 32, color: colors.purple },
    { name: 'Enterprise', value: 23, color: colors.blue }
  ];

  const churnReasonsData = [
    { reason: 'Preço Alto', value: 38 },
    { reason: 'Falta de Uso', value: 25 },
    { reason: 'Suporte Ruim', value: 18 },
    { reason: 'Concorrente', value: 12 },
    { reason: 'Outros', value: 7 }
  ];

  const predictedChurnData = [
    { month: 'Atual', real: 2.8, previsao: 2.8 },
    { month: 'Mês +1', previsao: 3.1 },
    { month: 'Mês +2', previsao: 3.3 },
    { month: 'Mês +3', previsao: 3.5 }
  ];

  const churnChannelData = [
    { channel: 'Orgânico', rate: 2.2 },
    { channel: 'Paid Ads', rate: 3.8 },
    { channel: 'Parcerias', rate: 2.9 },
    { channel: 'Indicação', rate: 1.5 },
    { channel: 'Eventos', rate: 3.2 }
  ];

  const churnArpaData = [
    { arpa: '<R$20', rate: 5.8 },
    { arpa: 'R$20-50', rate: 3.9 },
    { arpa: 'R$50-100', rate: 2.5 },
    { arpa: 'R$100-200', rate: 1.8 },
    { arpa: '>R$200', rate: 0.9 }
  ];

  const seasonalChurnData = [
    { month: 'Jan', rate: 3.2 },
    { month: 'Fev', rate: 2.9 },
    { month: 'Mar', rate: 2.7 },
    { month: 'Abr', rate: 2.5 },
    { month: 'Mai', rate: 2.3 },
    { month: 'Jun', rate: 2.1 },
    { month: 'Jul', rate: 2.8 },
    { month: 'Ago', rate: 3.1 },
    { month: 'Set', rate: 2.9 },
    { month: 'Out', rate: 2.6 },
    { month: 'Nov', rate: 2.8 },
    { month: 'Dez', rate: 3.5 }
  ];

  const geoChurnData = [
    { name: 'Sudeste', value: 28, color: colors.blue },
    { name: 'Sul', value: 35, color: colors.purple },
    { name: 'Centro-Oeste', value: 22, color: colors.yellow },
    { name: 'Outros', value: 15, color: colors.slate }
  ];

  const engagementChurnData = [
    { engagement: 'Alto', rate: 0.8 },
    { engagement: 'Médio', rate: 2.5 },
    { engagement: 'Baixo', rate: 4.8 },
    { engagement: 'Inativo', rate: 8.2 }
  ];

  const survivalData = [
    { months: 0, survival: 100 },
    { months: 3, survival: 95 },
    { months: 6, survival: 88 },
    { months: 9, survival: 82 },
    { months: 12, survival: 77 },
    { months: 15, survival: 73 },
    { months: 18, survival: 70 },
    { months: 21, survival: 68 },
    { months: 24, survival: 66 }
  ];

  const paymentFailureData = [
    { failures: '0 Falhas', rate: 1.2 },
    { failures: '1 Falha', rate: 8.5 },
    { failures: '2 Falhas', rate: 22.3 },
    { failures: '3+ Falhas', rate: 45.8 }
  ];

  const earlyChurnSparkData = [
    { value: 6.2 },
    { value: 5.9 },
    { value: 6.1 },
    { value: 5.7 },
    { value: 5.8 }
  ];

  const churnScoreSparkData = [
    { value: 65 },
    { value: 68 },
    { value: 67 },
    { value: 69 },
    { value: 68 }
  ];

  const reactivationSparkData = [
    { value: 16 },
    { value: 17 },
    { value: 18 },
    { value: 18.5 },
    { value: 18.5 }
  ];

  const downgradeChurnSparkData = [
    { value: 38 },
    { value: 40 },
    { value: 41 },
    { value: 42 },
    { value: 42 }
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
                  className="h-8 gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90"
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
            
            <Button className="h-9 gap-2">
              <Bot className="h-4 w-4" />
              Agente de IA
            </Button>
          </div>
        </div>

        <main className="p-4 w-full">
          {/* KPI Cards - Primary Churn Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(350, 35%, 85%)' }}>
                  <UserX className="text-lg" style={{ color: colors.red }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(350, 35%, 85%)', color: 'hsl(350, 35%, 35%)' }}>
                  +0.3%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Customer Churn Rate</p>
              <h3 className="text-2xl font-bold text-foreground">2.8%</h3>
              <p className="text-xs text-muted-foreground mt-1">Mensal</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(350, 35%, 85%)' }}>
                  <DollarSign className="text-lg" style={{ color: colors.red }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(350, 35%, 85%)', color: 'hsl(350, 35%, 35%)' }}>
                  +0.5%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Revenue Churn Rate</p>
              <h3 className="text-2xl font-bold text-foreground">3.2%</h3>
              <p className="text-xs text-muted-foreground mt-1">MRR Lost</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(350, 35%, 85%)' }}>
                  <Building className="text-lg" style={{ color: colors.red }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(152, 32%, 85%)', color: 'hsl(152, 32%, 28%)' }}>
                  -0.1%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Logo Churn Rate</p>
              <h3 className="text-2xl font-bold text-foreground">1.2%</h3>
              <p className="text-xs text-muted-foreground mt-1">Contas perdidas</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border hover:border-border/60 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(350, 35%, 85%)' }}>
                  <TrendingDown className="text-lg" style={{ color: colors.red }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: 'hsl(350, 35%, 85%)', color: 'hsl(350, 35%, 35%)' }}>
                  +0.4%
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Gross Churn Rate</p>
              <h3 className="text-2xl font-bold text-foreground">4.5%</h3>
              <p className="text-xs text-muted-foreground mt-1">Total bruto</p>
            </div>
          </div>

          {/* Net Churn e Voluntary/Involuntary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Net Churn Rate (Com Expansão)</h3>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={netChurnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="gross" name="Gross Churn" stroke={colors.red} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="net" name="Net Churn" stroke={colors.blue} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Churn Voluntário vs Involuntário</h3>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={voluntaryInvoluntaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Bar dataKey="voluntario" name="Voluntário" stackId="a" fill={colors.red} />
                  <Bar dataKey="involuntario" name="Involuntário" stackId="a" fill={colors.purple} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Churn Tenure, Plan e Cohort */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Churn por Tempo de Vida (Tenure)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={churnTenureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="tenure" tick={{ fontSize: 11 }} height={50} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {churnTenureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 2 ? colors.red : index < 4 ? colors.purple : colors.green} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Churn por Plano/Segmento</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={churnPlanData}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {churnPlanData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))'
                    }}
                    formatter={(value: number) => `${value}%`} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ paddingTop: '0px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Churn Cohort (Mensal)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-muted-foreground font-semibold">Coorte</th>
                      <th className="text-center p-2 text-muted-foreground font-semibold">M0</th>
                      <th className="text-center p-2 text-muted-foreground font-semibold">M1</th>
                      <th className="text-center p-2 text-muted-foreground font-semibold">M2</th>
                      <th className="text-center p-2 text-muted-foreground font-semibold">M3</th>
                      <th className="text-center p-2 text-muted-foreground font-semibold">M4</th>
                      <th className="text-center p-2 text-muted-foreground font-semibold">M5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortChurnData.map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-2 font-medium text-foreground">{row.cohort}</td>
                        <td className="p-1">
                          <div className="w-full h-8 rounded flex items-center justify-center font-medium text-foreground" style={{ backgroundColor: colors.green, opacity: 0.7 }}>
                            0%
                          </div>
                        </td>
                        <td className="p-1">
                          {row.M1 && (
                            <div 
                              className="w-full h-8 rounded flex items-center justify-center font-medium text-foreground" 
                              style={{ 
                                backgroundColor: row.M1 > 4.5 ? colors.red : row.M1 > 4 ? colors.yellow : colors.green, 
                                opacity: 0.7 
                              }}
                            >
                              {row.M1}%
                            </div>
                          )}
                        </td>
                        <td className="p-1">
                          {row.M2 && (
                            <div 
                              className="w-full h-8 rounded flex items-center justify-center font-medium text-foreground" 
                              style={{ 
                                backgroundColor: row.M2 > 4.5 ? colors.red : row.M2 > 4 ? colors.yellow : colors.green, 
                                opacity: 0.7 
                              }}
                            >
                              {row.M2}%
                            </div>
                          )}
                        </td>
                        <td className="p-1">
                          {row.M3 && (
                            <div 
                              className="w-full h-8 rounded flex items-center justify-center font-medium text-foreground" 
                              style={{ 
                                backgroundColor: row.M3 > 4.5 ? colors.red : row.M3 > 4 ? colors.yellow : colors.green, 
                                opacity: 0.7 
                              }}
                            >
                              {row.M3}%
                            </div>
                          )}
                        </td>
                        <td className="p-1">
                          {row.M4 && (
                            <div 
                              className="w-full h-8 rounded flex items-center justify-center font-medium text-foreground" 
                              style={{ 
                                backgroundColor: row.M4 > 4.5 ? colors.red : row.M4 > 4 ? colors.yellow : colors.green, 
                                opacity: 0.7 
                              }}
                            >
                              {row.M4}%
                            </div>
                          )}
                        </td>
                        <td className="p-1">
                          {row.M5 && (
                            <div 
                              className="w-full h-8 rounded flex items-center justify-center font-medium text-foreground" 
                              style={{ 
                                backgroundColor: row.M5 > 4.5 ? colors.red : row.M5 > 4 ? colors.yellow : colors.green, 
                                opacity: 0.7 
                              }}
                            >
                              {row.M5}%
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Análise de Causas e Previsão</h2>

          {/* Motivos e Previsão */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Motivos de Cancelamento</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={churnReasonsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="reason" type="category" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="value">
                    {churnReasonsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.red, colors.purple, colors.yellow, colors.blue, colors.slate][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Predicted Churn (Próximos 3 Meses)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={predictedChurnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="real" name="Real" stroke={colors.blue} strokeWidth={2} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="previsao" name="Previsão" stroke={colors.red} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Channel e ARPA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Churn por Canal de Aquisição</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={churnChannelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="channel" tick={{ fontSize: 11 }} height={50} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {churnChannelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.red, colors.purple, colors.blue, colors.yellow][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Churn Rate por Valor de Conta (ARPA)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={churnArpaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="arpa" tick={{ fontSize: 11 }} height={50} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke={colors.blue} strokeWidth={3} dot={{ r: 5, fill: colors.blue }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Métricas Complementares</h2>

          {/* Métricas complementares cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Early Churn Rate</p>
                <Clock className="h-4 w-4" style={{ color: colors.purple }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">5.8%</h3>
              <p className="text-xs text-muted-foreground mt-1">Primeiros 90 dias</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earlyChurnSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.purple} fill={colors.purple} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Churn Probability Score</p>
                <Brain className="h-4 w-4" style={{ color: colors.teal }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">68/100</h3>
              <p className="text-xs text-muted-foreground mt-1">Média de risco</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={churnScoreSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.teal} fill={colors.teal} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Reactivation Rate</p>
                <RotateCw className="h-4 w-4" style={{ color: colors.green }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">18.5%</h3>
              <p className="text-xs text-muted-foreground mt-1">Clientes retornando</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reactivationSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.green} fill={colors.green} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Downgrades to Churn</p>
                <ArrowDown className="h-4 w-4" style={{ color: colors.yellow }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">42%</h3>
              <p className="text-xs text-muted-foreground mt-1">Conversão downgrade</p>
              <div className="mt-3 h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={downgradeChurnSparkData}>
                    <Area type="monotone" dataKey="value" stroke={colors.yellow} fill={colors.yellow} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Seasonal, Geo, Engagement */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Churn Sazonal (Por Mês)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={seasonalChurnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
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
                <h3 className="text-sm font-bold text-foreground">Churn por Região Geográfica</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={geoChurnData}
                    cx="50%"
                    cy="45%"
                    outerRadius={70}
                    dataKey="value"
                  >
                    {geoChurnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))'
                    }}
                    formatter={(value: number) => `${value}%`} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ paddingTop: '0px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-foreground">Churn por Nível de Engajamento</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={engagementChurnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="engagement" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {engagementChurnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.yellow, colors.purple, colors.red][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Survival e Payment Failure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Análise de Sobrevivência (Survival Analysis)</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={survivalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="months" tick={{ fontSize: 11 }} label={{ value: 'Meses', position: 'insideBottom', offset: -5 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: 'Sobrevivência (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Area type="stepAfter" dataKey="survival" stroke={colors.blue} fill={colors.blue} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-foreground">Impacto de Falhas de Pagamento no Churn</h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={paymentFailureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="failures" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="rate">
                    {paymentFailureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[colors.green, colors.yellow, colors.purple, colors.red][index]} />
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

export default Churn;