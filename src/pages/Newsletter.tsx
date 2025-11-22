import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Mail, Calendar, TrendingUp, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Newsletter = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos'>('todos');
  const newsletters = [
    {
      id: 1,
      title: "Resumo Semanal do Mercado",
      description: "As principais notícias e análises da semana no mercado financeiro",
      frequency: "Semanal",
      subscribers: "2.4k",
      category: "Mercado",
      lastSent: "2 dias atrás",
      status: "subscribed"
    },
    {
      id: 2,
      title: "Insights de Regulamentação",
      description: "Atualizações sobre mudanças regulatórias e compliance",
      frequency: "Quinzenal",
      subscribers: "1.8k",
      category: "Regulamentação",
      lastSent: "5 dias atrás",
      status: "subscribed"
    },
    {
      id: 3,
      title: "Tendências em Payments",
      description: "Novidades e inovações no setor de pagamentos digitais",
      frequency: "Semanal",
      subscribers: "3.1k",
      category: "Payments",
      lastSent: "1 dia atrás",
      status: "available"
    },
    {
      id: 4,
      title: "Banking & Fintechs",
      description: "Análises sobre o ecossistema bancário e startups financeiras",
      frequency: "Semanal",
      subscribers: "2.7k",
      category: "Banking",
      lastSent: "3 dias atrás",
      status: "available"
    },
    {
      id: 5,
      title: "Economia em Foco",
      description: "Análise macroeconômica e seus impactos no mercado",
      frequency: "Semanal",
      subscribers: "4.2k",
      category: "Economia",
      lastSent: "1 dia atrás",
      status: "subscribed"
    },
    {
      id: 6,
      title: "Análise Técnica Diária",
      description: "Indicadores e análises técnicas dos principais ativos",
      frequency: "Diária",
      subscribers: "5.6k",
      category: "Mercado",
      lastSent: "Hoje",
      status: "available"
    }
  ];

  const mySubscriptions = newsletters.filter(n => n.status === "subscribed");
  const availableNewsletters = newsletters.filter(n => n.status === "available");

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        <MenutabbarFix activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Newsletters</h1>
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Preferências
              </Button>
            </div>
            <p className="text-muted-foreground">
              Receba insights personalizados diretamente no seu e-mail
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar newsletters..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inscrições Ativas</p>
                  <p className="text-2xl font-bold text-foreground">{mySubscriptions.length}</p>
                </div>
                <div className="w-12 h-12 bg-pastel-blue/20 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-pastel-blue" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Emails Este Mês</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <div className="w-12 h-12 bg-pastel-green/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-pastel-green" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Abertura</p>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                </div>
                <div className="w-12 h-12 bg-pastel-purple/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-pastel-purple" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disponíveis</p>
                  <p className="text-2xl font-bold text-foreground">{availableNewsletters.length}</p>
                </div>
                <div className="w-12 h-12 bg-pastel-pink/20 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-pastel-pink" />
                </div>
              </div>
            </div>
          </div>

          {/* My Subscriptions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Minhas Inscrições</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySubscriptions.map((newsletter) => (
                <div 
                  key={newsletter.id} 
                  className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{newsletter.title}</h3>
                      <p className="text-sm text-muted-foreground">{newsletter.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {newsletter.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {newsletter.frequency}
                    </span>
                    <span>{newsletter.subscribers} inscritos</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Último envio: {newsletter.lastSent}
                    </span>
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Available Newsletters */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Newsletters Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableNewsletters.map((newsletter) => (
                <div 
                  key={newsletter.id} 
                  className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{newsletter.title}</h3>
                      <p className="text-sm text-muted-foreground">{newsletter.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {newsletter.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {newsletter.frequency}
                    </span>
                    <span>{newsletter.subscribers} inscritos</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Último envio: {newsletter.lastSent}
                    </span>
                    <Button size="sm" className="bg-pastel-blue hover:bg-pastel-blue/90">
                      Inscrever-se
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Newsletter;
