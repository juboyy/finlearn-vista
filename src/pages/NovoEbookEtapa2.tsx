import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, ArrowRight, Upload, Eye, FolderPlus, Video, Link as LinkIcon, Lock, Fingerprint, Printer, Copy, Plus, Trash2, Save, Check, Image as ImageIcon, Lightbulb, HelpCircle, FileText } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function NovoEbookEtapa2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  
  const [formData, setFormData] = useState({
    coverImage: null as File | null,
    mainFile: null as File | null,
    previewFile: null as File | null,
    additionalMaterials: [] as File[],
    contentSamples: [] as File[],
    videoUrl: '',
    drmProtection: true,
    digitalWatermark: true,
    allowPrinting: false,
    allowTextCopy: false,
  });

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleMultipleFiles = (field: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as File[]), ...fileArray]
      }));
    }
  };

  const addFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqs([...faqs, {
        id: `faq-${Date.now()}`,
        question: newFaq.question,
        answer: newFaq.answer
      }]);
      setNewFaq({ question: '', answer: '' });
    }
  };

  const removeFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleSaveDraft = async () => {
    if (!productId) {
      toast.error("Produto não encontrado");
      return;
    }

    try {
      // In a real implementation, you would upload files to storage first
      // and get the URLs. For now, we'll just save the form data.
      
      const { error } = await supabase
        .from('products')
        .update({
          drm_protection: formData.drmProtection,
          digital_watermark: formData.digitalWatermark,
          allow_printing: formData.allowPrinting,
          allow_text_copy: formData.allowTextCopy,
          presentation_video_url: formData.videoUrl || null,
          faqs: faqs as any
        })
        .eq('id', productId);

      if (error) throw error;
      
      toast.success("Rascunho salvo com sucesso!");
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error("Erro ao salvar rascunho");
    }
  };

  const handleContinue = async () => {
    if (!formData.coverImage) {
      toast.error("A capa do eBook é obrigatória");
      return;
    }
    
    if (!formData.mainFile) {
      toast.error("O arquivo principal do eBook é obrigatório");
      return;
    }

    await handleSaveDraft();
    // Navigate to step 3 (to be created)
    toast.success("Avançando para Etapa 3!");
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={`/novo-ebook?productId=${productId}`} className="p-2 text-muted-foreground hover:bg-accent/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Criar Novo eBook</h1>
                  <p className="text-sm text-muted-foreground mt-1">Etapa 2 de 3 - Conteúdo e Arquivos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveDraft}
                  className="px-6 py-2 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors"
                >
                  Salvar Rascunho
                </button>
                <button 
                  onClick={handleContinue}
                  className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Step Indicator */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 max-w-3xl w-full">
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
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Conteúdo e Arquivos</p>
                  <p className="text-xs text-muted-foreground">Em andamento</p>
                </div>
              </div>
              <div className="w-16 h-0.5 bg-border"></div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Revisão e Publicação</p>
                  <p className="text-xs text-muted-foreground">Pendente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="col-span-2 space-y-6">
                {/* Cover Upload */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Capa do eBook</h3>
                      <p className="text-sm text-muted-foreground mt-1">A capa é a primeira impressão do seu produto</p>
                    </div>
                    <span className="px-3 py-1 bg-[hsl(340,50%,85%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">Obrigatório</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block">
                        <div className="aspect-square bg-[hsl(142,35%,85%)] rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors group">
                          <div className="text-center p-8">
                            <div className="w-20 h-20 mx-auto mb-4 bg-card rounded-xl flex items-center justify-center group-hover:bg-muted transition-colors">
                              <ImageIcon className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-foreground font-medium mb-1">
                              {formData.coverImage ? formData.coverImage.name : 'Clique para adicionar capa'}
                            </p>
                            <p className="text-xs text-muted-foreground">ou arraste o arquivo aqui</p>
                          </div>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileChange('coverImage', e.target.files?.[0] || null)}
                          className="hidden" 
                        />
                      </label>
                      <div className="mt-4 space-y-2">
                        <button className="w-full px-4 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors">
                          <Upload className="w-4 h-4 inline mr-2" />
                          Fazer Upload da Capa
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="bg-[hsl(48,35%,85%)] rounded-xl p-6 mb-4">
                        <div className="flex items-start gap-3 mb-3">
                          <FileText className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                          <h4 className="font-semibold text-foreground">Especificações</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-[hsl(215,20%,40%)]">✓</span>
                            <span>Dimensões: 1000x1000px (1:1)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[hsl(215,20%,40%)]">✓</span>
                            <span>Formato: JPG ou PNG</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[hsl(215,20%,40%)]">✓</span>
                            <span>Tamanho máximo: 5MB</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[hsl(215,20%,40%)]">✓</span>
                            <span>Resolução: 300 DPI</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[hsl(215,20%,40%)]">✓</span>
                            <span>Use cores vibrantes e legíveis</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main File Upload */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Arquivo Principal do eBook</h3>
                      <p className="text-sm text-muted-foreground mt-1">Upload do conteúdo completo que será entregue aos compradores</p>
                    </div>
                    <span className="px-3 py-1 bg-[hsl(340,50%,85%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">Obrigatório</span>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block">
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-muted-foreground transition-colors cursor-pointer bg-muted/30">
                        <div className="w-20 h-20 mx-auto mb-4 bg-card rounded-xl flex items-center justify-center">
                          <FileText className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-medium mb-1">
                          {formData.mainFile ? formData.mainFile.name : 'Clique para fazer upload ou arraste o arquivo'}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">PDF, EPUB ou MOBI - Máximo 50MB</p>
                        <button type="button" className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors">
                          <Upload className="w-4 h-4 inline mr-2" />
                          Selecionar Arquivo
                        </button>
                      </div>
                      <input 
                        type="file" 
                        accept=".pdf,.epub,.mobi"
                        onChange={(e) => handleFileChange('mainFile', e.target.files?.[0] || null)}
                        className="hidden" 
                      />
                    </label>

                    <div className="bg-[hsl(206,35%,85%)] rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-[hsl(215,20%,40%)] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Proteção de Conteúdo</p>
                          <p className="text-xs text-[hsl(215,20%,40%)]">Seu arquivo será criptografado e protegido contra cópias não autorizadas. Cada comprador receberá uma versão única com marca d'água digital.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview File */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Arquivo de Prévia Grátis</h3>
                      <p className="text-sm text-muted-foreground mt-1">Amostra do conteúdo para atrair compradores</p>
                    </div>
                    <span className="px-3 py-1 bg-[hsl(142,35%,85%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">Opcional</span>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block">
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-muted-foreground transition-colors cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[hsl(142,35%,85%)] rounded-xl flex items-center justify-center">
                          <Eye className="w-8 h-8 text-[hsl(215,20%,40%)]" />
                        </div>
                        <p className="text-foreground font-medium mb-1">Adicionar prévia do eBook</p>
                        <p className="text-sm text-muted-foreground mb-4">Primeiras páginas ou capítulo de amostra - Máximo 10MB</p>
                        <button type="button" className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors">
                          <Upload className="w-4 h-4 inline mr-2" />
                          Fazer Upload da Prévia
                        </button>
                      </div>
                      <input 
                        type="file" 
                        accept=".pdf,.epub,.mobi"
                        onChange={(e) => handleFileChange('previewFile', e.target.files?.[0] || null)}
                        className="hidden" 
                      />
                    </label>

                    <div className="bg-[hsl(48,35%,85%)] rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[hsl(215,20%,40%)] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Dica: Aumente suas vendas</p>
                          <p className="text-xs text-[hsl(215,20%,40%)] mb-2">Produtos com prévia grátis vendem até 3x mais. Recomendamos incluir:</p>
                          <ul className="text-xs text-[hsl(215,20%,40%)] space-y-1">
                            <li>• Índice completo</li>
                            <li>• Introdução ou primeiro capítulo</li>
                            <li>• 10-15% do conteúdo total</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Presentation */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Vídeo de Apresentação</h3>
                      <p className="text-sm text-muted-foreground mt-1">Grave ou faça upload de um vídeo apresentando seu eBook</p>
                    </div>
                    <span className="px-3 py-1 bg-[hsl(142,35%,85%)] text-[hsl(215,20%,40%)] text-xs font-medium rounded-full">Opcional</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[hsl(340,50%,85%)] rounded-xl flex items-center justify-center">
                        <Video className="w-8 h-8 text-[hsl(215,20%,40%)]" />
                      </div>
                      <p className="text-foreground font-medium mb-1">Adicionar vídeo de apresentação</p>
                      <p className="text-sm text-muted-foreground mb-4">MP4, MOV ou link do YouTube/Vimeo</p>
                      <div className="flex items-center justify-center gap-3">
                        <button className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors">
                          <Upload className="w-4 h-4 inline mr-2" />
                          Fazer Upload
                        </button>
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-muted-foreground" />
                          <input
                            type="url"
                            placeholder="Cole o link do vídeo"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Protection */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Configurações de Proteção</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-5 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[hsl(206,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Lock className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Proteção DRM</p>
                          <p className="text-sm text-muted-foreground">Impede cópias e compartilhamentos não autorizados</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.drmProtection}
                        onChange={(e) => setFormData(prev => ({ ...prev, drmProtection: e.target.checked }))}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between p-5 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[hsl(142,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Fingerprint className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Marca d'água Digital</p>
                          <p className="text-sm text-muted-foreground">Adiciona identificação única e invisível em cada cópia</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.digitalWatermark}
                        onChange={(e) => setFormData(prev => ({ ...prev, digitalWatermark: e.target.checked }))}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between p-5 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[hsl(48,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Printer className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Permitir Impressão</p>
                          <p className="text-sm text-muted-foreground">Compradores poderão imprimir o conteúdo</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.allowPrinting}
                        onChange={(e) => setFormData(prev => ({ ...prev, allowPrinting: e.target.checked }))}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between p-5 border border-border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[hsl(270,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Copy className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Permitir Cópia de Texto</p>
                          <p className="text-sm text-muted-foreground">Compradores poderão copiar trechos do texto</p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={formData.allowTextCopy}
                        onChange={(e) => setFormData(prev => ({ ...prev, allowTextCopy: e.target.checked }))}
                        className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
                      />
                    </label>
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-card rounded-xl border border-border p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Perguntas Frequentes</h3>
                      <p className="text-sm text-muted-foreground mt-1">Adicione perguntas e respostas para esclarecer dúvidas dos compradores</p>
                    </div>
                    <button 
                      onClick={addFaq}
                      className="px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Pergunta
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                      <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">Nenhuma pergunta adicionada ainda</p>
                      <p className="text-xs text-muted-foreground">Clique em "Adicionar Pergunta" para começar</p>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {faqs.map((faq) => (
                        <div key={faq.id} className="border border-border rounded-lg p-6 bg-muted/30">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <p className="font-medium text-foreground mb-2">{faq.question}</p>
                              <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </div>
                            <button
                              onClick={() => removeFaq(faq.id)}
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add FAQ Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pergunta</label>
                      <input
                        type="text"
                        placeholder="Digite a pergunta aqui..."
                        value={newFaq.question}
                        onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Resposta</label>
                      <textarea
                        placeholder="Digite a resposta aqui..."
                        rows={4}
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Progress Card */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Requisitos</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.coverImage ? 'border-[hsl(142,35%,65%)] bg-[hsl(142,35%,65%)]' : 'border-border'}`}>
                          {formData.coverImage && <Check className="w-3 h-3 text-background" />}
                        </div>
                        <span className={`text-sm ${formData.coverImage ? 'text-foreground' : 'text-muted-foreground'}`}>Capa do eBook</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.mainFile ? 'border-[hsl(142,35%,65%)] bg-[hsl(142,35%,65%)]' : 'border-border'}`}>
                          {formData.mainFile && <Check className="w-3 h-3 text-background" />}
                        </div>
                        <span className={`text-sm ${formData.mainFile ? 'text-foreground' : 'text-muted-foreground'}`}>Arquivo principal</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.previewFile ? 'border-[hsl(142,35%,65%)] bg-[hsl(142,35%,65%)]' : 'border-border'}`}>
                          {formData.previewFile && <Check className="w-3 h-3 text-background" />}
                        </div>
                        <span className={`text-sm ${formData.previewFile ? 'text-muted-foreground' : 'text-muted-foreground'}`}>Arquivo de prévia (opcional)</span>
                      </div>
                    </div>
                  </div>

                  {/* Help Card */}
                  <div className="bg-[hsl(270,35%,85%)] rounded-xl border border-border p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <HelpCircle className="w-5 h-5 text-[hsl(215,20%,40%)]" />
                      <h3 className="text-lg font-semibold text-foreground">Precisa de Ajuda?</h3>
                    </div>
                    <p className="text-sm text-foreground mb-4">Nossa equipe está pronta para auxiliar com qualquer dúvida sobre upload de arquivos.</p>
                    <button className="w-full px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors text-sm">
                      💬 Falar com Suporte
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <Link to={`/novo-ebook?productId=${productId}`}>
                <button className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors">
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Voltar para Etapa 1
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveDraft}
                  className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Salvar e Sair
                </button>
                <button 
                  onClick={handleContinue}
                  className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
                >
                  Continuar para Etapa 3
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
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