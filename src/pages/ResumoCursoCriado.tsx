import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Check, BookOpen, DollarSign, CreditCard, Users, Calendar, FileText, Download, Share2, Eye, Star, ShoppingCart, Clock, Award, Globe, Tag, Layers, ChartLine, Gift, Percent, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ResumoCursoCriado() {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/criar-curso/etapa-3" className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Resumo do Curso</h1>
                <p className="text-sm text-muted-foreground mt-1">Revise todas as informacoes antes de publicar</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Visualizar Preview
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
              <Button className="bg-[hsl(var(--pastel-green))] text-foreground hover:opacity-80 gap-2">
                <Check className="w-4 h-4" />
                Publicar Curso
              </Button>
            </div>
          </div>
        </header>

        {/* Success Banner */}
        <div className="bg-[hsl(var(--pastel-green))]/20 border-b border-[hsl(var(--pastel-green))]">
          <div className="px-8 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Cadastro Completo</p>
              <p className="text-sm text-muted-foreground">Todas as informacoes foram preenchidas. Revise e publique seu curso.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="col-span-2 space-y-6">
                {/* Basic Info Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))]/30 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-foreground" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Informacoes Basicas</h2>
                    </div>
                    <Link to="/criar-curso" className="text-sm text-[hsl(var(--pastel-purple))] font-medium hover:underline">
                      Editar
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">Titulo do Curso</label>
                      <p className="font-medium text-foreground mt-1">Domine o Mercado de Capitais em 2025</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Subtitulo</label>
                      <p className="font-medium text-foreground mt-1">Estrategias para iniciantes e intermediarios</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Categoria</label>
                      <p className="font-medium text-foreground mt-1">Investimentos</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Idioma</label>
                      <p className="font-medium text-foreground mt-1">Portugues (Brasil)</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm text-muted-foreground">Descricao</label>
                      <p className="font-medium text-foreground mt-1">
                        Este curso oferece um guia completo sobre o mercado de capitais, 
                        abordando desde conceitos basicos ate estrategias avancadas para maximizar seus investimentos.
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm text-muted-foreground">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="bg-[hsl(var(--pastel-blue))]/30">Renda Fixa</Badge>
                        <Badge variant="secondary" className="bg-[hsl(var(--pastel-blue))]/30">Investimentos</Badge>
                        <Badge variant="secondary" className="bg-[hsl(var(--pastel-blue))]/30">Tesouro Direto</Badge>
                        <Badge variant="secondary" className="bg-[hsl(var(--pastel-blue))]/30">CDB</Badge>
                        <Badge variant="secondary" className="bg-[hsl(var(--pastel-blue))]/30">LCI/LCA</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Structure Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-purple))]/30 rounded-lg flex items-center justify-center">
                        <Layers className="w-5 h-5 text-foreground" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Estrutura do Conteudo</h2>
                    </div>
                    <Link to="/criar-curso/etapa-2" className="text-sm text-[hsl(var(--pastel-purple))] font-medium hover:underline">
                      Editar
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">Modulo 1: Fundamentos do Mercado de Capitais</span>
                      </div>
                      <span className="text-sm text-muted-foreground">4 aulas</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">Modulo 2: Analise de Investimentos</span>
                      </div>
                      <span className="text-sm text-muted-foreground">5 aulas</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">Modulo 3: Gestao de Portfolios</span>
                      </div>
                      <span className="text-sm text-muted-foreground">3 aulas</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">Modulo 4: Derivativos e Opcoes</span>
                      </div>
                      <span className="text-sm text-muted-foreground">4 aulas</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">Modulo 5: Projeto Final</span>
                      </div>
                      <span className="text-sm text-muted-foreground">2 aulas</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-[hsl(var(--pastel-blue))]/20 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">5</p>
                      <p className="text-sm text-muted-foreground">Modulos</p>
                    </div>
                    <div className="text-center p-4 bg-[hsl(var(--pastel-purple))]/20 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">18</p>
                      <p className="text-sm text-muted-foreground">Aulas</p>
                    </div>
                    <div className="text-center p-4 bg-[hsl(var(--pastel-green))]/20 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">~8h</p>
                      <p className="text-sm text-muted-foreground">Duracao</p>
                    </div>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-green))]/30 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-foreground" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Valores e Pagamento</h2>
                    </div>
                    <Link to="/criar-curso/etapa-3" className="text-sm text-[hsl(var(--pastel-purple))] font-medium hover:underline">
                      Editar
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">Estrategia de Precificacao</label>
                      <div className="flex items-center gap-2 mt-2">
                        <DollarSign className="w-4 h-4 text-[hsl(var(--pastel-green))]" />
                        <p className="font-medium text-foreground">Pagamento Unico</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Preco Original</label>
                      <p className="font-medium text-foreground mt-1">R$ 197,00</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Preco Promocional</label>
                      <p className="font-medium text-[hsl(var(--pastel-green))] mt-1">R$ 97,00</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Desconto</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-[hsl(var(--pastel-green))]/30 text-foreground">50% OFF</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <label className="text-sm text-muted-foreground mb-3 block">Formas de Pagamento Aceitas</label>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--pastel-blue))]/20 rounded-lg">
                        <CreditCard className="w-4 h-4 text-foreground" />
                        <span className="text-sm font-medium text-foreground">Cartao de Credito</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--pastel-green))]/20 rounded-lg">
                        <DollarSign className="w-4 h-4 text-foreground" />
                        <span className="text-sm font-medium text-foreground">PIX</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">Parcelamento</label>
                      <p className="font-medium text-foreground mt-1">Ate 12x sem juros</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Politica de Reembolso</label>
                      <p className="font-medium text-foreground mt-1">Garantia de 30 dias</p>
                    </div>
                  </div>
                </div>

                {/* Affiliate Program Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))]/30 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-foreground" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Programa de Afiliados</h2>
                    </div>
                    <Badge className="bg-[hsl(var(--pastel-green))]/30 text-foreground">Ativo</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-muted-foreground">Comissao por Venda</label>
                      <p className="font-medium text-foreground mt-1">30%</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Cookie Duration</label>
                      <p className="font-medium text-foreground mt-1">30 dias</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Pagamento Minimo</label>
                      <p className="font-medium text-foreground mt-1">R$ 100,00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Preview Card */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="aspect-[3/4] bg-gradient-to-br from-[hsl(var(--pastel-blue))]/30 to-[hsl(var(--pastel-purple))]/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Capa do Curso</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">Domine o Mercado de Capitais</h3>
                    <p className="text-sm text-muted-foreground mb-3">Por Joao Silva</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-[hsl(var(--pastel-yellow))]" />
                      <span className="text-sm font-medium text-foreground">4.8</span>
                      <span className="text-sm text-muted-foreground">(128 avaliacoes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">R$ 197,00</span>
                      <span className="text-xl font-bold text-foreground">R$ 97,00</span>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Estatisticas Estimadas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Visualizacoes/mes</span>
                      </div>
                      <span className="font-medium text-foreground">~500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Taxa de conversao</span>
                      </div>
                      <span className="font-medium text-foreground">~3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ChartLine className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Receita estimada</span>
                      </div>
                      <span className="font-medium text-[hsl(var(--pastel-green))]">R$ 1.455/mes</span>
                    </div>
                  </div>
                </div>

                {/* Checklist Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Checklist de Publicacao</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">Informacoes basicas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">Estrutura de conteudo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">Configuracao de precos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">Formas de pagamento</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">Politica de reembolso</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-[hsl(var(--pastel-green))] text-foreground hover:opacity-80 gap-2">
                    <Check className="w-4 h-4" />
                    Publicar E-book
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Baixar Preview PDF
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
