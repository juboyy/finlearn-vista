import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, ArrowLeft, User, Star, Crown, Check, X, Bot, Video, 
  BookOpen, LineChart, ChevronDown, Shield, Search
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function UpgradePlano() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [addons, setAddons] = useState({
    aiAgent: false,
    webinars: false,
    ebooks: false,
    analysis: false
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate("/assinaturas")}
                className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Upgrade de Plano</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Escolha o melhor plano para suas necessidades</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="w-72 pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
              
              <button className="relative w-10 h-10 text-muted-foreground hover:bg-accent rounded-lg transition-colors flex items-center justify-center">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Current Plan Banner */}
          <section className="bg-gradient-to-r from-primary/30 to-[hsl(270,35%,80%)]/30 border border-border rounded-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-card rounded-lg flex items-center justify-center border border-border shadow-sm">
                  <User className="text-[hsl(220,10%,40%)]" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Plano Atual: Gratuito</h2>
                  <p className="text-muted-foreground mb-3">Você está no plano gratuito desde 15 de Janeiro, 2024</p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2">
                      <Check className="text-[hsl(140,30%,75%)]" size={16} />
                      <span className="text-foreground">Artigos públicos ilimitados</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Check className="text-[hsl(140,30%,75%)]" size={16} />
                      <span className="text-foreground">Newsletter semanal</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Check className="text-[hsl(140,30%,75%)]" size={16} />
                      <span className="text-foreground">Comunidade básica</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-extrabold text-foreground">R$ 0</p>
                <p className="text-sm text-muted-foreground mt-1">por mês</p>
              </div>
            </div>
          </section>

          {/* Billing Toggle */}
          <section className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center gap-4 p-1.5 bg-muted rounded-lg border border-border">
              <button 
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  billingPeriod === "monthly" 
                    ? "text-primary-foreground bg-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                Mensal
              </button>
              <button 
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${
                  billingPeriod === "annual" 
                    ? "text-primary-foreground bg-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                Anual
                <span className="px-2 py-0.5 bg-[hsl(140,30%,75%)] text-[hsl(220,10%,40%)] text-xs font-bold rounded-full">
                  Economize 20%
                </span>
              </button>
            </div>
          </section>

          {/* Plans Comparison */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className="bg-card border-2 border-border rounded-lg p-8 flex flex-col relative">
                <div className="absolute -top-3 left-6 bg-primary text-[hsl(220,10%,40%)] text-xs font-bold px-3 py-1 rounded-full border border-border">
                  Plano Atual
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/50 rounded-lg flex items-center justify-center">
                    <User className="text-[hsl(220,10%,40%)]" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Gratuito</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 text-sm">Ideal para começar a explorar o conteúdo</p>
                
                <div className="mb-6">
                  <p className="text-5xl font-extrabold text-foreground">R$ 0</p>
                  <p className="text-sm text-muted-foreground mt-1">por mês</p>
                </div>

                <button disabled className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium mb-8 opacity-50 cursor-not-allowed">
                  Plano Atual
                </button>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-4">O que está incluído:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Acesso a artigos públicos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Newsletter semanal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Notificações de novos posts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Comentários em artigos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-400 mt-0.5" size={16} />
                      <span className="text-muted-foreground">Artigos premium</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-400 mt-0.5" size={16} />
                      <span className="text-muted-foreground">Webinars exclusivos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-400 mt-0.5" size={16} />
                      <span className="text-muted-foreground">Biblioteca de recursos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-400 mt-0.5" size={16} />
                      <span className="text-muted-foreground">Grupo privado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-400 mt-0.5" size={16} />
                      <span className="text-muted-foreground">Consultoria individual</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="bg-card border-2 border-primary rounded-lg p-8 flex flex-col relative shadow-lg transform scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Mais Popular
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[hsl(270,35%,80%)]/50 rounded-lg flex items-center justify-center">
                    <Star className="text-[hsl(220,10%,40%)]" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Premium</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 text-sm">Para profissionais que buscam crescimento</p>
                
                <div className="mb-2">
                  <p className="text-5xl font-extrabold text-foreground">
                    R$ {billingPeriod === "annual" ? "39" : "49"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    por mês {billingPeriod === "annual" && "no plano anual"}
                  </p>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-xs text-muted-foreground mb-6">ou R$ 49/mês no plano mensal</p>
                )}

                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors mb-8 shadow-sm flex items-center justify-center gap-2">
                  <i className="fa-solid fa-arrow-up"></i>
                  Fazer Upgrade
                </button>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-4">O que está incluído:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground font-medium">Tudo do plano Gratuito</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Acesso a todos os artigos premium</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Webinars mensais ao vivo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Biblioteca de recursos exclusivos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Grupo privado no Telegram</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Downloads de materiais</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Certificados de conclusão</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Suporte prioritário</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-400 mt-0.5" size={16} />
                      <span className="text-muted-foreground">Consultoria individual</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* VIP Plan */}
              <div className="bg-card border-2 border-border rounded-lg p-8 flex flex-col relative">
                <div className="absolute -top-3 left-6 bg-[hsl(25,50%,80%)] text-[hsl(220,10%,40%)] text-xs font-bold px-3 py-1 rounded-full border border-border">
                  Exclusivo
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[hsl(25,50%,80%)]/50 rounded-lg flex items-center justify-center">
                    <Crown className="text-[hsl(220,10%,40%)]" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">VIP</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 text-sm">Experiência completa com mentoria personalizada</p>
                
                <div className="mb-2">
                  <p className="text-5xl font-extrabold text-foreground">
                    R$ {billingPeriod === "annual" ? "119" : "149"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    por mês {billingPeriod === "annual" && "no plano anual"}
                  </p>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-xs text-muted-foreground mb-6">ou R$ 149/mês no plano mensal</p>
                )}

                <button className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors mb-8 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-arrow-up"></i>
                  Fazer Upgrade
                </button>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground mb-4">O que está incluído:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground font-medium">Tudo do plano Premium</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Consultoria individual mensal (1h)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Acesso antecipado a conteúdos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Networking exclusivo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Material didático personalizado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Participação em eventos VIP</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Badge exclusivo na plataforma</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Revisão de portfólio trimestral</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[hsl(140,30%,75%)] mt-0.5" size={16} />
                      <span className="text-foreground">Suporte dedicado 24/7</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Addons Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Adicione Extras ao Seu Plano</h2>
              <p className="text-muted-foreground">Personalize sua experiência com complementos exclusivos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Addon 1 - AI Agent */}
              <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-primary/50 rounded-lg flex items-center justify-center">
                    <Bot className="text-[hsl(220,10%,40%)]" size={24} />
                  </div>
                  <Switch 
                    checked={addons.aiAgent}
                    onCheckedChange={(checked) => setAddons({ ...addons, aiAgent: checked })}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Agente IA Pessoal</h3>
                <p className="text-sm text-muted-foreground mb-4">Assistente IA disponível 24/7 para tirar suas dúvidas sobre investimentos</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-extrabold text-foreground">R$ 29</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>Respostas ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>Análise de portfólio</span>
                  </li>
                </ul>
              </div>

              {/* Addon 2 - Webinars */}
              <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-[hsl(270,35%,80%)]/50 rounded-lg flex items-center justify-center">
                    <Video className="text-[hsl(220,10%,40%)]" size={24} />
                  </div>
                  <Switch 
                    checked={addons.webinars}
                    onCheckedChange={(checked) => setAddons({ ...addons, webinars: checked })}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Webinars Premium</h3>
                <p className="text-sm text-muted-foreground mb-4">Acesso a todos os webinars gravados e ao vivo com especialistas</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-extrabold text-foreground">R$ 19</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>4 webinars ao vivo/mês</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>Biblioteca completa</span>
                  </li>
                </ul>
              </div>

              {/* Addon 3 - Ebooks */}
              <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-[hsl(140,30%,75%)]/50 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-[hsl(220,10%,40%)]" size={24} />
                  </div>
                  <Switch 
                    checked={addons.ebooks}
                    onCheckedChange={(checked) => setAddons({ ...addons, ebooks: checked })}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Biblioteca E-books</h3>
                <p className="text-sm text-muted-foreground mb-4">Acesso ilimitado a todos os e-books e materiais complementares</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-extrabold text-foreground">R$ 24</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>+50 e-books disponíveis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>Downloads ilimitados</span>
                  </li>
                </ul>
              </div>

              {/* Addon 4 - Analysis */}
              <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-[hsl(25,50%,80%)]/50 rounded-lg flex items-center justify-center">
                    <LineChart className="text-[hsl(220,10%,40%)]" size={24} />
                  </div>
                  <Switch 
                    checked={addons.analysis}
                    onCheckedChange={(checked) => setAddons({ ...addons, analysis: checked })}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Análise Avançada</h3>
                <p className="text-sm text-muted-foreground mb-4">Ferramentas profissionais de análise técnica e fundamentalista</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-extrabold text-foreground">R$ 39</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>Dashboard completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-[hsl(140,30%,75%)]" size={12} />
                    <span>Alertas personalizados</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features Comparison Table */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Compare Todos os Recursos</h2>
              <p className="text-muted-foreground">Veja tudo o que cada plano oferece em detalhes</p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground">Recursos</th>
                      <th className="text-center p-4 font-semibold text-foreground">Gratuito</th>
                      <th className="text-center p-4 font-semibold text-foreground bg-primary/10">Premium</th>
                      <th className="text-center p-4 font-semibold text-foreground">VIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Artigos públicos</td>
                      <td className="p-4 text-center"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                      <td className="p-4 text-center"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Artigos premium</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                      <td className="p-4 text-center"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Webinars mensais</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><span className="text-sm font-medium text-foreground">2/mês</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-medium text-foreground">Ilimitado</span></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Grupo privado</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                      <td className="p-4 text-center"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Downloads de materiais</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><span className="text-sm font-medium text-foreground">10/mês</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-medium text-foreground">Ilimitado</span></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Consultoria individual</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center"><span className="text-sm font-medium text-foreground">1h/mês</span></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Acesso antecipado</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-foreground">Certificados</td>
                      <td className="p-4 text-center"><X className="text-red-400 mx-auto" size={16} /></td>
                      <td className="p-4 text-center bg-primary/5"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                      <td className="p-4 text-center"><Check className="text-[hsl(140,30%,75%)] mx-auto" size={16} /></td>
                    </tr>
                    <tr>
                      <td className="p-4 text-sm text-foreground">Suporte</td>
                      <td className="p-4 text-center"><span className="text-sm text-muted-foreground">Email</span></td>
                      <td className="p-4 text-center bg-primary/5"><span className="text-sm font-medium text-foreground">Prioritário</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-medium text-foreground">Dedicado 24/7</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">O Que Nossos Assinantes Dizem</h2>
              <p className="text-muted-foreground">Veja como o upgrade transformou a experiência de aprendizado</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="text-sm text-foreground/80 italic mb-4">"O upgrade para o plano Premium foi a melhor decisão. O acesso aos webinars exclusivos e ao grupo privado acelerou muito meu aprendizado sobre o mercado financeiro."</p>
                <div className="flex items-center gap-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Fernando Lima</p>
                    <p className="text-xs text-muted-foreground">Analista de Investimentos</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="text-sm text-foreground/80 italic mb-4">"A consultoria individual do plano VIP me ajudou a estruturar minha carteira de investimentos de forma profissional. Valeu cada centavo investido!"</p>
                <div className="flex items-center gap-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="User" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Juliana Santos</p>
                    <p className="text-xs text-muted-foreground">Gestora de Patrimônio</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="text-sm text-foreground/80 italic mb-4">"Os addons de Agente IA e Análise Avançada complementaram perfeitamente meu plano Premium. Agora tenho todas as ferramentas que preciso em um só lugar."</p>
                <div className="flex items-center gap-3">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="User" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Ricardo Almeida</p>
                    <p className="text-xs text-muted-foreground">Trader Profissional</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Perguntas Frequentes</h2>
              <p className="text-muted-foreground">Tire suas dúvidas sobre os planos e upgrades</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { question: "Posso cancelar minha assinatura a qualquer momento?", answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Você continuará tendo acesso aos recursos premium até o final do período pago." },
                { question: "Qual a diferença entre plano mensal e anual?", answer: "O plano anual oferece 20% de desconto em relação ao mensal. Além disso, você garante o preço por 12 meses sem reajustes." },
                { question: "Os addons podem ser adicionados depois?", answer: "Sim, você pode adicionar ou remover addons a qualquer momento. As alterações serão refletidas na próxima cobrança." },
                { question: "Existe período de teste gratuito?", answer: "Sim, oferecemos 7 dias de teste gratuito para os planos Premium e VIP. Você pode cancelar antes do fim do período sem custos." },
                { question: "Posso fazer downgrade do meu plano?", answer: "Sim, você pode fazer downgrade para um plano inferior. A mudança entrará em vigor no próximo ciclo de cobrança." }
              ].map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <span className="font-semibold text-foreground">{faq.question}</span>
                    <ChevronDown className={`text-muted-foreground transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} size={20} />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary/30 via-[hsl(270,35%,80%)]/30 to-[hsl(330,40%,80%)]/30 border border-border rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Pronto Para Transformar Sua Jornada?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 12.000 profissionais que já evoluíram suas carreiras com nossos planos premium
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors shadow-lg flex items-center gap-2">
                <Crown size={20} />
                Fazer Upgrade Agora
              </button>
              <button className="px-8 py-4 bg-card text-foreground border-2 border-border rounded-lg text-base font-semibold hover:bg-accent transition-colors">
                Falar com Consultor
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Shield className="text-[hsl(140,30%,75%)]" size={16} />
              Garantia de 30 dias - Satisfação total ou seu dinheiro de volta
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-graduation-cap text-lg"></i>
                  </div>
                  <span className="font-bold text-xl text-foreground">FinLearn AI</span>
                </div>
                <p className="text-sm text-muted-foreground">Transformando a educação financeira com tecnologia e conteúdo de qualidade.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Plataforma</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Cursos</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Comunidade</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Planos</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Licenças</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">© 2024 FinLearn AI. Todos os direitos reservados.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
