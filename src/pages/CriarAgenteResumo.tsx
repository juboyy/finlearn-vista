import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardCheck, Info, GraduationCap, Heart, Star, ListChecks, Plug, Eye, Clock, Languages, ShieldHalf, MessageCircle, ChartLine, Lightbulb, Check, Rocket, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarMeusAgentes } from "@/components/Dashboard/SidebarMeusAgentes";

export function CriarAgenteResumo() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
                <Button variant="outline" className="rounded-lg font-bold">
                  Salvar Rascunho
                </Button>
                <Button className="rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold">
                  <Rocket className="h-4 w-4 mr-2" />
                  Publicar Agente
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-success-foreground" />
                  </div>
                  <div className="flex-1 h-2 bg-success rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-success-foreground" />
                  </div>
                  <div className="flex-1 h-2 bg-success rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-success-foreground" />
                  </div>
                  <div className="flex-1 h-2 bg-success rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-end flex-shrink-0">
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
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-success text-success-foreground rounded-md text-xs font-bold">
                          <Check className="h-3 w-3" />
                          Pronto para Publicar
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-accent-foreground" />
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
                  <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center">
                    <Heart className="h-7 w-7 text-accent-foreground" />
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
                      <Gauge className="text-muted-foreground h-5 w-5" />
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
                    <MessageCircle className="h-4 w-4 text-foreground" />
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
                      <div className="w-8 h-8 bg-success rounded-md flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-success-foreground" />
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
                      <div className="w-6 h-6 bg-success rounded-md flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-success-foreground" />
                      </div>
                      <span className="font-semibold text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-muted-foreground flex-shrink-0" />
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
                  {/* WhatsApp */}
                  <div className="text-center p-4 rounded-lg bg-success">
                    <svg className="h-8 w-8 mx-auto mb-2 text-success-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <p className="font-bold text-sm text-success-foreground">WhatsApp</p>
                    <p className="text-xs font-semibold text-success-foreground/80">Ativo</p>
                  </div>

                  {/* Web Chat */}
                  <div className="text-center p-4 rounded-lg bg-success">
                    <svg className="h-8 w-8 mx-auto mb-2 text-success-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      <path d="M2 12h20"/>
                    </svg>
                    <p className="font-bold text-sm text-success-foreground">Web Chat</p>
                    <p className="text-xs font-semibold text-success-foreground/80">Ativo</p>
                  </div>

                  {/* Telegram */}
                  <div className="text-center p-4 rounded-lg bg-success">
                    <svg className="h-8 w-8 mx-auto mb-2 text-success-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <p className="font-bold text-sm text-success-foreground">Telegram</p>
                    <p className="text-xs font-semibold text-success-foreground/80">Ativo</p>
                  </div>

                  {/* Slack */}
                  <div className="text-center p-4 rounded-lg bg-success">
                    <svg className="h-8 w-8 mx-auto mb-2 text-success-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                    </svg>
                    <p className="font-bold text-sm text-success-foreground">Slack</p>
                    <p className="text-xs font-semibold text-success-foreground/80">Ativo</p>
                  </div>

                  {/* App Mobile */}
                  <div className="text-center p-4 rounded-lg bg-muted border border-border">
                    <svg className="h-8 w-8 mx-auto mb-2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                    <p className="font-bold text-sm text-muted-foreground">App Mobile</p>
                    <p className="text-xs font-semibold text-muted-foreground/80">Em breve</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/criar-agente/personalidade")}
                  className="px-8 py-4 rounded-lg font-bold border-2 border-border"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="px-8 py-4 rounded-lg font-bold">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar Preview
                  </Button>
                  <Button size="lg" className="px-8 py-4 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold">
                    <Rocket className="h-4 w-4 mr-2" />
                    Publicar Agente Agora
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview Column */}
            <aside className="w-96 space-y-6 flex-shrink-0">
              {/* Preview Card */}
              <div className="bg-card rounded-xl border border-border p-6">
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
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full border-4 border-card flex items-center justify-center">
                      <Check className="h-4 w-4 text-success-foreground" />
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
                    <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                      <Languages className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-semibold">Idiomas</p>
                      <p className="text-sm font-bold text-foreground">Português, Inglês</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-success rounded-md flex items-center justify-center">
                      <ShieldHalf className="h-4 w-4 text-success-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-semibold">Segurança</p>
                      <p className="text-sm font-bold text-foreground">Criptografia Total</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full py-4 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Iniciar Conversa de Teste
                </Button>

                <div className="mt-4 p-4 bg-warning rounded-lg border-2 border-amber-300">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-warning-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-warning-foreground mb-1">Dica Pro</p>
                      <p className="text-xs text-warning-foreground">Teste seu agente antes de publicar para garantir a melhor experiência.</p>
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
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-card"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Precisão</span>
                      <span className="text-sm font-bold">95%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-card"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Satisfação</span>
                      <span className="text-sm font-bold">98%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-[98%] bg-card"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20">
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
