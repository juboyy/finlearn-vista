import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, Download, Chrome, Star, Home, FileText, Bookmark, Bot, 
  Globe, Linkedin, Slack, MessageSquare, Settings as SettingsIcon,
  Rocket, ChevronDown
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function RecursosAdicionais() {
  const [newTabEnabled, setNewTabEnabled] = useState(true);
  const [summarizeEnabled, setSummarizeEnabled] = useState(true);
  const [quickSaveEnabled, setQuickSaveEnabled] = useState(true);
  const [chatIAEnabled, setChatIAEnabled] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Recursos Adicionais</h1>
              <p className="text-sm text-slate-500 mt-1">Extensões e integrações para potencializar seu aprendizado</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                <Download size={18} />
                <span>Instalar Extensão</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Chrome Extension Hero */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
            <div className="grid grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-blue rounded-full text-sm font-medium text-slate-700 mb-4">
                  <Chrome size={16} />
                  <span>Extensão Chrome</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">FinLearn para Chrome</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Transforme sua navegação em uma experiência de aprendizado contínuo. Acesse conteúdos, resuma páginas e salve links importantes diretamente do seu navegador.
                </p>
                <div className="flex gap-4 mb-6">
                  <button className="px-6 py-3 bg-pastel-blue text-slate-800 rounded-lg font-semibold hover:bg-opacity-80 transition flex items-center gap-2">
                    <Download size={20} />
                    Adicionar ao Chrome
                  </button>
                  <button className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
                    Ver Tutorial
                  </button>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-medium text-slate-700">4.8</span>
                    <span>(2.4k avaliações)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="text-pastel-blue" size={16} />
                    <span className="font-medium text-slate-700">15k+</span>
                    <span>usuários</span>
                  </div>
                </div>
              </div>
              <div className="h-80 bg-slate-100 rounded-xl overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5437747474-aaf6f64cd5be06d31f29.png" 
                  alt="Interface da extensão Chrome para finanças"
                />
              </div>
            </div>
          </section>

          {/* Extension Features */}
          <section className="mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Recursos da Extensão</h2>
                <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Configurar</button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Home className="text-slate-500" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Nova Aba Personalizada</h3>
                      <p className="text-sm text-slate-500">Dashboard com conteúdos relevantes e atalhos</p>
                    </div>
                  </div>
                  <Switch checked={newTabEnabled} onCheckedChange={setNewTabEnabled} />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-slate-500" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Resumo de Páginas</h3>
                      <p className="text-sm text-slate-500">IA resume qualquer artigo ou página da web</p>
                    </div>
                  </div>
                  <Switch checked={summarizeEnabled} onCheckedChange={setSummarizeEnabled} />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Bookmark className="text-slate-500" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Salvamento Rápido</h3>
                      <p className="text-sm text-slate-500">Salve links direto na sua biblioteca</p>
                    </div>
                  </div>
                  <Switch checked={quickSaveEnabled} onCheckedChange={setQuickSaveEnabled} />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Bot className="text-slate-500" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Chat IA Integrado</h3>
                      <p className="text-sm text-slate-500">Acesso rápido aos agentes IA</p>
                    </div>
                  </div>
                  <Switch checked={chatIAEnabled} onCheckedChange={setChatIAEnabled} />
                </div>
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Como Funciona</h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-slate-700">1</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Instale a Extensão</h3>
                <p className="text-sm text-slate-600">Adicione ao Chrome em segundos através da Chrome Web Store</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-slate-700">2</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Faça Login</h3>
                <p className="text-sm text-slate-600">Conecte sua conta FinLearn para sincronizar seus dados</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-slate-700">3</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Personalize</h3>
                <p className="text-sm text-slate-600">Configure widgets, preferências e atalhos do seu jeito</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pastel-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-slate-700">4</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Comece a Usar</h3>
                <p className="text-sm text-slate-600">Aproveite todos os recursos enquanto navega na web</p>
              </div>
            </div>
          </section>

          {/* Integration Cards */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Integrações Disponíveis</h2>
              <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todas</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Google Workspace */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Globe className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Google Workspace</h3>
                      <p className="text-sm text-slate-500">Integração com Drive, Calendar e Gmail</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-pastel-green text-slate-700 text-xs rounded-full font-medium">Conectado</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Salve automaticamente suas notas no Google Drive, sincronize eventos de webinars no Calendar e receba notificações por email.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                    Configurar
                  </button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">
                    Desconectar
                  </button>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Linkedin className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">LinkedIn</h3>
                      <p className="text-sm text-slate-500">Compartilhe conquistas e certificados</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-pastel-green text-slate-700 text-xs rounded-full font-medium">Conectado</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Publique automaticamente seus certificados conquistados e compartilhe artigos salvos com sua rede profissional.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                    Configurar
                  </button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">
                    Desconectar
                  </button>
                </div>
              </div>

              {/* Slack */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Slack className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Slack</h3>
                      <p className="text-sm text-slate-500">Notificações e compartilhamento</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs rounded-full font-medium">Disponível</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Receba notificações de novos conteúdos, webinars e conquistas diretamente no Slack. Compartilhe artigos com seu time.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                    Conectar
                  </button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">
                    Saiba mais
                  </button>
                </div>
              </div>

              {/* Notion */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Notion</h3>
                      <p className="text-sm text-slate-500">Sincronize notas e biblioteca</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs rounded-full font-medium">Disponível</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Exporte suas notas e conteúdos salvos diretamente para o Notion. Mantenha tudo organizado em um único lugar.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                    Conectar
                  </button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">
                    Saiba mais
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Extension Screenshots */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Interface da Extensão</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden border border-slate-200">
                <div className="h-48 bg-slate-100 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d70e7f0c70-45079f0ed42889b73af3.png" 
                    alt="Nova aba do navegador"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-1">Nova Aba</h3>
                  <p className="text-sm text-slate-500">Dashboard personalizado com dados do mercado</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-slate-200">
                <div className="h-48 bg-slate-100 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/594b47eef9-21f374aa1ebfc12becdc.png" 
                    alt="Popup de resumo IA"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-1">Resumo IA</h3>
                  <p className="text-sm text-slate-500">Popup com resumo inteligente de páginas</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-slate-200">
                <div className="h-48 bg-slate-100 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e29c4f3bef-218453cf1c25a069c1cd.png" 
                    alt="Menu de salvamento"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-1">Salvamento</h3>
                  <p className="text-sm text-slate-500">Menu rápido para organizar conteúdos</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <button className="w-full flex items-center justify-between text-left group">
                  <h3 className="font-medium text-slate-800 group-hover:text-slate-900">A extensão consome muita memória do navegador?</h3>
                  <ChevronDown className="text-slate-400" size={20} />
                </button>
                <p className="text-sm text-slate-600 mt-3">
                  Não. A extensão foi otimizada para consumir o mínimo de recursos possível. Ela utiliza aproximadamente 30-50MB de memória, similar a uma aba comum do navegador.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <button className="w-full flex items-center justify-between text-left group">
                  <h3 className="font-medium text-slate-800 group-hover:text-slate-900">Posso usar a extensão sem estar conectado à internet?</h3>
                  <ChevronDown className="text-slate-400" size={20} />
                </button>
                <p className="text-sm text-slate-600 mt-3">
                  Alguns recursos funcionam offline, como visualização de conteúdos salvos anteriormente. No entanto, funcionalidades de IA e sincronização requerem conexão.
                </p>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <button className="w-full flex items-center justify-between text-left group">
                  <h3 className="font-medium text-slate-800 group-hover:text-slate-900">Meus dados são compartilhados com terceiros?</h3>
                  <ChevronDown className="text-slate-400" size={20} />
                </button>
                <p className="text-sm text-slate-600 mt-3">
                  Não. Todos os seus dados são criptografados e armazenados de forma segura. Não compartilhamos informações com terceiros sem seu consentimento explícito.
                </p>
              </div>

              <div className="pb-4">
                <button className="w-full flex items-center justify-between text-left group">
                  <h3 className="font-medium text-slate-800 group-hover:text-slate-900">A extensão está disponível para outros navegadores?</h3>
                  <ChevronDown className="text-slate-400" size={20} />
                </button>
                <p className="text-sm text-slate-600 mt-3">
                  Atualmente a extensão está disponível apenas para Google Chrome. Versões para Firefox e Edge estão em desenvolvimento e serão lançadas em breve.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="bg-pastel-blue rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Rocket className="text-slate-700 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Comece a Usar Hoje</h2>
              <p className="text-slate-600 mb-6">
                Instale a extensão FinLearn e transforme sua experiência de navegação em uma jornada de aprendizado contínuo no mercado financeiro.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="px-6 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2">
                  <Chrome size={20} />
                  Instalar Agora
                </button>
                <button className="px-6 py-3 border-2 border-white text-slate-800 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition">
                  Ver Demonstração
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-4">Gratuito para usuários Premium • Sem cartão de crédito</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
