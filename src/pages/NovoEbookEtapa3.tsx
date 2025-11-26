import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Plus, HelpCircle, Trash2, Check, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

interface FAQ {
  question: string;
  answer: string;
}

export default function NovoEbookEtapa3() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
  }, [productId]);

  const loadProductData = async () => {
    if (!productId) return;
    
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      
      if (error) throw error;
      
      setProductData(data);
      if (data.faqs && Array.isArray(data.faqs)) {
        setFaqs(data.faqs as unknown as FAQ[]);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do produto.",
        variant: "destructive"
      });
    }
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSaveDraft = async () => {
    if (!productId) return;
    
    try {
      const { error } = await supabase
        .from("products")
        .update({
          faqs: faqs as any,
          updated_at: new Date().toISOString()
        })
        .eq("id", productId);
      
      if (error) throw error;
      
      toast({
        title: "Rascunho salvo",
        description: "Suas alterações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o rascunho.",
        variant: "destructive"
      });
    }
  };

  const handlePublish = async () => {
    if (!productId) return;
    
    setIsPublishing(true);
    try {
      const { error } = await supabase
        .from("products")
        .update({
          faqs: faqs as any,
          status: "published",
          updated_at: new Date().toISOString()
        })
        .eq("id", productId);
      
      if (error) throw error;
      
      toast({
        title: "Produto publicado",
        description: "Seu eBook foi publicado com sucesso!",
      });
      
      setTimeout(() => {
        navigate("/marketplace");
      }, 2000);
    } catch (error) {
      console.error("Error publishing:", error);
      toast({
        title: "Erro ao publicar",
        description: "Não foi possível publicar o produto.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const completionPercentage = () => {
    let completed = 0;
    const total = 1; // FAQs only for now
    
    if (faqs.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Criar Novo eBook</h1>
                  <p className="text-sm text-muted-foreground mt-1">Etapa 3 de 3 - Revisão e Publicação</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Rascunho
                </Button>
                <Button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isPublishing ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Indicator */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 max-w-3xl w-full">
              {/* Step 1 */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-semibold">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Informações Básicas</p>
                  <p className="text-xs text-muted-foreground">Completo</p>
                </div>
              </div>
              
              <div className="w-16 h-0.5 bg-foreground"></div>
              
              {/* Step 2 */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-semibold">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Conteúdo e Arquivos</p>
                  <p className="text-xs text-muted-foreground">Completo</p>
                </div>
              </div>
              
              <div className="w-16 h-0.5 bg-foreground"></div>
              
              {/* Step 3 */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Revisão e Publicação</p>
                  <p className="text-xs text-muted-foreground">Em andamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              
              {/* Product Review Summary */}
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Resumo do Produto</h3>
                
                {productData && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-[hsl(207,35%,92%)] rounded-lg">
                      <div className="w-20 h-28 bg-[hsl(142,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                        {productData.cover_image_url ? (
                          <img src={productData.cover_image_url} alt="Capa" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-xs text-muted-foreground text-center px-2">Sem capa</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-lg mb-1">{productData.title}</h4>
                        {productData.subtitle && (
                          <p className="text-sm text-muted-foreground mb-3">{productData.subtitle}</p>
                        )}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Categoria:</span>
                            <span className="ml-2 font-medium text-foreground">{productData.category}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Idioma:</span>
                            <span className="ml-2 font-medium text-foreground">{productData.language}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Preço:</span>
                            <span className="ml-2 font-medium text-foreground">
                              {productData.is_free ? "Gratuito" : `R$ ${productData.price}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <span className="ml-2 font-medium text-foreground">{productData.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FAQs Section */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Perguntas Frequentes</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Adicione perguntas e respostas para esclarecer dúvidas dos compradores
                    </p>
                  </div>
                  <Button onClick={addFaq} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar Pergunta
                  </Button>
                </div>

                {faqs.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">Nenhuma pergunta adicionada ainda</p>
                    <p className="text-xs text-muted-foreground">Clique em "Adicionar Pergunta" para começar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-border rounded-lg p-6 bg-accent/5">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Pergunta {index + 1}
                              </label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => updateFaq(index, "question", e.target.value)}
                                placeholder="Digite a pergunta aqui..."
                                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Resposta
                              </label>
                              <textarea
                                value={faq.answer}
                                onChange={(e) => updateFaq(index, "answer", e.target.value)}
                                placeholder="Digite a resposta aqui..."
                                rows={4}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => removeFaq(index)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Final Checks */}
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Checklist de Publicação</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                    <input type="checkbox" checked readOnly className="w-5 h-5 text-primary border-border rounded" />
                    <span className="text-sm text-foreground">Informações básicas preenchidas</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                    <input type="checkbox" checked readOnly className="w-5 h-5 text-primary border-border rounded" />
                    <span className="text-sm text-foreground">Capa e arquivo principal enviados</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                    <input type="checkbox" checked={faqs.length > 0} readOnly className="w-5 h-5 text-primary border-border rounded" />
                    <span className="text-sm text-foreground">FAQs adicionados (opcional mas recomendado)</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Progress Card */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Progresso da Etapa 3</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Completude</span>
                        <span className="text-sm font-semibold text-foreground">{completionPercentage()}%</span>
                      </div>
                      <div className="h-2 bg-accent rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[hsl(142,35%,65%)] transition-all duration-500" 
                          style={{ width: `${completionPercentage()}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          faqs.length > 0 ? "border-[hsl(142,35%,50%)] bg-[hsl(142,35%,50%)]" : "border-border"
                        }`}>
                          {faqs.length > 0 && <Check className="w-3 h-3 text-background" />}
                        </div>
                        <span className={`text-sm ${faqs.length > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                          Perguntas Frequentes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Card */}
                <div className="bg-[hsl(270,35%,92%)] rounded-xl border border-border p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <HelpCircle className="w-5 h-5 text-[hsl(215,20%,40%)] flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-semibold text-foreground">Precisa de Ajuda?</h3>
                  </div>
                  <p className="text-sm text-foreground mb-4">
                    Nossa equipe está pronta para auxiliar com qualquer dúvida sobre a publicação.
                  </p>
                  <Button variant="default" className="w-full gap-2">
                    Falar com Suporte
                  </Button>
                </div>

              </div>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between max-w-7xl">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/novo-ebook/etapa-2?productId=${productId}`)}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para Etapa 2
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                Salvar e Sair
              </Button>
              <Button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="gap-2"
              >
                {isPublishing ? "Publicando..." : "Publicar eBook"}
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">© 2025 FinLearn. Todos os direitos reservados.</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
