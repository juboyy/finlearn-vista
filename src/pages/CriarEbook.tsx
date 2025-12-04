import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Save, Image, Video, Plus, X, Lightbulb, Check, Book, HelpCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CriarEbook() {
  const [objectives, setObjectives] = useState([
    "Avaliar empresas através de indicadores financeiros",
    "Dominar técnicas de precificação de ativos",
    "Construir carteiras de investimento eficientes",
    "Identificar e mitigar riscos financeiros"
  ]);
  const [requirements, setRequirements] = useState([
    "Conhecimentos básicos de matemática financeira",
    "Noções de economia e finanças"
  ]);
  const [targetAudience, setTargetAudience] = useState([
    "Profissionais do mercado financeiro",
    "Estudantes de economia e administração",
    "Investidores que desejam aprofundar conhecimentos"
  ]);

  const addObjective = () => setObjectives([...objectives, ""]);
  const removeObjective = (index: number) => setObjectives(objectives.filter((_, i) => i !== index));
  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const addRequirement = () => setRequirements([...requirements, ""]);
  const removeRequirement = (index: number) => setRequirements(requirements.filter((_, i) => i !== index));
  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addTarget = () => setTargetAudience([...targetAudience, ""]);
  const removeTarget = (index: number) => setTargetAudience(targetAudience.filter((_, i) => i !== index));
  const updateTarget = (index: number, value: string) => {
    const newTargets = [...targetAudience];
    newTargets[index] = value;
    setTargetAudience(newTargets);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/criar-conteudo" className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Criar Novo E-book</h1>
                <p className="text-sm text-muted-foreground mt-1">Preencha as informações para criar seu e-book</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Rascunho
              </button>
              <button className="px-5 py-2 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed">
                Publicar E-book
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Informações Básicas</h3>
                    <p className="text-xs text-muted-foreground">Título, descrição e categoria</p>
                  </div>
                </div>
                <div className="flex-1 mx-6 h-1 bg-muted rounded-full">
                  <div className="h-full bg-[hsl(var(--pastel-blue))] rounded-full" style={{ width: '33%' }}></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-muted-foreground">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Conteúdo do E-book</h3>
                    <p className="text-xs text-muted-foreground">Capítulos, páginas e materiais</p>
                  </div>
                </div>
                <div className="flex-1 mx-6 h-1 bg-muted rounded-full"></div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-muted-foreground">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Preços e Publicação</h3>
                    <p className="text-xs text-muted-foreground">Valores e formas de pagamento</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Etapa 1 de 3</span>
                <span>33% Completo</span>
              </div>
            </div>
          </div>

          {/* Step 1 Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Main Form Column */}
            <div className="col-span-2 space-y-6">
              {/* Title and Description Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Título e Descrição</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Título do E-book *</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Domine o Mercado de Capitais em 2025" 
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Mínimo 10 caracteres, máximo 100 caracteres</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subtítulo</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Guia completo com certificação internacional" 
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Opcional - Breve resumo do e-book</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Descrição Completa *</label>
                    <textarea 
                      rows={6} 
                      placeholder="Descreva detalhadamente o que os leitores aprenderão neste e-book..." 
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent resize-none"
                    ></textarea>
                    <p className="text-xs text-muted-foreground mt-2">Mínimo 200 caracteres. Use parágrafos para facilitar a leitura.</p>
                  </div>
                </div>
              </div>

              {/* Category Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Categoria e Nível</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Categoria Principal *</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent">
                      <option>Selecione uma categoria</option>
                      <option>Mercado de Capitais</option>
                      <option>Análise de Investimentos</option>
                      <option>Gestão de Portfólios</option>
                      <option>Derivativos</option>
                      <option>Renda Fixa</option>
                      <option>Macroeconomia</option>
                      <option>Análise Técnica</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subcategoria</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent">
                      <option>Selecione uma subcategoria</option>
                      <option>Análise Fundamentalista</option>
                      <option>Valuation</option>
                      <option>Estratégias de Trading</option>
                      <option>Gestão de Risco</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nível do E-book *</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent">
                      <option>Selecione o nível</option>
                      <option>Iniciante</option>
                      <option>Intermediário</option>
                      <option>Avançado</option>
                      <option>Todos os níveis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Idioma *</label>
                    <select className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent">
                      <option>Português (Brasil)</option>
                      <option>Inglês</option>
                      <option>Espanhol</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cover Image Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Imagem de Capa</h2>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[hsl(var(--pastel-blue))] transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-[hsl(var(--pastel-blue))] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Clique para fazer upload ou arraste a imagem</h3>
                  <p className="text-sm text-muted-foreground mb-4">PNG, JPG ou WEBP (Recomendado: 1920x1080px)</p>
                  <button className="px-6 py-2 bg-[hsl(var(--pastel-blue))] text-foreground rounded-lg font-medium hover:opacity-80 transition-opacity">
                    Selecionar Arquivo
                  </button>
                </div>
              </div>

              {/* Introduction Video Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Vídeo de Introdução</h2>
                <p className="text-sm text-muted-foreground mb-4">Adicione um vídeo de apresentação para atrair mais leitores. Este vídeo será exibido na página do e-book.</p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[hsl(var(--pastel-purple))] transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-[hsl(var(--pastel-purple))] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Adicionar vídeo de introdução</h3>
                  <p className="text-sm text-muted-foreground mb-4">MP4, MOV ou AVI (Máximo: 500MB, Duração: 2-5 minutos)</p>
                  <button className="px-6 py-2 bg-[hsl(var(--pastel-purple))] text-foreground rounded-lg font-medium hover:opacity-80 transition-opacity">
                    Selecionar Vídeo
                  </button>
                </div>
              </div>

              {/* Learning Objectives Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">O Que os Leitores Aprenderão</h2>
                <p className="text-sm text-muted-foreground mb-4">Liste os principais objetivos de aprendizado do e-book (mínimo 4 objetivos)</p>
                <div className="space-y-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input 
                        type="text" 
                        placeholder="Ex: Avaliar empresas através de indicadores financeiros" 
                        value={objective}
                        onChange={(e) => updateObjective(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent"
                      />
                      <button 
                        onClick={() => removeObjective(index)}
                        className="p-3 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addObjective}
                  className="mt-4 px-4 py-2 text-[hsl(var(--pastel-blue))] hover:bg-[hsl(var(--pastel-blue))]/20 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Objetivo
                </button>
              </div>

              {/* Requirements Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Requisitos</h2>
                <p className="text-sm text-muted-foreground mb-4">Liste os conhecimentos ou habilidades necessários para o e-book</p>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input 
                        type="text" 
                        placeholder="Ex: Conhecimentos básicos de matemática financeira" 
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent"
                      />
                      <button 
                        onClick={() => removeRequirement(index)}
                        className="p-3 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addRequirement}
                  className="mt-4 px-4 py-2 text-[hsl(var(--pastel-blue))] hover:bg-[hsl(var(--pastel-blue))]/20 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Requisito
                </button>
              </div>

              {/* Target Audience Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Público-Alvo</h2>
                <p className="text-sm text-muted-foreground mb-4">Descreva para quem este e-book é destinado</p>
                <div className="space-y-3">
                  {targetAudience.map((target, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input 
                        type="text" 
                        placeholder="Ex: Profissionais do mercado financeiro" 
                        value={target}
                        onChange={(e) => updateTarget(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent"
                      />
                      <button 
                        onClick={() => removeTarget(index)}
                        className="p-3 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addTarget}
                  className="mt-4 px-4 py-2 text-[hsl(var(--pastel-blue))] hover:bg-[hsl(var(--pastel-blue))]/20 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Público
                </button>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Quick Tips Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))] rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Dicas Rápidas</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Use um título claro e objetivo que descreva o conteúdo do e-book</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>A descrição deve destacar os benefícios e resultados do e-book</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Use uma imagem de capa profissional e atrativa</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Vídeos de introdução aumentam as conversões em até 80%</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Liste objetivos específicos e mensuráveis</p>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Preview do E-book</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">Categoria</span>
                    <h4 className="font-semibold text-foreground mt-2 mb-1">Título do E-book</h4>
                    <p className="text-xs text-muted-foreground mb-3">Subtítulo aparecerá aqui</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>0 leitores</span>
                      <span className="font-semibold text-foreground">R$ 0,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Draft Section */}
              <div className="bg-[hsl(var(--pastel-blue))]/30 rounded-xl border border-[hsl(var(--pastel-blue))] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fa-solid fa-info-circle text-foreground"></i>
                  <h4 className="font-semibold text-foreground">Salvar Progresso</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Suas alterações são salvas automaticamente a cada 30 segundos</p>
                <button className="w-full px-4 py-2 bg-card text-foreground rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Manualmente
                </button>
              </div>

              {/* Help Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Precisa de Ajuda?</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Book className="w-5 h-5" />
                    <span>Guia de Criação de E-books</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Video className="w-5 h-5" />
                    <span>Tutoriais em Vídeo</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>Suporte ao Autor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Link to="/criar-conteudo">
              <button className="px-6 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors flex items-center gap-2">
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar e Sair
              </button>
              <button className="px-6 py-3 bg-[hsl(var(--pastel-blue))] text-foreground rounded-lg font-semibold hover:opacity-80 transition-opacity flex items-center gap-2">
                Próxima Etapa
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-foreground text-lg"></i>
                </div>
                <span className="text-xl font-semibold text-foreground">FinLearn</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Sobre</a>
                <a href="#" className="hover:text-foreground transition-colors">Contato</a>
                <a href="#" className="hover:text-foreground transition-colors">Termos</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 FinLearn. Todos os direitos reservados.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
