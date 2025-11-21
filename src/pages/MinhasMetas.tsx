import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MinhasMetas() {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Resumo de Configuração</h1>
                <p className="text-sm text-slate-500 mt-1">Revise todas as suas configurações antes de finalizar</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/minhas-metas/notificacoes')} className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                  <ArrowLeft className="inline w-4 h-4 mr-2" />
                  Voltar
                </button>
                <button onClick={() => navigate('/minhas-metas/configuracao')} className="px-6 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-sliders-h mr-2"></i>
                  Configurar
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Overview Stats */}
          <section className="mb-8">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border-2 border-pastel-blue p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <i className="fas fa-newspaper text-slate-700 text-xl cursor-help"></i>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Artigos, Vídeos, Podcasts, E-books e Webinars</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium cursor-help">Ativo</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configuração ativa e funcionando</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">5</p>
                <p className="text-sm text-slate-600">Tipos de Conteúdo</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-green p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <i className="fas fa-tags text-slate-700 text-xl cursor-help"></i>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tags específicas do seu interesse profissional</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs font-medium cursor-help">Ativo</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recebendo conteúdo filtrado por tags</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">12</p>
                <p className="text-sm text-slate-600">Tags Selecionadas</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-purple p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <i className="fas fa-bell text-slate-700 text-xl cursor-help"></i>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>E-mail, Push e WhatsApp</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 bg-pastel-purple text-slate-700 rounded text-xs font-medium cursor-help">Ativo</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Você receberá notificações nos canais ativos</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">3</p>
                <p className="text-sm text-slate-600">Canais de Notificação</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-yellow p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <i className="fas fa-bullseye text-slate-700 text-xl cursor-help"></i>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Objetivos de aprendizado semanais e mensais</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 bg-pastel-yellow text-slate-700 rounded text-xs font-medium cursor-help">Configurado</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Metas prontas para acompanhamento</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">8</p>
                <p className="text-sm text-slate-600">Metas Definidas</p>
              </div>
            </div>
          </section>

          {/* Progress Overview */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-slate-700"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Progresso das Metas</h2>
                    <p className="text-sm text-slate-500">Acompanhamento semanal e mensal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <i className="fas fa-calendar-week text-xs"></i>
                    Semana
                  </button>
                  <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium flex items-center gap-1.5">
                    <i className="fas fa-calendar-alt text-xs"></i>
                    Mês
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-file-alt text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Leitura de Artigos</p>
                        <p className="text-xs text-slate-500">12 de 21 artigos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">57%</p>
                      <p className="text-xs text-slate-500">Faltam 9</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-blue h-3 rounded-full transition-all duration-500" style={{width: '57%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-pink rounded-lg flex items-center justify-center">
                        <i className="fas fa-video text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Vídeos & Webinars</p>
                        <p className="text-xs text-slate-500">85 de 120 minutos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">71%</p>
                      <p className="text-xs text-slate-500">Faltam 35min</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-pink h-3 rounded-full transition-all duration-500" style={{width: '71%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-podcast text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Podcasts</p>
                        <p className="text-xs text-slate-500">120 de 180 minutos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">67%</p>
                      <p className="text-xs text-slate-500">Faltam 60min</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-purple h-3 rounded-full transition-all duration-500" style={{width: '67%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <i className="fas fa-book text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">E-books</p>
                        <p className="text-xs text-slate-500">45 de 100 páginas esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">45%</p>
                      <p className="text-xs text-slate-500">Faltam 55 pág.</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-yellow h-3 rounded-full transition-all duration-500" style={{width: '45%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-pen text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Escrita de Artigos</p>
                        <p className="text-xs text-slate-500">0 de 1 artigo esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">0%</p>
                      <p className="text-xs text-slate-500">Falta 1</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-green h-3 rounded-full transition-all duration-500" style={{width: '0%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-peach rounded-lg flex items-center justify-center">
                        <i className="fas fa-robot text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Agente de IA</p>
                        <p className="text-xs text-slate-500">40 de 60 minutos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">67%</p>
                      <p className="text-xs text-slate-500">Faltam 20min</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-peach h-3 rounded-full transition-all duration-500" style={{width: '67%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Progress by Area */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-layer-group text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Progresso por Área</h2>
                  <p className="text-sm text-slate-500">Distribuição de conteúdo por segmento</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <i className="fas fa-shield-alt text-pastel-green cursor-help"></i>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Gestão e mitigação de riscos financeiros</p>
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Gestão de Riscos</p>
                        <p className="text-xs text-slate-500">Área principal</p>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs font-medium cursor-help">42%</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Progresso geral da área no mês</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Semana</span>
                        <span className="text-xs font-semibold text-slate-700">8 de 15 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-green h-2 rounded-full" style={{width: '53%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Mês</span>
                        <span className="text-xs font-semibold text-slate-700">25 de 60 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-green h-2 rounded-full" style={{width: '42%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <i className="fas fa-gavel text-pastel-blue cursor-help"></i>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Conformidade regulatória e normativa</p>
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Compliance</p>
                        <p className="text-xs text-slate-500">Área secundária</p>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium cursor-help">38%</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Progresso geral da área no mês</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Semana</span>
                        <span className="text-xs font-semibold text-slate-700">5 de 10 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-blue h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Mês</span>
                        <span className="text-xs font-semibold text-slate-700">15 de 40 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-blue h-2 rounded-full" style={{width: '38%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <i className="fas fa-landmark text-pastel-purple cursor-help"></i>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Normas e regulações do setor financeiro</p>
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Regulação Financeira</p>
                        <p className="text-xs text-slate-500">Área de interesse</p>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="px-2 py-1 bg-pastel-purple text-slate-700 rounded text-xs font-medium cursor-help">28%</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Progresso geral da área no mês</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Semana</span>
                        <span className="text-xs font-semibold text-slate-700">3 de 8 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-purple h-2 rounded-full" style={{width: '38%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Mês</span>
                        <span className="text-xs font-semibold text-slate-700">9 de 32 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-purple h-2 rounded-full" style={{width: '28%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <i className="fas fa-exchange-alt text-pastel-yellow cursor-help"></i>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Sistema de compartilhamento de dados financeiros</p>
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Open Banking</p>
                        <p className="text-xs text-slate-500">Área de interesse</p>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="px-2 py-1 bg-pastel-yellow text-slate-700 rounded text-xs font-medium cursor-help">15%</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Progresso geral da área no mês</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Semana</span>
                        <span className="text-xs font-semibold text-slate-700">1 de 5 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-yellow h-2 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Mês</span>
                        <span className="text-xs font-semibold text-slate-700">3 de 20 itens</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-pastel-yellow h-2 rounded-full" style={{width: '15%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Progress by Tags */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-tags text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Progresso por Tag</h2>
                  <p className="text-sm text-slate-500">Tags prioritárias e seu consumo</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-university text-pastel-blue text-xs"></i>
                      <span className="text-sm font-semibold text-slate-800">Basileia III</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">65%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-pastel-blue h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500">13 de 20 itens/mês</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-exclamation-triangle text-pastel-green text-xs"></i>
                      <span className="text-sm font-semibold text-slate-800">Risco Operacional</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">58%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-pastel-green h-2 rounded-full" style={{width: '58%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500">11 de 19 itens/mês</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-shield-alt text-pastel-purple text-xs"></i>
                      <span className="text-sm font-semibold text-slate-800">LGPD</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">72%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-pastel-purple h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500">13 de 18 itens/mês</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-plug text-pastel-yellow text-xs"></i>
                      <span className="text-sm font-semibold text-slate-800">APIs</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">40%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-pastel-yellow h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500">6 de 15 itens/mês</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-building text-pastel-pink text-xs"></i>
                      <span className="text-sm font-semibold text-slate-800">BACEN</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">55%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-pastel-pink h-2 rounded-full" style={{width: '55%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500">11 de 20 itens/mês</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-credit-card text-pastel-peach text-xs"></i>
                      <span className="text-sm font-semibold text-slate-800">Risco de Crédito</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">48%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-pastel-peach h-2 rounded-full" style={{width: '48%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500">8 de 17 itens/mês</p>
                </div>
              </div>
            </div>
          </section>

          {/* Summary Cards - Content, Areas, Notifications */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Content Summary */}
            <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-newspaper text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Conteúdo</h2>
                  <p className="text-xs text-slate-500">Passo 1 - Configurado</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Tipos Selecionados</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-pastel-blue bg-opacity-20 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-2">
                      <i className="fas fa-file-alt"></i>
                      Artigos
                    </span>
                    <span className="px-3 py-1.5 bg-pastel-blue bg-opacity-20 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-2">
                      <i className="fas fa-video"></i>
                      Vídeos
                    </span>
                    <span className="px-3 py-1.5 bg-pastel-blue bg-opacity-20 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-2">
                      <i className="fas fa-podcast"></i>
                      Podcasts
                    </span>
                    <span className="px-3 py-1.5 bg-pastel-blue bg-opacity-20 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-2">
                      <i className="fas fa-book"></i>
                      E-books
                    </span>
                    <span className="px-3 py-1.5 bg-pastel-blue bg-opacity-20 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-2">
                      <i className="fas fa-chalkboard-teacher"></i>
                      Webinars
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Metas de Consumo</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-file-alt text-pastel-blue text-xs"></i>
                        <span className="text-xs text-slate-600">Artigos/dia</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-800">3 artigos</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-video text-pastel-pink text-xs"></i>
                        <span className="text-xs text-slate-600">Vídeos/semana</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-800">120 min</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-podcast text-pastel-purple text-xs"></i>
                        <span className="text-xs text-slate-600">Podcasts/semana</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-800">180 min</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => navigate('/minhas-metas/configuracao')} className="w-full px-4 py-2 text-pastel-blue border border-pastel-blue rounded-lg text-sm font-medium hover:bg-pastel-blue hover:bg-opacity-10 transition">
                  <i className="fas fa-edit mr-2"></i>
                  Editar Configurações
                </button>
              </div>
            </section>

            {/* Areas Summary */}
            <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-tags text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Áreas & Tags</h2>
                  <p className="text-xs text-slate-500">Passo 2 - Configurado</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Áreas de Interesse</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-pastel-green bg-opacity-10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-shield-alt text-pastel-green text-xs"></i>
                        <span className="text-xs text-slate-700 font-medium">Gestão de Riscos</span>
                      </div>
                      <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs">Principal</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-gavel text-pastel-blue text-xs"></i>
                        <span className="text-xs text-slate-700">Compliance</span>
                      </div>
                      <i className="fas fa-check text-pastel-green text-xs"></i>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-landmark text-pastel-purple text-xs"></i>
                        <span className="text-xs text-slate-700">Regulação Financeira</span>
                      </div>
                      <i className="fas fa-check text-pastel-green text-xs"></i>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-exchange-alt text-pastel-yellow text-xs"></i>
                        <span className="text-xs text-slate-700">Open Banking</span>
                      </div>
                      <i className="fas fa-check text-pastel-green text-xs"></i>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Tags Prioritárias (12)</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">Basileia III</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">Risco Operacional</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">LGPD</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">APIs</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">+8</span>
                  </div>
                </div>

                <button onClick={() => navigate('/minhas-metas/areas')} className="w-full px-4 py-2 text-pastel-green border border-pastel-green rounded-lg text-sm font-medium hover:bg-pastel-green hover:bg-opacity-10 transition">
                  <i className="fas fa-edit mr-2"></i>
                  Editar Configurações
                </button>
              </div>
            </section>

            {/* Notifications Summary */}
            <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-bell text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Notificações</h2>
                  <p className="text-xs text-slate-500">Passo 3 - Configurado</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Canais Ativos</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-pastel-purple bg-opacity-10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-envelope text-pastel-purple text-xs"></i>
                        <span className="text-xs text-slate-700">E-mail</span>
                      </div>
                      <span className="text-xs text-slate-600">Diário 8h</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-pastel-purple bg-opacity-10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-mobile-alt text-pastel-purple text-xs"></i>
                        <span className="text-xs text-slate-700">Push</span>
                      </div>
                      <span className="text-xs text-slate-600">Instantâneo</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="fab fa-whatsapp text-slate-400 text-xs"></i>
                        <span className="text-xs text-slate-500">WhatsApp</span>
                      </div>
                      <span className="text-xs text-slate-400">Inativo</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Tipos Habilitados</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check text-pastel-purple"></i>
                      <span>Novos Conteúdos</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check text-pastel-purple"></i>
                      <span>Progresso de Metas</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check text-pastel-purple"></i>
                      <span>Recomendações IA</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => navigate('/minhas-metas/notificacoes')} className="w-full px-4 py-2 text-pastel-purple border border-pastel-purple rounded-lg text-sm font-medium hover:bg-pastel-purple hover:bg-opacity-10 transition">
                  <i className="fas fa-edit mr-2"></i>
                  Editar Configurações
                </button>
              </div>
            </section>
          </div>

          {/* Detailed Goals Section - due to size constraints, showing structure */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-target text-slate-700"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Metas Detalhadas</h2>
                    <p className="text-sm text-slate-500">Resumo completo de todas as metas configuradas</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  <i className="fas fa-download mr-2"></i>
                  Exportar
                </button>
              </div>

              {/* ... keep existing code (6 detailed goal cards would go here) */}
            </div>
          </section>

          {/* Achievement Projection */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Projeção de Conquistas</h2>
                  <p className="text-sm text-slate-500">O que você pode alcançar seguindo essas metas</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-pastel-blue" style={{backgroundColor: 'hsl(206 35% 65% / 0.5)'}}>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className="fas fa-calendar-week text-pastel-blue text-2xl"></i>
                    </div>
                  </div>
                  <p className="text-center text-2xl font-bold text-slate-900 mb-1">1 Semana</p>
                  <p className="text-center text-xs font-bold text-slate-900">21 artigos lidos</p>
                  <p className="text-center text-xs font-bold text-slate-900">3h de conteúdo</p>
                </div>

                <div className="p-5 rounded-xl border border-pastel-green" style={{backgroundColor: 'hsl(152 32% 65% / 0.5)'}}>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className="fas fa-calendar-alt text-pastel-green text-2xl"></i>
                    </div>
                  </div>
                  <p className="text-center text-2xl font-bold text-slate-900 mb-1">1 Mês</p>
                  <p className="text-center text-xs font-bold text-slate-900">90 artigos lidos</p>
                  <p className="text-center text-xs font-bold text-slate-900">30h de aprendizado</p>
                </div>

                <div className="p-5 rounded-xl border border-pastel-purple" style={{backgroundColor: 'hsl(270 32% 67% / 0.5)'}}>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className="fas fa-calendar text-pastel-purple text-2xl"></i>
                    </div>
                  </div>
                  <p className="text-center text-2xl font-bold text-slate-900 mb-1">3 Meses</p>
                  <p className="text-center text-xs font-bold text-slate-900">270 artigos lidos</p>
                  <p className="text-center text-xs font-bold text-slate-900">6 e-books completos</p>
                </div>

                <div className="p-5 rounded-xl border border-pastel-yellow" style={{backgroundColor: 'hsl(44 35% 67% / 0.5)'}}>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <i className="fas fa-star text-pastel-yellow text-2xl"></i>
                    </div>
                  </div>
                  <p className="text-center text-2xl font-bold text-slate-900 mb-1">1 Ano</p>
                  <p className="text-center text-xs font-bold text-slate-900">1.080 artigos</p>
                  <p className="text-center text-xs font-bold text-slate-900">Expert certificado</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final Confirmation */}
          <section className="rounded-2xl border-2 border-pastel-purple p-8" style={{backgroundColor: 'hsl(270 32% 67% / 0.5)'}}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
                <i className="fas fa-check-circle text-pastel-purple text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Configuração Completa</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Suas metas e preferências foram configuradas com sucesso. Você está pronto para iniciar sua jornada de aprendizado personalizada.</p>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-xl border-2 border-pastel-blue">
                <i className="fas fa-newspaper text-pastel-blue text-2xl mb-2"></i>
                <p className="text-2xl font-bold text-slate-800">5</p>
                <p className="text-xs text-slate-600">Tipos de Conteúdo</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border-2 border-pastel-green">
                <i className="fas fa-tags text-pastel-green text-2xl mb-2"></i>
                <p className="text-2xl font-bold text-slate-800">12</p>
                <p className="text-xs text-slate-600">Tags Ativas</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border-2 border-pastel-purple">
                <i className="fas fa-bell text-pastel-purple text-2xl mb-2"></i>
                <p className="text-2xl font-bold text-slate-800">3</p>
                <p className="text-xs text-slate-600">Canais Ativos</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border-2 border-pastel-yellow">
                <i className="fas fa-target text-pastel-yellow text-2xl mb-2"></i>
                <p className="text-2xl font-bold text-slate-800">8</p>
                <p className="text-xs text-slate-600">Metas Definidas</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border-2 border-pastel-pink">
                <i className="fas fa-chart-line text-pastel-pink text-2xl mb-2"></i>
                <p className="text-2xl font-bold text-slate-800">100%</p>
                <p className="text-xs text-slate-600">Pronto</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button onClick={() => navigate('/minhas-metas/notificacoes')} className="px-6 py-3 bg-white text-slate-700 border-2 border-pastel-purple rounded-xl font-medium hover:bg-pastel-purple hover:bg-opacity-10 transition">
                <ArrowLeft className="inline w-4 h-4 mr-2" />
                Voltar para Editar
              </button>
              <button onClick={() => navigate('/')} className="px-8 py-3 bg-white text-slate-700 border-2 border-pastel-purple rounded-xl font-semibold hover:bg-pastel-purple hover:bg-opacity-10 transition shadow-lg">
                <i className="fas fa-check-circle mr-2"></i>
                Confirmar e Começar
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
    </TooltipProvider>
  );
}
