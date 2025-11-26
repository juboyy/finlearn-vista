import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Plus, Save, ArrowRight, Lightbulb, ClipboardCheck, Headset, Book, GraduationCap, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function NovoEbook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productType: 'ebook',
    title: '',
    subtitle: '',
    category: '',
    subcategory: '',
    targetAudience: [] as string[],
    tags: '',
    language: 'pt-br',
    shortDescription: '',
    authorName: '',
    coAuthors: [] as string[],
    credentials: ''
  });

  const [titleLength, setTitleLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [tagsCount, setTagsCount] = useState(0);
  const [coAuthorInput, setCoAuthorInput] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'title') setTitleLength(value.length);
    if (field === 'shortDescription') setDescLength(value.length);
    if (field === 'tags') setTagsCount(value.split(',').filter((t: string) => t.trim()).length);
  };

  const handleTargetAudienceToggle = (audience: string) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter(a => a !== audience)
        : [...prev.targetAudience, audience]
    }));
  };

  const addCoAuthor = () => {
    if (coAuthorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        coAuthors: [...prev.coAuthors, coAuthorInput.trim()]
      }));
      setCoAuthorInput('');
    }
  };

  const removeCoAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coAuthors: prev.coAuthors.filter((_, i) => i !== index)
    }));
  };

  const getFilledFieldsCount = () => {
    let count = 0;
    if (formData.productType) count++;
    if (formData.title.trim()) count++;
    if (formData.category) count++;
    if (formData.targetAudience.length > 0) count++;
    if (formData.tags.trim()) count++;
    if (formData.language) count++;
    if (formData.shortDescription.trim()) count++;
    if (formData.authorName.trim()) count++;
    if (formData.credentials.trim()) count++;
    return count;
  };

  const filledCount = getFilledFieldsCount();
  const totalRequired = 9;
  const progressPercentage = (filledCount / totalRequired) * 100;

  const handleSaveDraft = async () => {
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          product_type: formData.productType,
          title: formData.title,
          subtitle: formData.subtitle || null,
          category: formData.category,
          subcategory: formData.subcategory || null,
          target_audience: formData.targetAudience,
          tags: tagsArray,
          language: formData.language,
          short_description: formData.shortDescription,
          author_name: formData.authorName,
          co_authors: formData.coAuthors,
          credentials: formData.credentials,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success("Rascunho salvo com sucesso!");
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error("Erro ao salvar rascunho");
    }
  };

  const handleNextStep = async () => {
    if (filledCount < totalRequired) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          product_type: formData.productType,
          title: formData.title,
          subtitle: formData.subtitle || null,
          category: formData.category,
          subcategory: formData.subcategory || null,
          target_audience: formData.targetAudience,
          tags: tagsArray,
          language: formData.language,
          short_description: formData.shortDescription,
          author_name: formData.authorName,
          co_authors: formData.coAuthors,
          credentials: formData.credentials,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success("Etapa 1 concluída!");
      // Navigate to step 2 (to be created)
    } catch (error) {
      console.error('Error saving:', error);
      toast.error("Erro ao salvar");
    }
  };

  const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t).slice(0, 10);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/aprendizado" className="p-2 text-muted-foreground hover:bg-accent/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Cadastro de Produto</h1>
                  <p className="text-sm text-muted-foreground mt-1">Complete as informações em 3 etapas simples</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveDraft}
                  className="px-6 py-2 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors"
                >
                  Salvar Rascunho
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Progress Section */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-semibold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Informações Básicas</h3>
                      <p className="text-sm text-muted-foreground">Dados essenciais do produto</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-semibold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">Conteúdo e Detalhes</h3>
                      <p className="text-sm text-muted-foreground">Descrição completa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-semibold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">Precificação e Arquivos</h3>
                      <p className="text-sm text-muted-foreground">Finalização</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-foreground transition-all duration-500" style={{ width: '33.33%' }}></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full flex justify-between -mt-1">
                    <div className="w-4 h-4 bg-foreground rounded-full border-4 border-card"></div>
                    <div className="w-4 h-4 bg-muted rounded-full border-4 border-card"></div>
                    <div className="w-4 h-4 bg-muted rounded-full border-4 border-card"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-3 gap-8">
                {/* Form Content */}
                <div className="col-span-2">
                  <div className="bg-card rounded-xl border border-border p-8">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                      <div className="w-12 h-12 bg-[hsl(206,35%,85%)] rounded-lg flex items-center justify-center">
                        <Book className="w-6 h-6 text-[hsl(215,20%,40%)]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">Etapa 1: Informações Básicas</h2>
                        <p className="text-sm text-muted-foreground mt-1">Preencha os dados essenciais do seu produto</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Product Type */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">Tipo de Produto *</label>
                        <div className="grid grid-cols-3 gap-4">
                          <label className="relative cursor-pointer">
                            <input 
                              type="radio" 
                              name="product-type" 
                              value="ebook" 
                              checked={formData.productType === 'ebook'}
                              onChange={(e) => handleInputChange('productType', e.target.value)}
                              className="peer sr-only" 
                            />
                            <div className="border-2 border-border rounded-lg p-4 text-center hover:border-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-[hsl(206,35%,85%)]">
                              <Book className="w-8 h-8 text-[hsl(215,20%,40%)] mx-auto mb-2" />
                              <p className="font-medium text-foreground text-sm">eBook</p>
                            </div>
                          </label>
                          <label className="relative cursor-pointer">
                            <input 
                              type="radio" 
                              name="product-type" 
                              value="course"
                              onChange={(e) => handleInputChange('productType', e.target.value)}
                              className="peer sr-only"
                            />
                            <div className="border-2 border-border rounded-lg p-4 text-center hover:border-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-[hsl(206,35%,85%)]">
                              <GraduationCap className="w-8 h-8 text-[hsl(215,20%,40%)] mx-auto mb-2" />
                              <p className="font-medium text-foreground text-sm">Curso</p>
                            </div>
                          </label>
                          <label className="relative cursor-pointer">
                            <input 
                              type="radio" 
                              name="product-type" 
                              value="template"
                              onChange={(e) => handleInputChange('productType', e.target.value)}
                              className="peer sr-only"
                            />
                            <div className="border-2 border-border rounded-lg p-4 text-center hover:border-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-[hsl(206,35%,85%)]">
                              <FileText className="w-8 h-8 text-[hsl(215,20%,40%)] mx-auto mb-2" />
                              <p className="font-medium text-foreground text-sm">Template</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Título do Produto *
                          <span className="text-xs font-normal text-muted-foreground ml-2">(Seja claro e descritivo)</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Ex: Guia Completo de Meios de Pagamento no Brasil" 
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          maxLength={80}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-muted-foreground">Use entre 40-80 caracteres para melhor visibilidade</p>
                          <span className={`text-xs ${titleLength > 80 ? 'text-destructive' : 'text-muted-foreground'}`}>{titleLength}/80</span>
                        </div>
                      </div>

                      {/* Subtitle */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subtítulo
                          <span className="text-xs font-normal text-muted-foreground ml-2">(Opcional)</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Ex: Da Adquirência ao Open Banking - Tudo que você precisa saber" 
                          value={formData.subtitle}
                          onChange={(e) => handleInputChange('subtitle', e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <p className="text-xs text-muted-foreground mt-2">Complemente o título com informações adicionais</p>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Categoria Principal *</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="payment-methods">Meios de Pagamento</option>
                          <option value="capital-markets">Mercado de Capitais</option>
                          <option value="financial-regulation">Regulação Financeira</option>
                          <option value="risk-management">Gestão de Riscos</option>
                          <option value="compliance">Compliance</option>
                          <option value="open-banking">Open Banking</option>
                          <option value="credit-analysis">Análise de Crédito</option>
                          <option value="treasury">Tesouraria</option>
                          <option value="investment-funds">Fundos de Investimento</option>
                          <option value="financial-planning">Planejamento Financeiro</option>
                        </select>
                      </div>

                      {/* Subcategory */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subcategoria
                          <span className="text-xs font-normal text-muted-foreground ml-2">(Opcional)</span>
                        </label>
                        <select 
                          value={formData.subcategory}
                          onChange={(e) => handleInputChange('subcategory', e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Selecione uma subcategoria</option>
                          <option value="acquiring">Adquirência</option>
                          <option value="cards">Cartões</option>
                          <option value="pix">PIX</option>
                          <option value="wallets">Carteiras Digitais</option>
                          <option value="banking-as-service">Banking as a Service</option>
                        </select>
                      </div>

                      {/* Target Audience */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">Público-Alvo *</label>
                        <div className="space-y-3">
                          {[
                            { value: 'beginners', label: 'Iniciantes', desc: 'Profissionais entrando no mercado financeiro' },
                            { value: 'intermediate', label: 'Intermediários', desc: 'Profissionais com experiência básica' },
                            { value: 'advanced', label: 'Avançados', desc: 'Especialistas e gestores sêniores' },
                            { value: 'all-levels', label: 'Todos os Níveis', desc: 'Conteúdo aplicável para qualquer experiência' }
                          ].map((audience) => (
                            <label 
                              key={audience.value}
                              className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors"
                            >
                              <input 
                                type="checkbox" 
                                checked={formData.targetAudience.includes(audience.value)}
                                onChange={() => handleTargetAudienceToggle(audience.value)}
                                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                              />
                              <div>
                                <p className="font-medium text-foreground text-sm">{audience.label}</p>
                                <p className="text-xs text-muted-foreground">{audience.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Tags (Palavras-chave) *
                          <span className="text-xs font-normal text-muted-foreground ml-2">(Separadas por vírgula)</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Ex: pagamentos, adquirência, bandeiras, regulação, PIX" 
                          value={formData.tags}
                          onChange={(e) => handleInputChange('tags', e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-muted-foreground">Adicione até 10 tags para facilitar a busca do seu produto</p>
                          <span className={`text-xs ${tagsCount > 10 ? 'text-destructive' : 'text-muted-foreground'}`}>{tagsCount}/10</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {tagsArray.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-[hsl(206,35%,85%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Language */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Idioma do Conteúdo *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'pt-br', label: '🇧🇷 Português' },
                            { value: 'en', label: '🇺🇸 Inglês' },
                            { value: 'es', label: '🇪🇸 Espanhol' }
                          ].map((lang) => (
                            <label key={lang.value} className="relative cursor-pointer">
                              <input 
                                type="radio" 
                                name="language" 
                                value={lang.value}
                                checked={formData.language === lang.value}
                                onChange={(e) => handleInputChange('language', e.target.value)}
                                className="peer sr-only"
                              />
                              <div className="border-2 border-border rounded-lg p-3 text-center hover:border-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-[hsl(206,35%,85%)]">
                                <p className="font-medium text-foreground text-sm">{lang.label}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Short Description */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Descrição Curta *
                          <span className="text-xs font-normal text-muted-foreground ml-2">(Aparecerá no card do produto)</span>
                        </label>
                        <textarea 
                          rows={3}
                          placeholder="Descreva brevemente o que o seu produto oferece. Seja direto e destaque o principal benefício."
                          value={formData.shortDescription}
                          onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                          maxLength={160}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        ></textarea>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-muted-foreground">Recomendamos entre 120-160 caracteres</p>
                          <span className={`text-xs ${descLength > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>{descLength}/160</span>
                        </div>
                      </div>

                      {/* Author */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Autor Principal *</label>
                        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                          <img 
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                            alt="Autor Principal" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-card shadow-sm"
                          />
                          <div className="flex-1">
                            <input 
                              type="text" 
                              placeholder="Ex: Ricardo Almeida" 
                              value={formData.authorName}
                              onChange={(e) => handleInputChange('authorName', e.target.value)}
                              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-foreground">Co-autores</label>
                            <button 
                              type="button"
                              onClick={addCoAuthor}
                              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground border-2 border-border rounded-lg hover:bg-accent/10 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              Adicionar Co-autor
                            </button>
                          </div>
                          
                          {formData.coAuthors.length > 0 && (
                            <div className="space-y-3 mb-3">
                              {formData.coAuthors.map((coAuthor, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                                  <span className="flex-1 text-sm text-foreground">{coAuthor}</span>
                                  <button
                                    onClick={() => removeCoAuthor(index)}
                                    className="text-destructive hover:text-destructive/80 text-sm"
                                  >
                                    Remover
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <input 
                            type="text" 
                            placeholder="Nome do co-autor" 
                            value={coAuthorInput}
                            onChange={(e) => setCoAuthorInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoAuthor())}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Credentials */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Credenciais/Especialização *
                          <span className="text-xs font-normal text-muted-foreground ml-2">(Sua expertise no tema)</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Ex: Especialista em Meios de Pagamento com 18 anos de experiência" 
                          value={formData.credentials}
                          onChange={(e) => handleInputChange('credentials', e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                      <button 
                        onClick={handleSaveDraft}
                        className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors"
                      >
                        <Save className="w-4 h-4 inline mr-2" />
                        Salvar Rascunho
                      </button>
                      <button 
                        onClick={handleNextStep}
                        className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
                      >
                        Próxima Etapa
                        <ArrowRight className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar Helper */}
                <div className="col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Help Card */}
                    <div className="bg-card rounded-xl border border-border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[hsl(48,35%,85%)] rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        </div>
                        <h3 className="font-semibold text-foreground">Dicas para Etapa 1</h3>
                      </div>
                      <ul className="space-y-3 text-sm text-foreground">
                        {[
                          'Escolha um título claro que explique o benefício principal',
                          'Selecione a categoria mais específica possível',
                          'Use tags relevantes que seu público buscaria',
                          'A descrição curta deve despertar interesse imediato',
                          'Destaque suas credenciais para gerar confiança'
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[hsl(142,35%,65%)] mt-0.5">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-card rounded-xl border border-border p-6">
                      <h3 className="font-semibold text-foreground mb-4">Progresso da Etapa 1</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Campos obrigatórios</span>
                            <span className="text-sm font-semibold text-foreground">{filledCount}/{totalRequired}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-foreground transition-all duration-300" 
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Completude</span>
                            <span className="text-sm font-semibold text-foreground">{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[hsl(142,35%,65%)] transition-all duration-300" 
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-[hsl(206,35%,85%)] rounded-lg">
                        <p className="text-xs text-[hsl(215,20%,40%)]">
                          ℹ️ Preencha todos os campos obrigatórios para continuar
                        </p>
                      </div>
                    </div>

                    {/* Requirements Card */}
                    <div className="bg-[hsl(270,35%,85%)] rounded-xl border border-border p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <ClipboardCheck className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        <h3 className="font-semibold text-foreground">Campos Obrigatórios</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        {[
                          'Tipo de Produto',
                          'Título do Produto',
                          'Categoria Principal',
                          'Público-Alvo',
                          'Tags',
                          'Idioma',
                          'Descrição Curta',
                          'Nome do Autor',
                          'Credenciais'
                        ].map((field, index) => (
                          <div key={index} className="flex items-center gap-2 text-muted-foreground">
                            <span className={index < filledCount ? 'text-[hsl(142,35%,65%)]' : ''}>
                              {index < filledCount ? '☑' : '☐'}
                            </span>
                            <span>{field}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-card rounded-xl border border-border p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Headset className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        <h3 className="font-semibold text-foreground">Precisa de Ajuda?</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Nossa equipe está pronta para ajudar você a cadastrar seu produto</p>
                      <button className="w-full px-4 py-2 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors text-sm">
                        💬 Falar com Suporte
                      </button>
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
    </div>
  );
}