import { Home, Newspaper, Bot, GraduationCap, Book, MessageCircle, Store, TrendingUp, Users, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Conteúdo", href: "/conteudo", icon: Newspaper },
  { name: "Agentes IA", href: "/agentes", icon: Bot },
  { name: "Aprendizado", href: "/aprendizado", icon: GraduationCap },
  { name: "Biblioteca", href: "/biblioteca", icon: Book },
  { name: "Comunidade", href: "/comunidade", icon: MessageCircle },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Autores", href: "/autores", icon: Users },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

export const SidebarMeusAgentes = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="text-sidebar-primary-foreground" size={20} />
          </div>
          <span className="text-xl font-semibold text-sidebar-foreground">FinLearn</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto sidebar-scroll">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <img 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">João Silva</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">Premium</p>
          </div>
          <button className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};
