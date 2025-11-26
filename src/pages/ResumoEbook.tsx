import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Star, CreditCard, Barcode, Clock, Check, Share2, Bookmark, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

export default function ResumoEbook() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Error loading product:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do produto.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!productId) return;
    
    try {
      const { error } = await supabase
        .from("products")
        .update({ status: "published" })
        .eq("id", productId);
      
      if (error) throw error;
      
      toast({
        title: "Sucesso!",
        description: "eBook publicado com sucesso na plataforma.",
      });
      
      navigate("/marketplace");
    } catch (error) {
      console.error("Error publishing:", error);
      toast({
        title: "Erro ao publicar",
        description: "Não foi possível publicar o eBook.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <SidebarFix />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando resumo...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Resumo do Produto</h1>
                  <p className="text-sm text-muted-foreground mt-1">Visualização final antes da publicação</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Voltar para Edição
                </Button>
                <Button onClick={handlePublish}>
                  Publicar na Plataforma
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Preview Notice */}
            <div className="mb-8 bg-[hsl(207,35%,92%)] border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-[hsl(207,35%,45%)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Preview do Produto</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta é uma visualização de como seu eBook será exibido para os usuários na plataforma. 
                    Todas as informações podem ser editadas antes da publicação final.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              
              {/* Main Content - Product Display */}
              <div className="col-span-2 space-y-6">
                
                {/* Product Hero Section */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="grid grid-cols-2 gap-8 p-8">
                    {/* Product Cover */}
                    <div className="aspect-[3/4] bg-[hsl(142,35%,85%)] rounded-lg border border-border flex items-center justify-center overflow-hidden">
                      {productData?.cover_image_url ? (
                        <img 
                          src={productData.cover_image_url} 
                          alt={productData.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-8">
                          <div className="text-8xl text-muted-foreground mb-4">📚</div>
                          <p className="text-sm text-muted-foreground">Capa do eBook</p>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-[hsl(207,35%,92%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">
                            {productData?.category || "Mercado Financeiro"}
                          </span>
                          <span className="px-3 py-1 bg-[hsl(142,35%,85%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">
                            {productData?.product_type || "eBook"}
                          </span>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                          {productData?.title || "Título do eBook"}
                        </h2>
                        
                        {productData?.subtitle && (
                          <p className="text-lg text-muted-foreground mb-4">{productData.subtitle}</p>
                        )}

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-5 h-5 fill-[hsl(48,85%,60%)] text-[hsl(48,85%,60%)]" />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">4.8 (127 avaliações)</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm text-muted-foreground mb-2">Por: {productData?.author_name || "Autor"}</p>
                          <p className="text-sm text-muted-foreground">{productData?.credentials || "Especialista em Mercado Financeiro"}</p>
                        </div>

                        <p className="text-sm text-foreground leading-relaxed mb-6">
                          {productData?.short_description || "Descrição do produto será exibida aqui."}
                        </p>

                        {productData?.tags && productData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {productData.tags.map((tag: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-accent/25 text-foreground text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Price and Action */}
                      <div className="border-t border-border pt-6">
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Preço</p>
                            <p className="text-4xl font-bold text-foreground">
                              R$ {productData?.price ? parseFloat(productData.price).toFixed(2) : "97,00"}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">ou 12x de R$ {productData?.price ? (parseFloat(productData.price) / 12).toFixed(2) : "8,08"}</p>
                          </div>
                        </div>
                        
                        <Button className="w-full gap-2 h-12 text-base" size="lg">
                          <ShoppingCart className="w-5 h-5" />
                          Adicionar ao Carrinho
                        </Button>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1 gap-2">
                            <Bookmark className="w-4 h-4" />
                            Salvar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 gap-2">
                            <Share2 className="w-4 h-4" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Formas de Pagamento Aceitas</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-[hsl(142,35%,85%)] rounded-lg">
                      <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Cartão de Crédito</p>
                        <p className="text-sm text-muted-foreground">Até 12x sem juros</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-[hsl(207,35%,92%)] rounded-lg">
                      <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                        <Barcode className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">PIX</p>
                        <p className="text-sm text-muted-foreground">Aprovação imediata</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-accent/[0.125] rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Opções de Parcelamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">À vista no PIX</span>
                        <span className="font-semibold text-foreground">R$ {productData?.price ? parseFloat(productData.price).toFixed(2) : "97,00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">3x sem juros</span>
                        <span className="font-medium text-foreground">3x de R$ {productData?.price ? (parseFloat(productData.price) / 3).toFixed(2) : "32,33"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">6x sem juros</span>
                        <span className="font-medium text-foreground">6x de R$ {productData?.price ? (parseFloat(productData.price) / 6).toFixed(2) : "16,17"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">12x sem juros</span>
                        <span className="font-medium text-foreground">12x de R$ {productData?.price ? (parseFloat(productData.price) / 12).toFixed(2) : "8,08"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Description */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Sobre este eBook</h3>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {productData?.long_description || productData?.short_description || "Descrição completa do produto será exibida aqui com todos os detalhes sobre o conteúdo, objetivos de aprendizado e benefícios para o leitor."}
                  </p>
                </div>

                {/* Target Audience */}
                {productData?.target_audience && productData.target_audience.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Público-Alvo</h3>
                    <div className="flex flex-wrap gap-3">
                      {productData.target_audience.map((audience: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 px-4 py-2 bg-accent/25 rounded-lg">
                          <Check className="w-4 h-4 text-[hsl(142,50%,45%)]" />
                          <span className="text-sm font-medium text-foreground">{audience}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {productData?.faqs && productData.faqs.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Perguntas Frequentes</h3>
                    <div className="space-y-4">
                      {productData.faqs.map((faq: any, index: number) => (
                        <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                          <h4 className="text-base font-semibold text-foreground mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar */}
              <div className="col-span-1">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Quick Info */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Informações Rápidas</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Acesso Imediato</p>
                          <p className="text-xs text-muted-foreground">Após confirmação do pagamento</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Download Disponível</p>
                          <p className="text-xs text-muted-foreground">PDF de alta qualidade</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Garantia de 7 dias</p>
                          <p className="text-xs text-muted-foreground">100% de reembolso</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Sobre o Autor</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 rounded-full bg-[hsl(207,35%,92%)] flex items-center justify-center text-2xl font-bold text-foreground">
                        {productData?.author_name?.charAt(0) || "A"}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{productData?.author_name || "Autor"}</p>
                        <p className="text-xs text-muted-foreground">127 produtos publicados</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-4">
                      {productData?.credentials || "Especialista em Mercado Financeiro"}
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      Ver Perfil Completo
                    </Button>
                  </div>

                  {/* Platform Trust */}
                  <div className="bg-[hsl(142,35%,85%)] rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Compra Segura</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[hsl(142,50%,35%)]" />
                        <span className="text-foreground">Pagamento 100% seguro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[hsl(142,50%,35%)]" />
                        <span className="text-foreground">Certificado SSL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[hsl(142,50%,35%)]" />
                        <span className="text-foreground">Dados criptografados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[hsl(142,50%,35%)]" />
                        <span className="text-foreground">Garantia de reembolso</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

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
