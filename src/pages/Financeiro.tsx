import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, DollarSign, Users, Receipt, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

// Dados mockados para demonstração
const revenueByNewsletter = [
  { name: "Insights Financeiros", jan: 4200, fev: 4800, mar: 5200, abr: 5600 },
  { name: "Análise de Mercado", jan: 3100, fev: 3400, mar: 3800, abr: 4200 },
  { name: "Tech & Inovação", jan: 2800, fev: 3200, mar: 3500, abr: 3900 },
  { name: "Compliance Weekly", jan: 2200, fev: 2400, mar: 2700, abr: 3100 },
];

const revenueByTag = [
  { name: "Investimentos", value: 8500 },
  { name: "Crédito Rural", value: 6200 },
  { name: "Tecnologia", value: 5800 },
  { name: "Compliance", value: 4900 },
  { name: "Open Finance", value: 3800 },
];

const revenueGrowth = [
  { mes: "Jan", receita: 12300, seguidores: 245 },
  { mes: "Fev", receita: 13800, seguidores: 289 },
  { mes: "Mar", receita: 15200, seguidores: 324 },
  { mes: "Abr", receita: 16800, seguidores: 367 },
  { mes: "Mai", receita: 18500, seguidores: 412 },
  { mes: "Jun", receita: 20100, seguidores: 456 },
];

const followersVsRevenue = [
  { mes: "Jan", seguidores: 245, receita: 12.3 },
  { mes: "Fev", seguidores: 289, receita: 13.8 },
  { mes: "Mar", seguidores: 324, receita: 15.2 },
  { mes: "Abr", seguidores: 367, receita: 16.8 },
  { mes: "Mai", seguidores: 412, receita: 18.5 },
  { mes: "Jun", seguidores: 456, receita: 20.1 },
];

const subscribers = [
  { id: 1, nome: "João Silva", newsletter: "Insights Financeiros", valor: 49.90, desconto: true, percentualDesconto: "20%", status: "Ativo" },
  { id: 2, nome: "Maria Santos", newsletter: "Análise de Mercado", valor: 39.90, desconto: false, percentualDesconto: "-", status: "Ativo" },
  { id: 3, nome: "Pedro Costa", newsletter: "Tech & Inovação", valor: 59.90, desconto: true, percentualDesconto: "15%", status: "Ativo" },
  { id: 4, nome: "Ana Paula", newsletter: "Compliance Weekly", valor: 29.90, desconto: false, percentualDesconto: "-", status: "Ativo" },
  { id: 5, nome: "Carlos Eduardo", newsletter: "Insights Financeiros", valor: 49.90, desconto: true, percentualDesconto: "10%", status: "Ativo" },
  { id: 6, nome: "Julia Fernandes", newsletter: "Análise de Mercado", valor: 39.90, desconto: false, percentualDesconto: "-", status: "Ativo" },
  { id: 7, nome: "Roberto Lima", newsletter: "Tech & Inovação", valor: 59.90, desconto: true, percentualDesconto: "25%", status: "Ativo" },
  { id: 8, nome: "Fernanda Alves", newsletter: "Compliance Weekly", valor: 29.90, desconto: false, percentualDesconto: "-", status: "Ativo" },
  { id: 9, nome: "Ricardo Mendes", newsletter: "Insights Financeiros", valor: 49.90, desconto: false, percentualDesconto: "-", status: "Ativo" },
  { id: 10, nome: "Beatriz Oliveira", newsletter: "Análise de Mercado", valor: 39.90, desconto: true, percentualDesconto: "30%", status: "Ativo" },
  { id: 11, nome: "Lucas Martins", newsletter: "Tech & Inovação", valor: 59.90, desconto: false, percentualDesconto: "-", status: "Ativo" },
  { id: 12, nome: "Patricia Rocha", newsletter: "Compliance Weekly", valor: 29.90, desconto: true, percentualDesconto: "5%", status: "Ativo" },
];

const churnQuantity = [
  { mes: "Jan", cancelados: 12, novos: 45 },
  { mes: "Fev", cancelados: 15, novos: 52 },
  { mes: "Mar", cancelados: 18, novos: 48 },
  { mes: "Abr", cancelados: 14, novos: 56 },
  { mes: "Mai", cancelados: 20, novos: 61 },
  { mes: "Jun", cancelados: 16, novos: 58 },
];

const churnRevenue = [
  { mes: "Jan", perdido: 520, ganho: 2240 },
  { mes: "Fev", perdido: 680, ganho: 2650 },
  { mes: "Mar", perdido: 790, ganho: 2380 },
  { mes: "Abr", perdido: 610, ganho: 2880 },
  { mes: "Mai", perdido: 880, ganho: 3120 },
  { mes: "Jun", perdido: 710, ganho: 2950 },
];

// Cores do design system - pastel escuras
const CHART_COLORS = {
  blue: 'hsl(206, 35%, 65%)',
  purple: 'hsl(270, 32%, 67%)',
  peach: 'hsl(24, 48%, 68%)',
  pink: 'hsl(322, 32%, 68%)',
  green: 'hsl(152, 32%, 65%)',
  orange: 'hsl(30, 35%, 67%)',
};

export default function Financeiro() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(subscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = subscribers.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/criar-newsletter")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Dashboard Financeiro</h1>
                <p className="text-sm text-muted-foreground mt-1">Visão completa das receitas e assinantes</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* KPIs */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <StatCard
                icon={DollarSign}
                value="R$ 20.100"
                label="Valor Recebido (Junho)"
                trend="+12.5%"
                trendType="positive"
                bgColor="bg-pastel-green"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <StatCard
                icon={Receipt}
                value="R$ 8.450"
                label="A Receber (Julho)"
                trend="+8.2%"
                trendType="positive"
                bgColor="bg-pastel-purple"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <StatCard
                icon={Target}
                value="R$ 44,08"
                label="Receita Média por Usuário"
                trend="+5.3%"
                trendType="positive"
                bgColor="bg-pastel-peach"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <StatCard
                icon={Users}
                value="456"
                label="Assinantes Ativos"
                trend="+10.8%"
                trendType="positive"
                bgColor="bg-pastel-blue"
              />
            </div>
          </section>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Receita por Newsletter */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Receita por Newsletter (Últimos 4 Meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByNewsletter}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                      angle={-15} 
                      textAnchor="end" 
                      height={80} 
                    />
                    <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }} 
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                    <Bar dataKey="jan" stackId="a" fill={CHART_COLORS.green} />
                    <Bar dataKey="fev" stackId="a" fill={CHART_COLORS.purple} />
                    <Bar dataKey="mar" stackId="a" fill={CHART_COLORS.peach} />
                    <Bar dataKey="abr" stackId="a" fill={CHART_COLORS.blue} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Receita por Tag */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Receita por Tag</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueByTag}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueByTag.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Crescimento da Receita */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Crescimento da Receita (6 Meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueGrowth}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="receita" 
                      stroke={CHART_COLORS.green} 
                      fillOpacity={1} 
                      fill="url(#colorReceita)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Seguidores vs Receita */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Seguidores vs Receita (em milhares)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={followersVsRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }} 
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="seguidores" 
                      stroke={CHART_COLORS.purple} 
                      strokeWidth={2} 
                      name="Seguidores" 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="receita" 
                      stroke={CHART_COLORS.green} 
                      strokeWidth={2} 
                      name="Receita (R$)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Churn de Usuários - Quantidade */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.9s" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Churn vs Novos Assinantes (Quantidade)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={churnQuantity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }} 
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                    <Bar dataKey="cancelados" fill={CHART_COLORS.peach} name="Cancelados" />
                    <Bar dataKey="novos" fill={CHART_COLORS.green} name="Novos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Churn de Usuários - Receita */}
            <Card className="animate-fade-in" style={{ animationDelay: "1s" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Churn vs Receita Nova (R$)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={churnRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        color: 'hsl(var(--foreground))'
                      }} 
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                    <Bar dataKey="perdido" fill={CHART_COLORS.pink} name="Receita Perdida" />
                    <Bar dataKey="ganho" fill={CHART_COLORS.blue} name="Receita Nova" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Assinantes */}
          <Card className="animate-fade-in" style={{ animationDelay: "1.1s" }}>
            <CardHeader>
              <CardTitle className="text-foreground">Assinantes e Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Nome</TableHead>
                    <TableHead className="text-foreground">Newsletter</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Desconto</TableHead>
                    <TableHead className="text-foreground">Valor Mensal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSubscribers.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium text-foreground">{sub.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{sub.newsletter}</TableCell>
                      <TableCell>
                        <Badge className="bg-pastel-green text-pastel-gray-dark border-0">
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {sub.desconto ? (
                          <Badge className="bg-pastel-peach text-pastel-gray-dark border-0">
                            {sub.percentualDesconto}
                          </Badge>
                        ) : (
                          <Badge className="bg-muted text-muted-foreground border-0">
                            Sem desconto
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-foreground">R$ {sub.valor.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Paginação */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} - {Math.min(endIndex, subscribers.length)} de {subscribers.length} assinantes
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground px-3">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                  >
                    Próximo
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
