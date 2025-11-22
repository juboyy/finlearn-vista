import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Receipt, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  { id: 1, nome: "João Silva", newsletter: "Insights Financeiros", valor: 49.90, desconto: true, percentualDesconto: "20%" },
  { id: 2, nome: "Maria Santos", newsletter: "Análise de Mercado", valor: 39.90, desconto: false, percentualDesconto: "-" },
  { id: 3, nome: "Pedro Costa", newsletter: "Tech & Inovação", valor: 59.90, desconto: true, percentualDesconto: "15%" },
  { id: 4, nome: "Ana Paula", newsletter: "Compliance Weekly", valor: 29.90, desconto: false, percentualDesconto: "-" },
  { id: 5, nome: "Carlos Eduardo", newsletter: "Insights Financeiros", valor: 49.90, desconto: true, percentualDesconto: "10%" },
  { id: 6, nome: "Julia Fernandes", newsletter: "Análise de Mercado", valor: 39.90, desconto: false, percentualDesconto: "-" },
  { id: 7, nome: "Roberto Lima", newsletter: "Tech & Inovação", valor: 59.90, desconto: true, percentualDesconto: "25%" },
  { id: 8, nome: "Fernanda Alves", newsletter: "Compliance Weekly", valor: 29.90, desconto: false, percentualDesconto: "-" },
];

const COLORS = ['#C5E8D4', '#D4C5E8', '#E8D4C5', '#C5D4E8', '#E8C5D4'];

export default function Financeiro() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/criar-newsletter")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-4"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>
            <h1 className="text-4xl font-bold text-foreground">Dashboard Financeiro</h1>
            <p className="text-muted-foreground mt-2">Visão completa das receitas e assinantes</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={DollarSign}
              value="R$ 20.100"
              label="Valor Recebido (Junho)"
              trend="+12.5%"
              trendType="positive"
              bgColor="bg-[#C5E8D4]"
            />
            <StatCard
              icon={Receipt}
              value="R$ 8.450"
              label="A Receber (Julho)"
              trend="+8.2%"
              trendType="positive"
              bgColor="bg-[#D4C5E8]"
            />
            <StatCard
              icon={Target}
              value="R$ 44,08"
              label="Receita Média por Usuário"
              trend="+5.3%"
              trendType="positive"
              bgColor="bg-[#E8D4C5]"
            />
            <StatCard
              icon={Users}
              value="456"
              label="Assinantes Ativos"
              trend="+10.8%"
              trendType="positive"
              bgColor="bg-[#C5D4E8]"
            />
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Receita por Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Receita por Newsletter (Últimos 4 Meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByNewsletter}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                    <Legend />
                    <Bar dataKey="jan" stackId="a" fill="#C5E8D4" />
                    <Bar dataKey="fev" stackId="a" fill="#D4C5E8" />
                    <Bar dataKey="mar" stackId="a" fill="#E8D4C5" />
                    <Bar dataKey="abr" stackId="a" fill="#C5D4E8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Receita por Tag */}
            <Card>
              <CardHeader>
                <CardTitle>Receita por Tag</CardTitle>
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Crescimento da Receita */}
            <Card>
              <CardHeader>
                <CardTitle>Crescimento da Receita (6 Meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueGrowth}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C5E8D4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#C5E8D4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                    <Area type="monotone" dataKey="receita" stroke="#C5E8D4" fillOpacity={1} fill="url(#colorReceita)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Seguidores vs Receita */}
            <Card>
              <CardHeader>
                <CardTitle>Seguidores vs Receita (em milhares)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={followersVsRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="seguidores" stroke="#D4C5E8" strokeWidth={2} name="Seguidores" />
                    <Line yAxisId="right" type="monotone" dataKey="receita" stroke="#C5E8D4" strokeWidth={2} name="Receita (R$)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Assinantes */}
          <Card>
            <CardHeader>
              <CardTitle>Assinantes e Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Newsletter</TableHead>
                    <TableHead>Valor Mensal</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.nome}</TableCell>
                      <TableCell>{sub.newsletter}</TableCell>
                      <TableCell>R$ {sub.valor.toFixed(2)}</TableCell>
                      <TableCell>
                        {sub.desconto ? (
                          <Badge style={{ backgroundColor: '#E8D4C5', color: '#4a4a4a' }}>
                            {sub.percentualDesconto}
                          </Badge>
                        ) : (
                          <Badge style={{ backgroundColor: '#e8e8e8', color: '#6a6a6a' }}>
                            Sem desconto
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge style={{ backgroundColor: '#C5E8D4', color: '#4a4a4a' }}>
                          Ativo
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
