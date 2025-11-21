import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, Save, Play, Plus, Info, Zap, GitBranch, Braces, Send,
  Globe, Mail, Share2, Clock, Sliders, Eye, Wand2, BarChart3,
  Newspaper, Video, GraduationCap, Book, Gavel, Box, Sparkles, Users,
  Store, Award, ArrowDown, Minus, ArrowUp, MessageSquare, Smartphone,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NovaNotificacao() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/notificacoes">
                <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition">
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Nova Notificação</h1>
                <p className="text-sm text-slate-500 mt-1">Configure alertas personalizados para sua jornada de aprendizado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/notificacoes">
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                  Cancelar
                </button>
              </Link>
              <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                Salvar Notificação
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Informações Básicas */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <Info className="text-slate-700" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Informações Básicas</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome da Notificação</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Alertas de Mercado Diários" 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700 mb-3">Fluxo de Notificação</label>
                    
                    <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-6 min-h-[400px]">
                      <div className="space-y-4">
                        {/* Trigger Block */}
                        <div className="bg-white rounded-lg border-2 border-pastel-blue p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                              <Zap className="text-slate-700" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-slate-500 uppercase">Gatilho</p>
                              <p className="text-sm font-semibold text-slate-800">Quando acontecer</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/></svg>
                            </button>
                          </div>
                          <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                            <option value="">Selecione um gatilho</option>
                            <option>Novo artigo publicado</option>
                            <option>Webinar agendado</option>
                            <option>Curso disponível</option>
                            <option>Regulamentação atualizada</option>
                            <option>Certificado emitido</option>
                            <option>Comentário recebido</option>
                          </select>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-0.5 h-6 bg-slate-300"></div>
                        </div>

                        {/* Condition Block */}
                        <div className="bg-white rounded-lg border-2 border-pastel-yellow p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                              <GitBranch className="text-slate-700" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-slate-500 uppercase">Condição</p>
                              <p className="text-sm font-semibold text-slate-800">Se a condição for verdadeira</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/></svg>
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <select className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-yellow focus:border-transparent">
                              <option>Categoria</option>
                              <option>Prioridade</option>
                              <option>Horário</option>
                              <option>Dia da semana</option>
                            </select>
                            <select className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-yellow focus:border-transparent">
                              <option>é igual a</option>
                              <option>é diferente de</option>
                              <option>contém</option>
                              <option>maior que</option>
                              <option>menor que</option>
                            </select>
                            <input 
                              type="text" 
                              placeholder="Valor" 
                              className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-yellow focus:border-transparent"
                            />
                          </div>
                          <button className="mt-2 text-xs text-pastel-yellow hover:text-slate-700 font-medium">
                            <Plus size={14} className="inline mr-1" />
                            Adicionar condição
                          </button>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-0.5 h-6 bg-slate-300"></div>
                        </div>

                        {/* Variables Block */}
                        <div className="bg-white rounded-lg border-2 border-pastel-purple p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                              <Braces className="text-slate-700" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-slate-500 uppercase">Variáveis</p>
                              <p className="text-sm font-semibold text-slate-800">Personalizar mensagem</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/></svg>
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-pastel-purple bg-opacity-20 rounded text-xs font-mono text-slate-700">{'{{nome_usuario}}'}</span>
                              <span className="px-2 py-1 bg-pastel-purple bg-opacity-20 rounded text-xs font-mono text-slate-700">{'{{titulo_conteudo}}'}</span>
                              <span className="px-2 py-1 bg-pastel-purple bg-opacity-20 rounded text-xs font-mono text-slate-700">{'{{data_evento}}'}</span>
                              <span className="px-2 py-1 bg-pastel-purple bg-opacity-20 rounded text-xs font-mono text-slate-700">{'{{link_acesso}}'}</span>
                            </div>
                            <button className="text-xs text-pastel-purple hover:text-slate-700 font-medium">
                              <Plus size={14} className="inline mr-1" />
                              Adicionar variável
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-0.5 h-6 bg-slate-300"></div>
                        </div>

                        {/* Action Block */}
                        <div className="bg-white rounded-lg border-2 border-pastel-green p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                              <Send className="text-slate-700" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-slate-500 uppercase">Ação</p>
                              <p className="text-sm font-semibold text-slate-800">Enviar notificação</p>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/></svg>
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1">Canais</label>
                              <div className="flex flex-wrap gap-2">
                                <button className="px-3 py-1.5 bg-pastel-blue bg-opacity-20 border border-pastel-blue rounded-lg text-xs font-medium text-slate-700 hover:bg-opacity-30">
                                  <Globe size={12} className="inline mr-1" />
                                  Web
                                </button>
                                <button className="px-3 py-1.5 bg-pastel-green bg-opacity-20 border border-pastel-green rounded-lg text-xs font-medium text-slate-700 hover:bg-opacity-30">
                                  <Mail size={12} className="inline mr-1" />
                                  Email
                                </button>
                                <button className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200">
                                  <MessageSquare size={12} className="inline mr-1" />
                                  WhatsApp
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1">Mensagem</label>
                              <textarea 
                                rows={2} 
                                placeholder="Olá {{nome_usuario}}, novo conteúdo disponível: {{titulo_conteudo}}" 
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-green focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-300">
                        <div className="flex items-center justify-between">
                          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <Plus size={16} />
                            Adicionar Bloco
                          </button>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200">
                              <Play size={16} className="inline mr-2" />
                              Testar Fluxo
                            </button>
                            <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80">
                              <Save size={16} className="inline mr-2" />
                              Salvar Workflow
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-800">Arraste os blocos para reorganizar o fluxo. Use variáveis para personalizar mensagens dinamicamente.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                    <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                      <option value="">Selecione uma categoria</option>
                      <option>Conteúdo e Artigos</option>
                      <option>Eventos e Webinars</option>
                      <option>Cursos e Trilhas</option>
                      <option>Análises de Mercado</option>
                      <option>Regulamentações</option>
                      <option>Novos Produtos</option>
                      <option>Comunidade</option>
                      <option>Sistema</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Prioridade</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="p-3 rounded-lg border border-slate-200 hover:border-pastel-green hover:bg-pastel-green hover:bg-opacity-10 transition text-center">
                        <ArrowDown size={16} className="text-slate-500 mb-1 mx-auto" />
                        <p className="text-sm font-medium text-slate-700">Baixa</p>
                      </button>
                      <button className="p-3 rounded-lg border-2 border-pastel-yellow bg-pastel-yellow bg-opacity-10 transition text-center">
                        <Minus size={16} className="text-slate-700 mb-1 mx-auto" />
                        <p className="text-sm font-medium text-slate-700">Média</p>
                      </button>
                      <button className="p-3 rounded-lg border border-slate-200 hover:border-pastel-pink hover:bg-pastel-pink hover:bg-opacity-10 transition text-center">
                        <ArrowUp size={16} className="text-slate-500 mb-1 mx-auto" />
                        <p className="text-sm font-medium text-slate-700">Alta</p>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Canais de Envio */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Share2 className="text-slate-700" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Canais de Envio</h2>
                </div>

                <div className="space-y-3">
                  {/* Web */}
                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                          <Globe className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">Notificação Web</h3>
                          <p className="text-sm text-slate-500">Alertas no navegador</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                    </div>
                    <div className="pl-13 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Som de notificação</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Badge de contador</span>
                      </label>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                          <Mail className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">Email</h3>
                          <p className="text-sm text-slate-500">joao.silva@empresa.com.br</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                    </div>
                    <div className="pl-13">
                      <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-green focus:border-transparent">
                        <option>Envio imediato</option>
                        <option>Resumo a cada hora</option>
                        <option>Resumo diário (9h)</option>
                        <option>Resumo semanal</option>
                      </select>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                          <MessageSquare className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">WhatsApp</h3>
                          <p className="text-sm text-slate-500">+55 11 98765-4321</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                    </div>
                    <div className="pl-13 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Apenas alertas prioritários</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                        <span>Incluir link de acesso rápido</span>
                      </label>
                    </div>
                  </div>

                  {/* Mobile App */}
                  <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                          <Smartphone className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">App Mobile</h3>
                          <p className="text-sm text-slate-500">iPhone 14 Pro</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gatilhos de Conteúdo */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <Zap className="text-slate-700" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Gatilhos de Conteúdo</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Newspaper size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Novos Artigos</span>
                      </div>
                      <p className="text-sm text-slate-500">Análises de mercado, tendências e notícias relevantes</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Video size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Webinars e Eventos</span>
                      </div>
                      <p className="text-sm text-slate-500">Transmissões ao vivo e eventos agendados</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Novos Cursos</span>
                      </div>
                      <p className="text-sm text-slate-500">Cursos e trilhas de aprendizado lançadas</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Book size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">eBooks e Guias</span>
                      </div>
                      <p className="text-sm text-slate-500">Materiais de apoio e guias práticos</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Gavel size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Regulamentações</span>
                      </div>
                      <p className="text-sm text-slate-500">Atualizações normativas do Bacen, CVM e CMN</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Box size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Novos Produtos</span>
                      </div>
                      <p className="text-sm text-slate-500">Lançamentos de ferramentas e recursos</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Novas Funcionalidades</span>
                      </div>
                      <p className="text-sm text-slate-500">Melhorias e novos recursos da plataforma</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Atividades da Comunidade</span>
                      </div>
                      <p className="text-sm text-slate-500">Discussões, comentários e menções</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Store size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Ofertas do Marketplace</span>
                      </div>
                      <p className="text-sm text-slate-500">Promoções e novos produtos disponíveis</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Award size={18} className="text-slate-600" />
                        <span className="font-medium text-slate-800">Certificações</span>
                      </div>
                      <p className="text-sm text-slate-500">Certificados prontos e conquistas</p>
                    </div>
                  </label>
                </div>
              </section>

              {/* Agendamento */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center">
                    <Clock className="text-slate-700" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Agendamento</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Quando notificar</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-lg border-2 border-pastel-green bg-pastel-green bg-opacity-10 text-left">
                        <Zap size={20} className="text-slate-700 mb-2" />
                        <p className="font-medium text-slate-800">Imediato</p>
                        <p className="text-xs text-slate-500 mt-1">Notificar assim que acontecer</p>
                      </button>
                      <button className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 text-left">
                        <Clock size={20} className="text-slate-700 mb-2" />
                        <p className="font-medium text-slate-800">Agendado</p>
                        <p className="text-xs text-slate-500 mt-1">Definir horários específicos</p>
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Horário de Silêncio</h3>
                      <p className="text-sm text-slate-500">Não enviar notificações durante este período</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Das</label>
                      <input 
                        type="time" 
                        defaultValue="22:00" 
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Até</label>
                      <input 
                        type="time" 
                        defaultValue="07:00" 
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Dias da semana</label>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 font-medium text-sm text-slate-700">Dom</button>
                      <button className="flex-1 py-2.5 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 font-medium text-sm text-slate-700">Seg</button>
                      <button className="flex-1 py-2.5 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 font-medium text-sm text-slate-700">Ter</button>
                      <button className="flex-1 py-2.5 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 font-medium text-sm text-slate-700">Qua</button>
                      <button className="flex-1 py-2.5 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 font-medium text-sm text-slate-700">Qui</button>
                      <button className="flex-1 py-2.5 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 font-medium text-sm text-slate-700">Sex</button>
                      <button className="flex-1 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 font-medium text-sm text-slate-600">Sáb</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Configurações Avançadas */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                    <Sliders className="text-slate-700" size={20} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">Configurações Avançadas</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Modo Resumo</h3>
                      <p className="text-sm text-slate-500">Agrupar várias notificações em um único envio</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Filtro Inteligente</h3>
                      <p className="text-sm text-slate-500">IA filtra notificações baseado em suas preferências</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">Marcar como Lido</h3>
                      <p className="text-sm text-slate-500">Automaticamente após visualização</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Som de Notificação</label>
                    <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                      <option>Padrão</option>
                      <option>Suave</option>
                      <option>Alerta</option>
                      <option>Campainha</option>
                      <option>Silencioso</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Expiração</label>
                    <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                      <option>Nunca</option>
                      <option>Após 24 horas</option>
                      <option>Após 7 dias</option>
                      <option>Após 30 dias</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="col-span-1 space-y-6">
              {/* Prévia */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye size={18} className="text-slate-600" />
                  <h3 className="font-semibold text-slate-800">Prévia</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 mb-1">FinLearn</p>
                        <p className="text-sm text-slate-700 mb-1">Alertas de Mercado Diários</p>
                        <p className="text-xs text-slate-500">Análise completa do mercado financeiro hoje</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 mb-2">EMAIL</div>
                    <div className="bg-white p-3 rounded border border-slate-200">
                      <p className="text-xs font-semibold text-slate-800 mb-2">Alertas de Mercado Diários</p>
                      <p className="text-xs text-slate-600 leading-relaxed">Análise completa do mercado financeiro hoje, incluindo principais movimentações...</p>
                      <button className="mt-3 w-full py-1.5 bg-pastel-blue text-slate-700 rounded text-xs font-medium">Ver Detalhes</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-pastel-green bg-opacity-20 border border-pastel-green">
                    <div className="text-xs text-slate-500 mb-2">WHATSAPP</div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1">
                        <svg className="w-3 h-3 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
                        <p className="text-xs font-semibold text-slate-800">FinLearn</p>
                      </div>
                      <p className="text-xs text-slate-700 mb-2">Alertas de Mercado Diários</p>
                      <p className="text-xs text-slate-600">Análise completa disponível</p>
                      <div className="flex items-center gap-1 mt-2">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                        <p className="text-xs text-blue-600">Acessar agora</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Templates */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 size={18} className="text-slate-600" />
                  <h3 className="font-semibold text-slate-800">Templates</h3>
                </div>

                <div className="space-y-2">
                  <button className="w-full p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
                    <p className="text-sm font-medium text-slate-800">Análise Diária</p>
                    <p className="text-xs text-slate-500 mt-1">Email + WhatsApp</p>
                  </button>
                  <button className="w-full p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
                    <p className="text-sm font-medium text-slate-800">Eventos Importantes</p>
                    <p className="text-xs text-slate-500 mt-1">Todos os canais</p>
                  </button>
                  <button className="w-full p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">
                    <p className="text-sm font-medium text-slate-800">Resumo Semanal</p>
                    <p className="text-xs text-slate-500 mt-1">Email apenas</p>
                  </button>
                </div>
              </section>

              {/* Estatísticas */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={18} className="text-slate-600" />
                  <h3 className="font-semibold text-slate-800">Estatísticas</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Canais ativos</span>
                    <span className="text-sm font-semibold text-slate-800">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Gatilhos</span>
                    <span className="text-sm font-semibold text-slate-800">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Frequência</span>
                    <span className="text-sm font-semibold text-slate-800">Diária</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
