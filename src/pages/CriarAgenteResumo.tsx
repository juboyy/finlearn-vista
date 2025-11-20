import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardCheck, Info, GraduationCap, Heart, Star, ListChecks, Plug, Eye, Clock, Languages, ShieldHalf, MessageCircle, ChartLine, Lightbulb, Check, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarMeusAgentes } from "@/components/Dashboard/SidebarMeusAgentes";

export function CriarAgenteResumo() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarMeusAgentes />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card border-b border-border">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Criar Novo Agente IA</h2>
                <p className="text-sm text-muted-foreground mt-1">Configure seu assistente financeiro inteligente</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-lg">
                  Salvar Rascunho
                </Button>
                <Button className="rounded-lg bg-primary hover:bg-primary/80">
                  <Rocket className="h-4 w-4 mr-2" />
                  Publicar Agente
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="flex-1 h-2 bg-emerald-200 rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="flex-1 h-2 bg-emerald-200 rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="flex-1 h-2 bg-emerald-200 rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    4
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-foreground">Passo 4 de 4</span>
                <span className="text-xs text-muted-foreground">Finalização</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="flex gap-6 p-8">
            {/* Main Form Section */}
            <div className="flex-1 space-y-6">
              {/* Summary Card */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Resumo do Agente</h3>
                    <p className="text-sm text-muted-foreground">Revise todas as informações antes de publicar</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-muted rounded-lg p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                        <Info className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground">Informações Básicas</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">Nome do Agente</p>
                        <p className="text-sm font-bold text-foreground">Analista de Mercado</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">Descrição</p>
                        <p className="text-sm text-foreground">Especialista em análise técnica e fundamentalista de ativos financeiros</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">Status</p>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-200 text-emerald-800 rounded-md text-xs font-bold">
                          <Check className="h-3 w-3" />
                          Pronto para Publicar
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-pink-200 rounded-md flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-pink-800" />
                      </div>
                      <h4 className="font-bold text-foreground">Especialização</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-2">Áreas de Conhecimento</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-card border border-border text-foreground rounded-md text-xs font-bold">Ações</span>
                          <span className="px-3 py-1 bg-card border border-border text-foreground rounded-md text-xs font-bold">Análise Técnica</span>
                          <span className="px-3 py-1 bg-card border border-border text-foreground rounded-md text-xs font-bold">Indicadores</span>
                          <span className="px-3 py-1 bg-card border border-border text-foreground rounded-md text-xs font-bold">Mercado de Capitais</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">Nível de Expertise</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-primary"></div>
                          </div>
                          <span className="text-xs font-bold text-foreground">Avançado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personality Card */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-pink-200 rounded-lg flex items-center justify-center">
                    <Heart className="h-7 w-7 text-pink-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Personalidade & Comportamento</h3>
                    <p className="text-sm text-muted-foreground">Como seu agente interage com os usuários</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted rounded-lg p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle className="text-muted-foreground h-5 w-5" />
                      <h5 className="font-bold text-foreground text-sm">Tom de Voz</h5>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Profissional e Amigável</p>
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-border rounded"></div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="text-muted-foreground h-5 w-5" />
                      <h5 className="font-bold text-foreground text-sm">Empatia</h5>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Alta Sensibilidade</p>
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <ChartLine className="text-muted-foreground h-5 w-5" />
                      <h5 className="font-bold text-foreground text-sm">Formalidade</h5>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Moderadamente Formal</p>
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-primary rounded"></div>
                      <div className="h-1 flex-1 bg-border rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Exemplo de Resposta
                  </h5>
                  <div className="bg-card rounded-md p-4 border border-border">
                    <p className="text-sm text-muted-foreground italic">"Olá! Fico feliz em ajudá-lo com seu planejamento financeiro. Vamos começar analisando seus objetivos e criar uma estratégia personalizada para alcançá-los. Pode me contar um pouco sobre sua situação atual?"</p>
                  </div>
                </div>
              </div>

              {/* Capabilities Card */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                    <Star className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Capacidades & Recursos</h3>
                    <p className="text-sm text-muted-foreground">Ferramentas e funcionalidades disponíveis</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Análise de Ativos", desc: "Recomendações baseadas em perfil de risco" },
                    { title: "Planejamento Orçamentário", desc: "Criação de orçamentos personalizados" },
                    { title: "Cálculo de Impostos", desc: "Otimização tributária e planejamento" },
                    { title: "Relatórios Financeiros", desc: "Geração automática de documentos" },
                    { title: "Educação Financeira", desc: "Conteúdos educativos personalizados" },
                    { title: "Alertas Inteligentes", desc: "Notificações sobre o mercado" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border">
                      <div className="w-8 h-8 bg-emerald-200 rounded-md flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-emerald-800" />
                      </div>
                      <div>
                        <h5 className="font-bold text-foreground text-sm mb-1">{item.title}</h5>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist Card */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                    <ListChecks className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Checklist Final</h3>
                    <p className="text-sm text-muted-foreground">Verifique todos os itens antes de publicar</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Informações básicas preenchidas",
                    "Especialização definida",
                    "Personalidade configurada",
                    "Capacidades selecionadas",
                    "Testes de conversação realizados"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                      <div className="w-6 h-6 bg-emerald-200 rounded-md flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-emerald-800" />
                      </div>
                      <span className="font-semibold text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm text-foreground">Após a publicação, seu agente estará disponível para todos os usuários da plataforma em até 5 minutos.</p>
                  </div>
                </div>
              </div>

              {/* Integrations Card */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center">
                    <Plug className="h-7 w-7 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Integrações e Canais</h3>
                    <p className="text-sm text-muted-foreground">Onde o agente estará disponível</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { name: "WhatsApp", active: true },
                    { name: "Web Chat", active: true },
                    { name: "Telegram", active: true },
                    { name: "Slack", active: true },
                    { name: "App Mobile", active: false }
                  ].map((channel, idx) => (
                    <div key={idx} className={`text-center p-4 rounded-lg ${channel.active ? 'bg-emerald-200' : 'bg-muted border border-border'}`}>
                      <MessageCircle className={`h-8 w-8 mx-auto mb-2 ${channel.active ? 'text-emerald-800' : 'text-muted-foreground'}`} />
                      <p className={`font-bold text-sm ${channel.active ? 'text-emerald-800' : 'text-muted-foreground'}`}>{channel.name}</p>
                      <p className={`text-xs font-semibold ${channel.active ? 'text-emerald-800/80' : 'text-muted-foreground/80'}`}>{channel.active ? 'Ativo' : 'Em breve'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/criar-agente/personalidade")}
                  className="rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="rounded-lg">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar Preview
                  </Button>
                  <Button size="lg" className="rounded-lg bg-primary hover:bg-primary/80">
                    <Rocket className="h-4 w-4 mr-2" />
                    Publicar Agente Agora
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview Column */}
            <aside className="w-96 space-y-6">
              {/* Preview Card */}
              <div className="bg-card rounded-xl border border-border p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Preview do Agente</h3>
                </div>

                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center">
                      <ChartLine className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-200 rounded-full border-4 border-card flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-800" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Analista de Mercado</h4>
                  <p className="text-sm text-muted-foreground mb-4">Especialista em análise de ativos financeiros</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs font-bold">Ações</span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs font-bold">Indicadores</span>
                  </div>

                  <div className="bg-muted rounded-lg p-4 mb-4 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-muted-foreground">Taxa de Satisfação</span>
                      <span className="text-sm font-bold text-foreground">98%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full w-[98%] bg-primary"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-semibold">Tempo de Resposta</p>
                      <p className="text-sm font-bold text-foreground">Instantâneo</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-pink-200 rounded-md flex items-center justify-center">
                      <Languages className="h-4 w-4 text-pink-800" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-semibold">Idiomas</p>
                      <p className="text-sm font-bold text-foreground">Português, Inglês</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-emerald-200 rounded-md flex items-center justify-center">
                      <ShieldHalf className="h-4 w-4 text-emerald-800" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-semibold">Segurança</p>
                      <p className="text-sm font-bold text-foreground">Criptografia Total</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-lg bg-primary hover:bg-primary/80">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Iniciar Conversa de Teste
                </Button>

                <div className="mt-4 p-4 bg-amber-100 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-800" />
                    <div>
                      <p className="text-xs font-bold text-amber-800 mb-1">Dica Pro</p>
                      <p className="text-xs text-amber-800">Teste seu agente antes de publicar para garantir a melhor experiência.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ChartLine className="h-5 w-5" />
                  Estatísticas Esperadas
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Engajamento</span>
                      <span className="text-sm font-bold">Alto</span>
                    </div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-card"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Precisão</span>
                      <span className="text-sm font-bold">95%</span>
                    </div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-card"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Satisfação</span>
                      <span className="text-sm font-bold">98%</span>
                    </div>
                    <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full w-[98%] bg-card"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary-foreground/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold mb-1">1.2K</p>
                      <p className="text-xs text-primary-foreground/80">Usuários Esperados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold mb-1">4.8</p>
                      <p className="text-xs text-primary-foreground/80">Avaliação Média</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
