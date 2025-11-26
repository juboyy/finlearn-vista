import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Shield, Monitor, Clock, Palette, Languages, Plus, Smartphone, Key, Fingerprint, Mail, Laptop, Tablet, LogOut, Calendar, CalendarDays, Sun, Moon, SunMoon, MoreVertical, Newspaper, Chrome, Download, Settings, BarChart3 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { useNavigate } from "react-router-dom";
import { UserPreferencesForm } from "@/components/UserPreferencesForm";
export default function Configuracoes() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("seguranca");
  const securityRef = useFadeInOnScroll<HTMLElement>();
  const notificationsRef = useFadeInOnScroll<HTMLElement>();
  const sessionsRef = useFadeInOnScroll<HTMLElement>();
  const remindersRef = useFadeInOnScroll<HTMLElement>();
  const appearanceRef = useFadeInOnScroll<HTMLElement>();
  const pluginRef = useFadeInOnScroll<HTMLElement>();
  const languageRef = useFadeInOnScroll<HTMLElement>();
  const preferencesRef = useFadeInOnScroll<HTMLElement>();
  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const refs = {
      seguranca: securityRef,
      notificacoes: notificationsRef,
      sessoes: sessionsRef,
      lembretes: remindersRef,
      aparencia: appearanceRef,
      plugin: pluginRef,
      idioma: languageRef,
      preferencias: preferencesRef
    };
    const targetRef = refs[section as keyof typeof refs];
    if (targetRef?.current) {
      const titleElement = targetRef.current.querySelector('h2');
      if (titleElement) {
        titleElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const refs = [{
      ref: securityRef,
      id: 'seguranca'
    }, {
      ref: notificationsRef,
      id: 'notificacoes'
    }, {
      ref: sessionsRef,
      id: 'sessoes'
    }, {
      ref: remindersRef,
      id: 'lembretes'
    }, {
      ref: appearanceRef,
      id: 'aparencia'
    }, {
      ref: pluginRef,
      id: 'plugin'
    }, {
      ref: languageRef,
      id: 'idioma'
    }, {
      ref: preferencesRef,
      id: 'preferencias'
    }];
    refs.forEach(({
      ref
    }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return () => {
      refs.forEach(({
        ref
      }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  return <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Configurações</h1>
              <p className="text-sm text-slate-500 mt-1">Gerencie suas preferências e segurança</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-24">
              <nav className="space-y-1">
                <button onClick={() => scrollToSection("seguranca")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "seguranca" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Shield size={20} />
                  <span>Segurança</span>
                </button>
                <button onClick={() => scrollToSection("notificacoes")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "notificacoes" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Bell size={20} />
                  <span>Notificações</span>
                </button>
                <button onClick={() => scrollToSection("sessoes")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "sessoes" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Monitor size={20} />
                  <span>Sessões</span>
                </button>
                <button onClick={() => scrollToSection("lembretes")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "lembretes" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Clock size={20} />
                  <span>Lembretes</span>
                </button>
                <button onClick={() => scrollToSection("aparencia")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "aparencia" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Palette size={20} />
                  <span>Aparência</span>
                </button>
                <button onClick={() => scrollToSection("plugin")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "plugin" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Chrome size={20} />
                  <span>Browser - Plugin</span>
                </button>
                <button onClick={() => scrollToSection("idioma")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "idioma" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Languages size={20} />
                  <span>Idioma</span>
                </button>
                <button onClick={() => scrollToSection("preferencias")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${activeSection === "preferencias" ? "bg-pastel-blue text-slate-800 font-medium" : "text-slate-600 hover:bg-slate-100 transition"}`}>
                  <Settings size={20} />
                  <span>Preferências de Recomendação</span>
                </button>
              </nav>
            </div>

            <div className="col-span-3 space-y-6">
              <section ref={securityRef} data-section="seguranca" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <Shield className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Segurança da Conta</h2>
                    <p className="text-sm text-slate-500">Proteja sua conta com autenticação adicional</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <Smartphone className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Autenticação de Dois Fatores</h3>
                        <p className="text-sm text-slate-500">Adicione uma camada extra de segurança</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <Key className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Senha</h3>
                        <p className="text-sm text-slate-500">Última alteração há 45 dias</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                      Alterar Senha
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Fingerprint className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Login Biométrico</h3>
                        <p className="text-sm text-slate-500">Use impressão digital ou reconhecimento facial</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </div>
                </div>
              </section>

              <section ref={notificationsRef} data-section="notificacoes" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                      <Bell className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">Notificações Simplificadas



  </h2>
                      <p className="text-sm text-slate-500">Escolha como deseja ser notificado</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                    <Plus size={18} />
                    <span>Nova Notificação</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                          <Mail className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">Notificações por Email</h3>
                          <p className="text-sm text-slate-500">Receba atualizações no seu email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                    </div>
                    <div className="pl-14 space-y-3">
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Novos conteúdos e artigos</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Próximos webinars e eventos</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                        <span>Atualizações de cursos</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                        <span>Ofertas e promoções</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                          <Smartphone className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">Notificações Push</h3>
                          <p className="text-sm text-slate-500">Alertas em tempo real no navegador</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                    </div>
                    <div className="pl-14 space-y-3">
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Mensagens e comentários</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" defaultChecked />
                        <span>Início de eventos ao vivo</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                        <span>Lembretes de estudo</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center">
                        <Newspaper className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Resumo Semanal</h3>
                        <p className="text-sm text-slate-500">Receba um resumo das atividades toda semana</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </div>
                </div>
              </section>

              <section ref={sessionsRef} data-section="sessoes" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Monitor className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Sessões Ativas</h2>
                    <p className="text-sm text-slate-500">Gerencie seus dispositivos conectados</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Laptop className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-slate-800">Windows - Chrome</h3>
                            <span className="px-2 py-0.5 bg-pastel-green text-slate-700 text-xs rounded-full">Atual</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-1">São Paulo, Brasil</p>
                          <p className="text-xs text-slate-400">Último acesso: Agora</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 mb-1">iPhone 14 - Safari</h3>
                          <p className="text-sm text-slate-500 mb-1">São Paulo, Brasil</p>
                          <p className="text-xs text-slate-400">Último acesso: Há 2 horas</p>
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                        Encerrar
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Tablet className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 mb-1">iPad Pro - Safari</h3>
                          <p className="text-sm text-slate-500 mb-1">Rio de Janeiro, Brasil</p>
                          <p className="text-xs text-slate-400">Último acesso: Há 1 dia</p>
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                        Encerrar
                      </button>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition">
                  <LogOut className="inline mr-2" size={18} />
                  Encerrar Todas as Outras Sessões
                </button>
              </section>

              <section ref={remindersRef} data-section="lembretes" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                      <Clock className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">Lembretes de Estudo</h2>
                      <p className="text-sm text-slate-500">Configure quando deseja ser lembrado</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    <Plus className="inline mr-2" size={18} />
                    Novo Lembrete
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <Calendar className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Lembrete Diário</h3>
                        <p className="text-sm text-slate-500">Todos os dias às 09:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <CalendarDays className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Revisão Semanal</h3>
                        <p className="text-sm text-slate-500">Domingos às 19:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Bell className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Webinar Reminder</h3>
                        <p className="text-sm text-slate-500">30 minutos antes do evento</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                      </label>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section ref={appearanceRef} data-section="aparencia" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                    <Palette className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Aparência</h2>
                    <p className="text-sm text-slate-500">Personalize a interface da plataforma</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-800 mb-4">Tema</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="p-4 rounded-lg border-2 border-pastel-blue bg-pastel-blue bg-opacity-10 text-center">
                        <Sun className="text-slate-700 mx-auto mb-2" size={24} />
                        <p className="text-sm font-medium text-slate-800">Claro</p>
                      </button>
                      <button className="p-4 rounded-lg border border-slate-200 text-center hover:border-slate-300">
                        <Moon className="text-slate-700 mx-auto mb-2" size={24} />
                        <p className="text-sm font-medium text-slate-800">Escuro</p>
                      </button>
                      <button className="p-4 rounded-lg border border-slate-200 text-center hover:border-slate-300">
                        <SunMoon className="text-slate-700 mx-auto mb-2" size={24} />
                        <p className="text-sm font-medium text-slate-800">Automático</p>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section ref={pluginRef} data-section="plugin" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Chrome className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Browser - Plugin</h2>
                    <p className="text-sm text-slate-500">Extensão para Google Chrome</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-lg border border-slate-200 bg-slate-50">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                        <Chrome className="text-slate-700" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-2">Plugin para Google Chrome</h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Acesse rapidamente seus conteúdos favoritos, receba notificações em tempo real e aproveite recursos exclusivos diretamente no seu navegador.
                        </p>
                        <button onClick={() => navigate("/recursos-adicionais")} className="px-6 py-3 bg-pastel-purple text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                          <Download size={18} />
                          <span>Instalar Plugin</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-3">Recursos do Plugin</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pastel-purple rounded-full"></div>
                        <span>Acesso rápido aos seus conteúdos salvos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pastel-purple rounded-full"></div>
                        <span>Notificações em tempo real de novos artigos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pastel-purple rounded-full"></div>
                        <span>Salvar páginas da web para ler depois</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pastel-purple rounded-full"></div>
                        <span>Sincronização automática com sua conta</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section ref={languageRef} data-section="idioma" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                    <Languages className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Idioma e Região</h2>
                    <p className="text-sm text-slate-500">Configure seu idioma preferido</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Idioma da Interface</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                      <option selected>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </section>

              <section ref={preferencesRef} data-section="preferencias" className="bg-white rounded-xl border border-slate-200 p-6 opacity-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                      <Settings className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">Preferências de Recomendação</h2>
                      <p className="text-sm text-slate-500">Personalize suas recomendações de conteúdo</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/user-preferences-analytics')}
                    className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                  >
                    <BarChart3 size={18} />
                    <span>Ver Analytics</span>
                  </button>
                </div>

                <UserPreferencesForm />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>;
}