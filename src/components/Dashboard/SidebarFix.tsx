import { Home, Newspaper, Bot, Mail, GraduationCap, Book, MessageCircle, Store, TrendingUp, Users, Settings, ChevronDown, User, CreditCard, Target, Bookmark, Calendar, ChevronLeft } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Conteúdo", href: "/conteudo", icon: Newspaper },
  { name: "Agentes IA", href: "/agentes", icon: Bot },
  { name: "Newsletter", href: "/newsletter", icon: Mail },
  { name: "Aprendizado", href: "/aprendizado", icon: GraduationCap },
  { name: "Biblioteca", href: "/biblioteca", icon: Book },
  { name: "Comunidade", href: "/comunidade", icon: MessageCircle },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Creators", href: "/autores", icon: Users },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

export const SidebarFix = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-sidebar dark:bg-sidebar border-r border-sidebar-border dark:border-sidebar-border flex flex-col h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className={`p-4 pb-5 border-b border-sidebar-border dark:border-sidebar-border flex items-center relative ${collapsed ? 'justify-center px-2' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-sidebar-primary-foreground" size={20} />
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">FinLearn</span>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="text-sidebar-primary-foreground" size={20} />
          </div>
        )}
        {!collapsed && (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent p-1.5 rounded-lg transition-colors"
              title="Recolher sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
      </div>
      
      {collapsed && (
        <div className="p-2 flex flex-col items-center gap-2 border-b border-sidebar-border dark:border-sidebar-border">
          <ThemeToggle />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent p-1.5 rounded-lg transition-colors"
            title="Expandir sidebar"
          >
            <ChevronLeft className="rotate-180" size={18} />
          </button>
        </div>
      )}
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto sidebar-scroll">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={`flex items-center gap-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${collapsed ? 'justify-center px-2' : 'px-4'}`}
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
            title={collapsed ? item.name : undefined}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      
      <div className="border-t border-sidebar-border dark:border-sidebar-border">
        {!collapsed && (
          <div className="p-4">
            <div className="flex items-center gap-3 px-4 py-3">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png" 
                alt="User" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Aristóteles</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">Premium</p>
              </div>
              <button 
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
              >
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${settingsOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="p-4 flex justify-center">
            <img 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png" 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-sidebar-primary transition-all"
              onClick={() => setCollapsed(false)}
              title="Expandir para ver menu"
            />
          </div>
        )}
        
        {settingsOpen && !collapsed && (
          <div className="px-4 pb-4 space-y-1">
            <Link to="/minhas-metas" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors text-sm">
              <Target size={16} />
              <span>Minhas Metas</span>
            </Link>
            <Link to="/ler-depois" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors text-sm">
              <Bookmark size={16} />
              <span>Itens Salvos</span>
            </Link>
            <Link to="/minha-agenda" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors text-sm">
              <Calendar size={16} />
              <span>Minha Agenda</span>
            </Link>
            <Link to="/assinaturas" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors text-sm">
              <CreditCard size={16} />
              <span>Assinaturas</span>
            </Link>
            <Link to="/minha-conta" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors text-sm">
              <User size={16} />
              <span>Minha Conta</span>
            </Link>
            <Link to="/configuracoes" className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors text-sm">
              <Settings size={16} />
              <span>Configurações</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
