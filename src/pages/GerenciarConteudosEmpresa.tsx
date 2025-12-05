import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Mic, BookOpen, Video, FileText, BarChart3, FileSpreadsheet, GraduationCap, Image, FileCheck, Presentation, Radio, MessageSquare, Bot, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

interface ContentType {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  enabled: boolean;
  description: string;
}

const GerenciarConteudosEmpresa = () => {
  const navigate = useNavigate();
  
  const [contentTypes, setContentTypes] = useState<ContentType[]>([
    { id: "podcast", name: "Podcasts", icon: <Mic className="w-5 h-5" />, count: 12, enabled: true, description: "Episódios de áudio sobre mercado financeiro" },
    { id: "ebook", name: "E-books", icon: <BookOpen className="w-5 h-5" />, count: 8, enabled: true, description: "Livros digitais e guias completos" },
    { id: "webinar", name: "Webinars", icon: <Video className="w-5 h-5" />, count: 5, enabled: true, description: "Apresentações ao vivo e gravadas" },
    { id: "artigo", name: "Artigos", icon: <FileText className="w-5 h-5" />, count: 45, enabled: true, description: "Artigos e análises escritas" },
    { id: "analise", name: "Análises", icon: <BarChart3 className="w-5 h-5" />, count: 23, enabled: false, description: "Análises técnicas e fundamentalistas" },
    { id: "relatorio", name: "Relatórios", icon: <FileSpreadsheet className="w-5 h-5" />, count: 15, enabled: true, description: "Relatórios detalhados de mercado" },
    { id: "curso", name: "Cursos", icon: <GraduationCap className="w-5 h-5" />, count: 3, enabled: true, description: "Cursos completos com certificação" },
    { id: "infografico", name: "Infográficos", icon: <Image className="w-5 h-5" />, count: 18, enabled: false, description: "Visualizações e dados gráficos" },
    { id: "whitepaper", name: "Whitepapers", icon: <FileCheck className="w-5 h-5" />, count: 6, enabled: true, description: "Documentos técnicos aprofundados" },
    { id: "apresentacao", name: "Apresentações", icon: <Presentation className="w-5 h-5" />, count: 10, enabled: false, description: "Slides e apresentações executivas" },
    { id: "live", name: "Lives", icon: <Radio className="w-5 h-5" />, count: 4, enabled: true, description: "Transmissões ao vivo" },
    { id: "entrevista", name: "Entrevistas", icon: <MessageSquare className="w-5 h-5" />, count: 7, enabled: true, description: "Entrevistas com especialistas" },
    { id: "avatar-ia", name: "Avatar IA", icon: <Bot className="w-5 h-5" />, count: 2, enabled: false, description: "Conteúdos gerados por IA" },
    { id: "newspaper", name: "Newspapers", icon: <Newspaper className="w-5 h-5" />, count: 20, enabled: true, description: "Notícias e atualizações diárias" },
    { id: "estudo", name: "Estudos Acadêmicos", icon: <GraduationCap className="w-5 h-5" />, count: 9, enabled: false, description: "Pesquisas e estudos acadêmicos" },
  ]);

  const toggleContentType = (id: string) => {
    setContentTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, enabled: !type.enabled } : type
      )
    );
  };

  const enabledCount = contentTypes.filter(t => t.enabled).length;
  const totalContent = contentTypes.reduce((acc, t) => acc + t.count, 0);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border/40 bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/configurar-pagina-empresa")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Gerenciar Conteúdos</h1>
              <p className="text-xs text-muted-foreground">Configure quais tipos de conteúdo exibir na página da empresa</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <Badge variant="secondary" className="bg-pastel-blue/20 text-pastel-gray-dark">
              {enabledCount} tipos ativos
            </Badge>
            <Badge variant="secondary" className="bg-pastel-green/20 text-pastel-gray-dark">
              {totalContent} conteúdos totais
            </Badge>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {contentTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 rounded-xl border transition-all ${
                  type.enabled 
                    ? "bg-card border-pastel-green/30" 
                    : "bg-muted/30 border-border/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    type.enabled ? "bg-pastel-blue/20" : "bg-muted"
                  }`}>
                    <span className={type.enabled ? "text-pastel-blue" : "text-muted-foreground"}>
                      {type.icon}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${type.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                        {type.name}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          type.enabled 
                            ? "bg-pastel-orange/20 text-pastel-gray-dark" 
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {type.count} itens
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {type.description}
                    </p>
                  </div>

                  {/* Toggle */}
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${type.enabled ? "text-pastel-green" : "text-muted-foreground"}`}>
                      {type.enabled ? "Ativo" : "Inativo"}
                    </span>
                    <Switch
                      checked={type.enabled}
                      onCheckedChange={() => toggleContentType(type.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-card/50 p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {enabledCount} de {contentTypes.length} tipos de conteúdo ativos
            </p>
            <Button 
              className="bg-pastel-purple hover:bg-pastel-purple/80 text-white"
              onClick={() => navigate("/configurar-pagina-empresa")}
            >
              Salvar Configurações
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GerenciarConteudosEmpresa;
