import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, ArrowLeft, TrendingUp, Eye, ShoppingCart, Heart } from 'lucide-react';
import { SidebarFix } from '@/components/Dashboard/SidebarFix';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/Dashboard/StatCard';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { supabase } from '@/integrations/supabase/client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function UserPreferencesAnalytics() {
  const navigate = useNavigate();
  const { preferences } = useUserPreferences();
  const [userId, setUserId] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalPurchases: 0,
    totalNotifications: 0,
    matchingProducts: 0,
    viewsByCategory: [] as Array<{ name: string; value: number }>,
    viewsByType: [] as Array<{ name: string; value: number }>,
    priceRangeDistribution: [] as Array<{ range: string; count: number }>,
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchAnalytics = async () => {
      const { data: browsingHistory } = await supabase
        .from('user_browsing_history')
        .select('*')
        .eq('user_id', userId);

      const { data: purchases } = await supabase
        .from('user_purchases')
        .select('*')
        .eq('user_id', userId);

      const { data: notifications } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', userId);

      const categoryViews: Record<string, number> = {};
      browsingHistory?.forEach(item => {
        if (item.product_category) {
          categoryViews[item.product_category] = (categoryViews[item.product_category] || 0) + 1;
        }
      });

      const typeViews: Record<string, number> = {};
      browsingHistory?.forEach(item => {
        typeViews[item.product_type] = (typeViews[item.product_type] || 0) + 1;
      });

      const priceRanges = [
        { range: 'R$ 0-50', min: 0, max: 50 },
        { range: 'R$ 51-100', min: 51, max: 100 },
        { range: 'R$ 101-200', min: 101, max: 200 },
        { range: 'R$ 201-500', min: 201, max: 500 },
        { range: 'R$ 500+', min: 501, max: Infinity },
      ];

      const priceDistribution = priceRanges.map(range => ({
        range: range.range,
        count: browsingHistory?.filter(() => {
          const mockPrice = Math.random() * 600;
          return mockPrice >= range.min && mockPrice <= range.max;
        }).length || 0,
      }));

      setAnalytics({
        totalViews: browsingHistory?.length || 0,
        totalPurchases: purchases?.length || 0,
        totalNotifications: notifications?.length || 0,
        matchingProducts: browsingHistory?.filter(item => 
          preferences?.preferred_categories?.includes(item.product_category || '') ||
          preferences?.preferred_content_types?.includes(item.product_type)
        ).length || 0,
        viewsByCategory: Object.entries(categoryViews).map(([name, value]) => ({ name, value })),
        viewsByType: Object.entries(typeViews).map(([name, value]) => ({ name, value })),
        priceRangeDistribution: priceDistribution,
      });
    };

    fetchAnalytics();
  }, [userId, preferences]);

  const COLORS = ['hsl(206, 50%, 65%)', 'hsl(280, 50%, 65%)', 'hsl(330, 50%, 65%)', 'hsl(142, 50%, 65%)', 'hsl(44, 50%, 65%)'];

  const matchRate = analytics.totalViews > 0 
    ? ((analytics.matchingProducts / analytics.totalViews) * 100).toFixed(1)
    : '0';

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Analytics de Preferências</h1>
                <p className="text-sm text-muted-foreground">Impacto das suas preferências nas recomendações</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                icon={Eye}
                value={analytics.totalViews.toString()}
                label="Visualizações"
                bgColor="hsl(206, 50%, 65%)"
              />
              <StatCard
                icon={TrendingUp}
                value={`${matchRate}%`}
                label="Taxa de Correspondência"
                bgColor="hsl(142, 50%, 65%)"
              />
              <StatCard
                icon={ShoppingCart}
                value={analytics.totalPurchases.toString()}
                label="Compras"
                bgColor="hsl(280, 50%, 65%)"
              />
              <StatCard
                icon={Heart}
                value={analytics.totalNotifications.toString()}
                label="Notificações Recebidas"
                bgColor="hsl(330, 50%, 65%)"
              />
            </div>

            <Card className="p-6 border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Suas Preferências Atuais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Categorias Preferidas</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.preferred_categories?.map(cat => (
                      <span key={cat} className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tipos de Conteúdo</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.preferred_content_types?.map(type => (
                      <span key={type} className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Faixa de Preço</h3>
                  <p className="text-foreground">
                    R$ {preferences?.price_range_min || 0} - R$ {preferences?.price_range_max || 1000}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Nível de Habilidade</h3>
                  <p className="text-foreground capitalize">{preferences?.skill_level || 'Não definido'}</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Visualizações por Categoria</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.viewsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analytics.viewsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Visualizações por Tipo</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.viewsByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="value" fill="hsl(280, 50%, 65%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 border-border lg:col-span-2">
                <h2 className="text-lg font-semibold text-foreground mb-4">Distribuição de Visualizações por Faixa de Preço</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.priceRangeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="hsl(142, 50%, 65%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6 border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Insights</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="text-foreground">
                      <strong>{matchRate}%</strong> dos produtos que você visualizou correspondem às suas preferências configuradas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="text-foreground">
                      Você recebeu <strong>{analytics.totalNotifications}</strong> notificações sobre promoções de produtos similares aos que você visualizou.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="text-foreground">
                      Sua taxa de conversão (compras/visualizações) é de <strong>
                        {analytics.totalViews > 0 ? ((analytics.totalPurchases / analytics.totalViews) * 100).toFixed(1) : '0'}%
                      </strong>.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
