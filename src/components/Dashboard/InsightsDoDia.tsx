import { 
  X, Lightbulb, TrendingUp, Clock, Flame, Users, BookOpen, 
  Bell, Target, Zap, Award, Heart, MessageSquare, Eye,
  Share2, ChevronRight, Newspaper, Calendar, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface InsightsDoDiaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InsightsDoDia = ({ open, onOpenChange }: InsightsDoDiaProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-2xl font-semibold text-foreground">
            Insights do Dia
          </SheetTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Personalizado para você • Atualizado há 2 minutos
          </p>
        </SheetHeader>

        <div className="py-6 space-y-4">
          {/* Insight Principal */}
          <div className="bg-gradient-to-br from-pastel-purple/20 to-pastel-pink/20 rounded-xl border-2 border-pastel-dark-gray p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pastel-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Lightbulb className="text-pastel-dark-gray" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">Insight Estratégico</h3>
                  <Badge className="bg-pastel-purple text-pastel-dark-gray border-0">IA</Badge>
                </div>
                <p className="text-sm text-slate-700 mb-3">
                  Seus posts sobre <strong>Análise de Mercado de Capitais</strong> geraram 
                  <strong> 3x mais engajamento</strong> esta semana. Continue explorando este tema!
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                  <Eye size={14} className="text-pastel-blue" />
                  <span>1.2k visualizações</span>
                  <span>•</span>
                  <Heart size={14} className="text-pastel-pink" />
                  <span>234 reações</span>
                  <span>•</span>
                  <MessageSquare size={14} className="text-pastel-green" />
                  <span>45 comentários</span>
                </div>
                <Button className="w-full bg-pastel-purple hover:bg-pastel-purple/80 text-pastel-dark-gray">
                  <TrendingUp size={16} className="mr-2" />
                  Ver Estatísticas Completas
                </Button>
              </div>
            </div>
          </div>

          {/* Matéria em Alta */}
          <div className="bg-white rounded-xl border-2 border-pastel-dark-gray p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <Flame className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-blue/50 text-pastel-dark-gray border-0">Em Alta</Badge>
                  <span className="text-xs text-muted-foreground">Tendência do dia</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Novas regras do Pix: O que muda em 2025
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Análise aprofundada das mudanças propostas pelo Banco Central e 
                  impactos no mercado de pagamentos instantâneos.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-pastel-green" />
                      <span>+2.8k leituras hoje</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pastel-blue hover:text-pastel-blue/80">
                    Ler Agora
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Post de Seguidor em Destaque */}
          <div className="bg-white rounded-xl border-2 border-pastel-dark-gray p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-green/50 text-pastel-dark-gray border-0">Sua Rede</Badge>
                  <span className="text-xs text-muted-foreground">há 3 horas</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Marina Silva publicou: "Gestão de Risco em Tempos de Inflação"
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Um dos autores que você segue publicou um artigo que está gerando 
                  grande discussão na comunidade. Já tem 156 comentários!
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-pastel-green hover:bg-pastel-green hover:text-pastel-dark-gray">
                    <Eye size={14} className="mr-2" />
                    Visualizar Post
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-pastel-green hover:bg-pastel-green hover:text-pastel-dark-gray">
                    <Share2 size={14} className="mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Lembrete de Curso */}
          <div className="bg-white rounded-xl border-2 border-pastel-dark-gray p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-peach/50 text-pastel-dark-gray border-0">Lembrete</Badge>
                  <span className="text-xs text-muted-foreground">Ação recomendada</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Continue seu curso: Compliance no Mercado Financeiro
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Você está a apenas 2 módulos de completar! Dedique 45 minutos hoje 
                  e conquiste seu certificado.
                </p>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-600">Progresso do Curso</span>
                    <span className="text-xs font-medium text-slate-700">80%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-pastel-green rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <Button className="w-full bg-pastel-peach hover:bg-pastel-peach/80 text-pastel-dark-gray">
                  <BookOpen size={16} className="mr-2" />
                  Continuar Estudando
                </Button>
              </div>
            </div>
          </div>

          {/* Tema Sugerido */}
          <div className="bg-white rounded-xl border-2 border-pastel-dark-gray p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-yellow/70 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-yellow/50 text-pastel-dark-gray border-0">Sugestão</Badge>
                  <Badge className="bg-pastel-purple text-pastel-dark-gray border-0">IA</Badge>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Tema para seu próximo artigo: Open Banking
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Com base no seu histórico e interesse da sua audiência, este tema 
                  pode gerar <strong>alto engajamento</strong>. 23 pessoas da sua rede 
                  comentaram sobre isso esta semana.
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-pastel-yellow/70 hover:bg-pastel-yellow/70 hover:text-pastel-dark-gray">
                    <Zap size={14} className="mr-2" />
                    Criar Conteúdo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-600">
                    Ver Mais Temas
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Resultado de Post */}
          <div className="bg-gradient-to-br from-pastel-pink/20 to-pastel-peach/20 rounded-xl border-2 border-pastel-dark-gray p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-pink/50 text-pastel-dark-gray border-0">Destaque</Badge>
                  <span className="text-xs text-muted-foreground">Ontem</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Seu artigo "ESG no Setor Financeiro" atingiu 1.000 visualizações!
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Parabéns! Este é seu conteúdo mais visualizado do mês. 
                  Considere criar uma série sobre o tema.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg font-bold text-slate-800">1.0k</div>
                    <div className="text-xs text-slate-600">Visualizações</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg font-bold text-slate-800">89</div>
                    <div className="text-xs text-slate-600">Reações</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg font-bold text-slate-800">32</div>
                    <div className="text-xs text-slate-600">Comentários</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-pastel-pink hover:bg-pastel-pink hover:text-pastel-dark-gray">
                  Ver Análise Completa
                </Button>
              </div>
            </div>
          </div>

          {/* Evento Próximo */}
          <div className="bg-white rounded-xl border-2 border-pastel-dark-gray p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-blue/70 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-blue/50 text-pastel-dark-gray border-0">Agenda</Badge>
                  <span className="text-xs text-muted-foreground">Amanhã às 14h</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Webinar: Inteligência Artificial no Mercado Financeiro
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Não perca! Baseado nos seus interesses, este webinar é altamente 
                  recomendado para você.
                </p>
                <Button variant="outline" className="w-full border-pastel-blue hover:bg-pastel-blue hover:text-pastel-dark-gray">
                  <Bell size={14} className="mr-2" />
                  Adicionar Lembrete
                </Button>
              </div>
            </div>
          </div>

          {/* Conquista */}
          <div className="bg-gradient-to-br from-pastel-green/20 to-pastel-blue/20 rounded-xl border-2 border-pastel-dark-gray p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-green/50 text-pastel-dark-gray border-0">Conquista</Badge>
                  <span className="text-xs text-muted-foreground">Novo</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Sequência de 7 dias mantida!
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Você está em uma sequência de estudos de 7 dias consecutivos. 
                  Continue assim para desbloquear a badge "Dedicado"!
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-pastel-green rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-slate-700">7/10 dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Recomendada */}
          <div className="bg-white rounded-xl border-2 border-pastel-dark-gray p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pastel-purple/70 rounded-lg flex items-center justify-center flex-shrink-0">
                <Newspaper className="text-pastel-dark-gray" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-pastel-purple/50 text-pastel-dark-gray border-0">Recomendação</Badge>
                  <Badge className="bg-pastel-blue text-pastel-dark-gray border-0">IA</Badge>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Newsletter "Fintech Weekly" combina com você
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Com base nos seus interesses em inovação financeira e tecnologia, 
                  esta newsletter pode agregar muito valor ao seu aprendizado.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <Users size={12} />
                  <span>2.3k inscritos</span>
                  <span>•</span>
                  <span>Publicação semanal</span>
                </div>
                <Button variant="outline" className="w-full border-pastel-purple hover:bg-pastel-purple hover:text-pastel-dark-gray">
                  Inscrever-se
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};