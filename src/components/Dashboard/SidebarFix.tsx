import { Home, Newspaper, Bot, GraduationCap, Book, MessageCircle, Store, TrendingUp, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Conteúdo", href: "/conteudo", icon: Newspaper },
  { name: "Agentes IA", href: "/agentes", icon: Bot, subRoutes: ["/meus-agentes", "/criar-agente"] },
  { name: "Aprendizado", href: "/aprendizado", icon: GraduationCap },
  { name: "Biblioteca", href: "/biblioteca", icon: Book },
  { name: "Comunidade", href: "/comunidade", icon: MessageCircle },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Autores", href: "/autores", icon: Users },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

interface SidebarFixProps {
  defaultCollapsed?: boolean;
}

export const SidebarFix = ({ defaultCollapsed = false }: SidebarFixProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  return (
    <aside className={`bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <>
              <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="text-sidebar-primary-foreground" size={20} />
              </div>
              <span className="text-xl font-semibold text-sidebar-foreground">FinLearn</span>
            </>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center mx-auto">
              <TrendingUp className="text-sidebar-primary-foreground" size={20} />
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground hover:bg-sidebar-primary/80 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto sidebar-scroll">
        {navigation.map((item) => {
          const isSubRoute = item.subRoutes?.some(route => location.pathname === route);
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${
                isSubRoute ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : ""
              } ${isCollapsed ? "justify-center" : ""}`}
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed ? (
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
        ) : (
          <div className="flex justify-center">
            <img 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
