import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, X, Podcast, GraduationCap, Bot, Book, Video, Newspaper, TrendingUp, FileText, FlaskConical, FileBarChart, PieChart, FileCheck, Presentation, Radio } from "lucide-react";
import { Link } from "react-router-dom";

export default function CriarConteudo() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex-none">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/meus-conteudos" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Criar Conteúdo</h1>
                <p className="text-xs text-muted-foreground">Escolha o tipo de conteúdo que deseja criar</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with Background Blur Effect */}
        <main className="flex-1 overflow-y-auto bg-muted/30 relative">
          {/* Background blur overlay */}
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm z-10"></div>

          {/* Background Content (blurred) */}
          <div className="max-w-[1200px] mx-auto px-8 py-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Central de Criação</h2>
                <p className="text-muted-foreground">Gerencie e crie novos materiais para sua audiência no mercado financeiro.</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--pastel-blue))]/30 flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-[hsl(var(--success-foreground))] bg-[hsl(var(--success-light))] px-2 py-1 rounded-full">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">24</h3>
                <p className="text-sm text-muted-foreground">Artigos Publicados</p>
              </div>
              <div className="bg-card p-5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--pastel-purple))]/30 flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <Podcast className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-[hsl(var(--success-foreground))] bg-[hsl(var(--success-light))] px-2 py-1 rounded-full">+4%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">8</h3>
                <p className="text-sm text-muted-foreground">Podcasts Gravados</p>
              </div>
              <div className="bg-card p-5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--pastel-green))]/30 flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">0%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">15</h3>
                <p className="text-sm text-muted-foreground">Análises Técnicas</p>
              </div>
              <div className="bg-card p-5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--pastel-orange))]/30 flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <i className="fa-solid fa-users text-xl"></i>
                  </div>
                  <span className="text-xs font-medium text-[hsl(var(--success-foreground))] bg-[hsl(var(--success-light))] px-2 py-1 rounded-full">+28%</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">1.2k</h3>
                <p className="text-sm text-muted-foreground">Leitores Ativos</p>
              </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold text-foreground">Publicações Recentes</h3>
                <button className="text-sm text-muted-foreground hover:text-foreground">Ver tudo</button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Tendências de Pagamentos Digitais 2025</h4>
                        <p className="text-xs text-muted-foreground">Artigo • Publicado em 12 Out</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[hsl(var(--success-light))] text-[hsl(var(--success-foreground))]">Publicado</span>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                        <Podcast className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Podcast #42: Regulação do Open Finance</h4>
                        <p className="text-xs text-muted-foreground">Podcast • Rascunho</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[hsl(var(--warning-light))] text-[hsl(var(--warning-foreground))]">Rascunho</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Overlay - Centered Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Card */}
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl relative border border-border animate-fade-in overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-card sticky top-0 z-10">
                <h2 className="text-lg font-bold text-foreground">O que você deseja criar?</h2>
                <Link to="/meus-conteudos">
                  <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </Link>
              </div>

              {/* Modal Body: Options List */}
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Option 1: Podcast */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(280,45%,65%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Podcast className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Podcast</h3>
                      <p className="text-xs text-muted-foreground">Grave ou faça upload de áudios sobre o mercado.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 2: Cursos */}
                  <Link to="/criar-curso" className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(48,60%,88%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Cursos</h3>
                      <p className="text-xs text-muted-foreground">Estruture módulos e aulas para ensino financeiro.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </Link>

                  {/* Option 3: Avatar IA */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(210,50%,65%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-foreground">Avatar IA</h3>
                        <span className="bg-[hsl(var(--pastel-blue))]/20 text-[hsl(var(--pastel-gray-dark))] text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">Beta</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Gere vídeos com apresentadores virtuais.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 4: E-books */}
                  <Link to="/novo-ebook" className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(45,60%,75%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Book className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">E-books</h3>
                      <p className="text-xs text-muted-foreground">Publique livros digitais e guias completos.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </Link>

                  {/* Option 5: Webinars */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(340,50%,70%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Video className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Webinars</h3>
                      <p className="text-xs text-muted-foreground">Agende transmissões ao vivo para sua rede.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 6: Artigos */}
                  <Link to="/novo-artigo" className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(200,40%,68%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Artigos</h3>
                      <p className="text-xs text-muted-foreground">Escreva análises e notícias do setor.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </Link>

                  {/* Option 7: Análises */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(150,45%,65%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Análises</h3>
                      <p className="text-xs text-muted-foreground">Compartilhe gráficos e projeções técnicas.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 8: Relatórios */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(260,50%,72%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <FileBarChart className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Relatórios</h3>
                      <p className="text-xs text-muted-foreground">Crie relatórios detalhados e análises completas.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 9: Newspaper */}
                  <Link to="/novo-documento" className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(350,55%,75%)] border border-border text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Newspaper</h3>
                      <p className="text-xs text-muted-foreground">Upload de PDFs, planilhas e relatórios.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </Link>

                  {/* Option 10: Estudos Acadêmicos */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(30,50%,68%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <FlaskConical className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Estudos Acadêmicos</h3>
                      <p className="text-xs text-muted-foreground">Publique teses e pesquisas aprofundadas.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 11: Infográficos */}
                  <Link to="/criar-infografico" className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(170,45%,70%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <PieChart className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Infográficos</h3>
                      <p className="text-xs text-muted-foreground">Crie visualizações gráficas impactantes.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </Link>

                  {/* Option 12: Whitepapers */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(220,48%,65%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Whitepapers</h3>
                      <p className="text-xs text-muted-foreground">Crie documentos técnicos e pesquisas detalhadas.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>

                  {/* Option 13: Apresentações */}
                  <Link to="/editor-slides" className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(90,50%,72%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Presentation className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Apresentações</h3>
                      <p className="text-xs text-muted-foreground">Desenvolva slides profissionais com ajuda da IA.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </Link>

                  {/* Option 14: Live */}
                  <button className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border text-left">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(10,52%,70%)] text-[hsl(var(--pastel-gray-dark))] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                      <Radio className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-0.5">Live</h3>
                      <p className="text-xs text-muted-foreground">Transmissões ao vivo com sua audiência.</p>
                    </div>
                    <div className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <i className="fa-solid fa-chevron-right text-sm"></i>
                    </div>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border bg-muted/30 flex justify-center rounded-b-2xl">
                <p className="text-xs text-muted-foreground">Selecione uma opção para iniciar o editor</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
