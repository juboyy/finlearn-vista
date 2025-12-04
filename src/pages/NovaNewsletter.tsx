import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Newspaper, Podcast, GraduationCap, Bot, Book, Video, FileText, BarChart3, 
  FileCheck, FlaskConical, Upload, Plus, ChevronRight, Check, Bold, 
  Italic, Underline, List, Link, Image, Calendar, Users, DollarSign,
  ChartPie, MessageCircle, Eye, ArrowRight, ArrowLeft, Info, Mail, 
  MessageSquare, Smartphone, Hash, Send, CreditCard, Receipt, CheckCircle,
  Palette, Clock, Loader2, Trash2, X
} from "lucide-react";
import { useNewsletters } from "@/hooks/useNewsletters";
import { useToast } from "@/hooks/use-toast";

export default function NovaNewsletter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { newsletters, createNewsletter, updateNewsletter } = useNewsletters();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["newspaper"]);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedColor, setSelectedColor] = useState("#B8D4E8");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["email"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [isPublishing, setIsPublishing] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [contentTypesList, setContentTypesList] = useState([
    { id: "1", name: "Newsletter Principal", icon: "Newspaper", color: "bg-[hsl(var(--pastel-purple))]", description: "Conteúdo base da assinatura", frequency: "Diária", days: "Seg a Sex", time: "07:00", isActive: true },
    { id: "2", name: "Podcast Semanal", icon: "Podcast", color: "bg-[hsl(var(--pastel-peach))]", description: "Episódios em áudio", frequency: "Semanal", days: "Quarta-feira", time: "09:00", isActive: true },
    { id: "3", name: "Webinar Mensal", icon: "Video", color: "bg-pink-100", description: "Aulas ao vivo", frequency: "Mensal", days: "Última quinta-feira", time: "19:00", isActive: true },
  ]);
  const [showAddContentTypeModal, setShowAddContentTypeModal] = useState(false);
  const [newContentType, setNewContentType] = useState({
    name: "",
    description: "",
    frequency: "Semanal",
    days: "Segunda-feira",
    time: "09:00",
    icon: "FileText",
    color: "bg-[hsl(var(--pastel-blue))]"
  });
  
  const isEditMode = !!editId;

  // Load existing newsletter data for edit mode
  useEffect(() => {
    if (editId && newsletters.length > 0) {
      const newsletter = newsletters.find(n => n.id === editId);
      if (newsletter) {
        setTitle(newsletter.title);
        setDescription(newsletter.description || "");
        setSelectedColor(newsletter.color);
        setSelectedFrequency(newsletter.frequency || "weekly");
        setStatus(newsletter.status);
        setTags(newsletter.tags || []);
        setSelectedProducts(newsletter.product_types || ["newspaper"]);
        setSelectedChannels(newsletter.distribution_channels || ["email"]);
      }
    }
  }, [editId, newsletters]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const frequencyOptions = ["Diária", "Semanal", "Quinzenal", "Mensal", "Trimestral", "Sob Demanda"];
  const daysOptions = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo", "Seg a Sex", "Última quinta-feira", "1º dia do mês", "Manual"];
  const iconOptions = [
    { id: "Newspaper", icon: Newspaper },
    { id: "Podcast", icon: Podcast },
    { id: "Video", icon: Video },
    { id: "Book", icon: Book },
    { id: "FileText", icon: FileText },
    { id: "BarChart3", icon: BarChart3 },
    { id: "GraduationCap", icon: GraduationCap },
    { id: "Bot", icon: Bot },
  ];
  const colorOptions = [
    "bg-[hsl(var(--pastel-purple))]",
    "bg-[hsl(var(--pastel-peach))]",
    "bg-[hsl(var(--pastel-blue))]",
    "bg-[hsl(var(--pastel-green))]",
    "bg-[hsl(var(--pastel-yellow))]",
    "bg-pink-100",
    "bg-teal-100",
    "bg-indigo-100",
  ];

  const getIconComponent = (iconId: string) => {
    const found = iconOptions.find(opt => opt.id === iconId);
    return found ? found.icon : FileText;
  };

  const handleAddContentType = () => {
    if (!newContentType.name.trim()) {
      toast({ title: "Nome obrigatório", description: "Informe o nome do tipo de conteúdo.", variant: "destructive" });
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      ...newContentType,
      isActive: true,
    };
    setContentTypesList([...contentTypesList, newItem]);
    setShowAddContentTypeModal(false);
    setNewContentType({ name: "", description: "", frequency: "Semanal", days: "Segunda-feira", time: "09:00", icon: "FileText", color: "bg-[hsl(var(--pastel-blue))]" });
    toast({ title: "Tipo adicionado", description: `"${newContentType.name}" foi adicionado com sucesso.` });
  };

  const handleDeleteContentType = (id: string) => {
    setContentTypesList(contentTypesList.filter(item => item.id !== id));
    toast({ title: "Tipo removido", description: "O tipo de conteúdo foi removido." });
  };

  const handleUpdateContentType = (id: string, field: string, value: string) => {
    setContentTypesList(contentTypesList.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const productTypes = [
    { id: "newspaper", name: "Newspaper", icon: Newspaper, description: "Notícias diárias e curadoria", color: "bg-[hsl(var(--pastel-purple))]" },
    { id: "podcast", name: "Podcast", icon: Podcast, description: "Áudio e entrevistas", color: "bg-[hsl(var(--pastel-peach))]" },
    { id: "courses", name: "Cursos", icon: GraduationCap, description: "Aulas e módulos", color: "bg-[hsl(var(--pastel-blue))]" },
    { id: "avatar", name: "Avatar IA", icon: Bot, description: "Vídeos gerados por IA", color: "bg-[hsl(var(--pastel-green))]" },
    { id: "ebooks", name: "E-books", icon: Book, description: "Livros digitais", color: "bg-[hsl(var(--pastel-yellow))]" },
    { id: "webinars", name: "Webinars", icon: Video, description: "Ao vivo e gravados", color: "bg-pink-100" },
    { id: "articles", name: "Artigos", icon: FileText, description: "Textos técnicos", color: "bg-indigo-100" },
    { id: "analysis", name: "Análises", icon: BarChart3, description: "Dados de mercado", color: "bg-teal-100" },
    { id: "reports", name: "Relatórios", icon: FileCheck, description: "Deep dives", color: "bg-gray-100" },
    { id: "studies", name: "Estudos", icon: FlaskConical, description: "Acadêmicos e Papers", color: "bg-rose-100" }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 flex flex-col min-w-0">{/* Header */}
        <header className="bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <a href="#" className="hover:text-slate-700">Studio de Criação</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-800 font-medium">{isEditMode ? 'Editar Newsletter' : 'Nova Publicação'}</span>
              </div>
              <h1 className="text-2xl font-semibold text-slate-800">{isEditMode ? 'Editar Newsletter' : 'Criar Newsletter & Conteúdo'}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition">
                Salvar Rascunho
              </button>
              {currentStep === 5 && (
                <button 
                  onClick={() => navigate('/newsletter-preview')}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Visualizar
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Wizard Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Wizard Steps */}
            <div className="mb-10">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
                
                <div className="flex flex-col items-center gap-2 bg-slate-50 px-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm ring-2 ${
                    currentStep === 1 ? 'bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] ring-purple-100' : 'bg-white text-slate-400 ring-slate-200'
                  }`}>1</div>
                  <span className={`text-sm font-medium ${currentStep === 1 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-400'}`}>Tipo de Produto</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 bg-slate-50 px-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm ring-2 ${
                    currentStep === 2 ? 'bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] ring-purple-100' : 'bg-white text-slate-400 ring-slate-200'
                  }`}>2</div>
                  <span className={`text-sm font-medium ${currentStep === 2 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-400'}`}>Detalhes & Conteúdo</span>
                </div>

                <div className="flex flex-col items-center gap-2 bg-slate-50 px-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm ring-2 ${
                    currentStep === 3 ? 'bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] ring-purple-100' : 'bg-white text-slate-400 ring-slate-200'
                  }`}>3</div>
                  <span className={`text-sm font-medium ${currentStep === 3 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-400'}`}>Configurações</span>
                </div>

                <div className="flex flex-col items-center gap-2 bg-slate-50 px-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm ring-2 ${
                    currentStep === 4 ? 'bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] ring-purple-100' : 'bg-white text-slate-400 ring-slate-200'
                  }`}>4</div>
                  <span className={`text-sm font-medium ${currentStep === 4 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-400'}`}>Monetização</span>
                </div>

                <div className="flex flex-col items-center gap-2 bg-slate-50 px-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-sm ring-2 ${
                    currentStep === 5 ? 'bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] ring-purple-100' : 'bg-white text-slate-400 ring-slate-200'
                  }`}>5</div>
                  <span className={`text-sm font-medium ${currentStep === 5 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-400'}`}>Revisão</span>
                </div>
              </div>
            </div>

            {/* Step 1: Product Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Selecione o formato do conteúdo</h2>
                <p className="text-slate-500 mb-8">Escolha um ou mais tipos de produto que você deseja criar. Você poderá adicionar complementos nas próximas etapas.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {productTypes.map((product) => {
                    const Icon = product.icon;
                    const isSelected = selectedProducts.includes(product.id);
                    
                    return (
                      <label key={product.id} className="cursor-pointer group relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={isSelected}
                          onChange={() => toggleProduct(product.id)}
                        />
                        <div className={`p-6 rounded-xl border transition-all h-full flex flex-col items-center text-center group-hover:shadow-md bg-white ${
                          isSelected ? 'border-[hsl(var(--pastel-purple))] ring-2 ring-[hsl(var(--pastel-purple))] ring-opacity-20' : 'border-slate-200 hover:border-[hsl(var(--pastel-purple))]'
                        }`}>
                          <div className={`w-14 h-14 rounded-full ${product.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-slate-700" />
                          </div>
                          <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                          <p className="text-xs text-slate-500">{product.description}</p>
                          {isSelected && (
                            <div className="absolute top-3 right-3 text-purple-600">
                              <Check className="w-5 h-5 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Details & Content */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Informações Básicas da Newsletter</h2>
                
                <div className="grid grid-cols-12 gap-8">
                  {/* Left Column: Cover & Main Info */}
                  <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Capa da Newsletter</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center h-64 bg-slate-50 hover:bg-slate-100 transition cursor-pointer relative group">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                          <Upload className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">Arraste uma imagem ou clique para upload</p>
                        <p className="text-xs text-slate-400 mt-1">Recomendado: 1200x630px JPG, PNG</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cor Tema</label>
                      <div className="flex gap-3">
                        {['#B8D4E8', '#D4C5E8', '#E8C5D8', '#C5E8D4', '#E8E0C5'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full transition relative flex items-center justify-center ${
                              selectedColor === color ? 'ring-2 ring-offset-2 ring-purple-400 shadow-md' : 'hover:ring-2 hover:ring-offset-2 hover:ring-slate-200'
                            }`}
                            style={{ backgroundColor: color }}
                          >
                            {selectedColor === color && (
                              <Check className="w-4 h-4 text-slate-700" />
                            )}
                          </button>
                        ))}
                        <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Form Fields */}
                  <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Título da Newsletter</label>
                        <input 
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition" 
                          placeholder="Ex: Revolução dos Pagamentos"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition bg-white">
                          <option>Fintechs & Inovação</option>
                          <option>Cripto & Web3</option>
                          <option>Regulação & Compliance</option>
                          <option>Mercados Globais</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Frequência de Publicação</label>
                        <select 
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition bg-white"
                          value={selectedFrequency}
                          onChange={(e) => setSelectedFrequency(e.target.value)}
                        >
                          <option value="">Selecione a frequência...</option>
                          <option value="daily">Diária</option>
                          <option value="weekly">Semanal</option>
                          <option value="biweekly">Quinzenal</option>
                          <option value="monthly">Mensal</option>
                          <option value="quarterly">Trimestral</option>
                          <option value="ondemand">Sob Demanda</option>
                          <option value="once">Publicação Única</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">A frequência será aplicada ao tipo de conteúdo selecionado</p>
                      </div>

                      {selectedFrequency === 'daily' && (
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Configuração de Frequência</label>
                          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
                            <div className="flex items-center gap-4 mb-3">
                              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
                                <label key={day} className="flex items-center gap-2">
                                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-purple-600" />
                                  <span className="text-sm text-slate-700">{day}</span>
                                </label>
                              ))}
                            </div>
                            <div>
                              <label className="text-xs text-slate-600">Horário de envio:</label>
                              <input type="time" defaultValue="07:00" className="ml-2 px-3 py-1 text-sm border border-slate-300 rounded bg-white" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Descrição Curta (Subtítulo)</label>
                        <textarea 
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value.slice(0, 160))}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition resize-none" 
                          placeholder="Uma breve descrição que aparecerá nos cards e na página de detalhes..."
                        />
                        <div className="flex justify-end mt-1 text-xs text-slate-400">{description.length}/160 caracteres</div>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                        <div className="p-2 border border-slate-300 rounded-lg bg-white flex flex-wrap gap-2">
                          {tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 rounded-full text-sm flex items-center gap-1 text-slate-700" 
                              style={{ backgroundColor: ['#D4C5E8', '#C5E8D4', '#E8C5D8', '#B8D4E8', '#E8E0C5'][idx % 5] }}
                            >
                              {tag}
                              <button 
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-slate-900 ml-1"
                              >
                                <span className="text-xs font-bold">×</span>
                              </button>
                            </span>
                          ))}
                          <input 
                            type="text" 
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="flex-1 outline-none min-w-[100px] text-sm py-1" 
                            placeholder="Digite e pressione Enter..." 
                          />
                        </div>
                      </div>

                      {isEditMode && (
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setStatus("active")}
                              className={`flex-1 px-4 py-3 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                                status === "active" 
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              Ativo
                            </button>
                            <button
                              type="button"
                              onClick={() => setStatus("draft")}
                              className={`flex-1 px-4 py-3 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                                status === "draft" 
                                  ? 'border-amber-500 bg-amber-50 text-amber-700' 
                                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <FileText className="w-4 h-4" />
                              Rascunho
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Integrations & Features */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Recursos Adicionais & Integrações</h2>
                <p className="text-slate-500 mb-6">Adicione funcionalidades extras e configure a frequência de publicação para cada tipo de conteúdo</p>
                
                {/* Content Types & Frequency Section */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-purple-600">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">Tipos de Conteúdo & Frequências</h3>
                        <p className="text-sm text-slate-600">Configure a frequência de publicação para cada formato</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAddContentTypeModal(true)}
                      className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition text-sm flex items-center gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Adicionar Tipo
                    </button>
                  </div>

                  <div className="space-y-3">
                    {contentTypesList.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Nenhum tipo de conteúdo configurado.</p>
                        <p className="text-sm">Clique em "Adicionar Tipo" para começar.</p>
                      </div>
                    ) : (
                      contentTypesList.map((type) => {
                        const IconComponent = getIconComponent(type.icon);
                        return (
                          <div key={type.id} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center`}>
                                  <IconComponent className="w-5 h-5 text-slate-700" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-800">{type.name}</h4>
                                  <p className="text-xs text-slate-500">{type.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${type.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {type.isActive ? 'Ativo' : 'Inativo'}
                                </span>
                                <button 
                                  onClick={() => handleDeleteContentType(type.id)}
                                  className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                                  title="Remover"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">Frequência</label>
                                <select 
                                  value={type.frequency}
                                  onChange={(e) => handleUpdateContentType(type.id, 'frequency', e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none"
                                >
                                  {frequencyOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">Dias de Publicação</label>
                                <select 
                                  value={type.days}
                                  onChange={(e) => handleUpdateContentType(type.id, 'days', e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none"
                                >
                                  {daysOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">Horário de Envio</label>
                                <input 
                                  type="time" 
                                  value={type.time} 
                                  onChange={(e) => handleUpdateContentType(type.id, 'time', e.target.value)}
                                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none" 
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">{contentTypesList.filter(t => t.isActive).length}</div>
                      <div className="text-xs text-slate-600 mt-1">Tipos Ativos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">~{contentTypesList.length * 4}</div>
                      <div className="text-xs text-slate-600 mt-1">Publicações/Mês</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">{contentTypesList.length}</div>
                      <div className="text-xs text-slate-600 mt-1">Formatos Diferentes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">100%</div>
                      <div className="text-xs text-slate-600 mt-1">Automação</div>
                    </div>
                  </div>
                </div>

                {/* Add Content Type Modal */}
                {showAddContentTypeModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Adicionar Tipo de Conteúdo</h3>
                        <button 
                          onClick={() => setShowAddContentTypeModal(false)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                          <input 
                            type="text"
                            value={newContentType.name}
                            onChange={(e) => setNewContentType({...newContentType, name: e.target.value})}
                            placeholder="Ex: Newsletter Semanal"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
                          <input 
                            type="text"
                            value={newContentType.description}
                            onChange={(e) => setNewContentType({...newContentType, description: e.target.value})}
                            placeholder="Ex: Resumo semanal das principais notícias"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Ícone</label>
                            <select 
                              value={newContentType.icon}
                              onChange={(e) => setNewContentType({...newContentType, icon: e.target.value})}
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                            >
                              {iconOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.id}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Cor</label>
                            <select 
                              value={newContentType.color}
                              onChange={(e) => setNewContentType({...newContentType, color: e.target.value})}
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                            >
                              <option value="bg-[hsl(var(--pastel-purple))]">Roxo</option>
                              <option value="bg-[hsl(var(--pastel-peach))]">Pêssego</option>
                              <option value="bg-[hsl(var(--pastel-blue))]">Azul</option>
                              <option value="bg-[hsl(var(--pastel-green))]">Verde</option>
                              <option value="bg-[hsl(var(--pastel-yellow))]">Amarelo</option>
                              <option value="bg-pink-100">Rosa</option>
                              <option value="bg-teal-100">Teal</option>
                              <option value="bg-indigo-100">Índigo</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Frequência</label>
                          <select 
                            value={newContentType.frequency}
                            onChange={(e) => setNewContentType({...newContentType, frequency: e.target.value})}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                          >
                            {frequencyOptions.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Dias</label>
                            <select 
                              value={newContentType.days}
                              onChange={(e) => setNewContentType({...newContentType, days: e.target.value})}
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                            >
                              {daysOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Horário</label>
                            <input 
                              type="time"
                              value={newContentType.time}
                              onChange={(e) => setNewContentType({...newContentType, time: e.target.value})}
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button 
                          onClick={() => setShowAddContentTypeModal(false)}
                          className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={handleAddContentType}
                          className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <h3 className="font-bold text-slate-800 mb-4">Recursos Adicionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                    <div className="pt-1">
                      <input type="checkbox" className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded bg-[hsl(var(--pastel-purple))] bg-opacity-50 flex items-center justify-center text-purple-700 text-sm">
                          <Bot className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800">Versão em Áudio (IA)</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Gerar automaticamente uma versão narrada por IA para cada edição.</p>
                      <select className="text-xs border border-slate-300 rounded px-2 py-1 bg-white">
                        <option>Voz Masculina - Executiva</option>
                        <option>Voz Feminina - Jornalística</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                    <div className="pt-1">
                      <input type="checkbox" className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded bg-[hsl(var(--pastel-green))] bg-opacity-50 flex items-center justify-center text-green-700 text-sm">
                          <Video className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800">Resumo em Vídeo (Avatar)</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Criar um short video de 60s com os destaques para redes sociais.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                    <div className="pt-1">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded bg-[hsl(var(--pastel-blue))] bg-opacity-50 flex items-center justify-center text-blue-700 text-sm">
                          <ChartPie className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800">Analytics Avançado</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Rastreamento detalhado de cliques, tempo de leitura e mapa de calor.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                    <div className="pt-1">
                      <input type="checkbox" className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded bg-[hsl(var(--pastel-yellow))] bg-opacity-50 flex items-center justify-center text-yellow-700 text-sm">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-800">Área de Membros</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Habilitar comentários e discussões exclusivas para assinantes.</p>
                    </div>
                  </div>
                </div>

                {/* Communication Channels */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-800">Permissão de Canais de Envio</h3>
                  </div>
                  <p className="text-slate-500 mb-6">Selecione os canais pelos quais permite enviar o conteúdo</p>
                  
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { id: 'email', name: 'Email', icon: Mail },
                      { id: 'sms', name: 'SMS', icon: MessageSquare },
                      { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
                      { id: 'rcs', name: 'RCS', icon: Smartphone },
                      { id: 'mms', name: 'MMS', icon: Image },
                      { id: 'slack', name: 'Slack', icon: Hash },
                      { id: 'telegram', name: 'Telegram', icon: Send },
                      { id: 'discord', name: 'Discord', icon: Users }
                    ].map((channel) => {
                      const Icon = channel.icon;
                      const isSelected = selectedChannels.includes(channel.id);
                      
                      return (
                        <button
                          key={channel.id}
                          onClick={() => toggleChannel(channel.id)}
                          className={`flex flex-col items-center justify-center gap-2 w-28 h-28 rounded-xl border-2 transition-all ${
                            isSelected 
                              ? 'border-[#B8D4E8] shadow-sm' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          style={isSelected ? { backgroundColor: '#B8D4E8' } : { backgroundColor: 'white' }}
                        >
                          <Icon className="w-6 h-6 text-slate-700" />
                          <span className="text-sm font-medium text-slate-700">{channel.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Monetization */}
            {currentStep === 4 && (
              <div className="space-y-8 mb-8">
                {/* Header */}
                <div className="bg-pastel-purple rounded-2xl p-8 text-center shadow-lg">
                  <h2 className="text-3xl font-bold text-white mb-3">Configurações de Monetização</h2>
                  <p className="text-white/90 text-lg">Configure os planos de assinatura, preços e estratégias de monetização</p>
                </div>
                
                {/* Monetization Type */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pastel-purple flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-pastel-gray-dark" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Modelo de Monetização</h3>
                      <p className="text-sm text-slate-500">Escolha como seu conteúdo será monetizado</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="cursor-pointer group">
                      <input type="radio" name="monetization" className="sr-only peer" />
                      <div className="p-6 bg-pastel-green/15 rounded-xl border-2 border-pastel-green/30 peer-checked:border-pastel-green peer-checked:ring-4 peer-checked:ring-pastel-green/20 transition-all group-hover:shadow-md">
                        <div className="w-10 h-10 rounded-lg bg-pastel-green mb-4 flex items-center justify-center">
                          <Check className="w-5 h-5 text-pastel-gray-dark" />
                        </div>
                        <div className="font-bold text-slate-800 mb-2">Gratuita</div>
                        <p className="text-sm text-slate-600">Conteúdo aberto para todos os leitores</p>
                      </div>
                    </label>
                    <label className="cursor-pointer group">
                      <input type="radio" name="monetization" className="sr-only peer" defaultChecked />
                      <div className="p-6 bg-pastel-purple/15 rounded-xl border-2 border-pastel-purple/30 peer-checked:border-pastel-purple peer-checked:ring-4 peer-checked:ring-pastel-purple/20 transition-all group-hover:shadow-md">
                        <div className="w-10 h-10 rounded-lg bg-pastel-purple mb-4 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-pastel-gray-dark" />
                        </div>
                        <div className="font-bold text-slate-800 mb-2">Premium (Paga)</div>
                        <p className="text-sm text-slate-600">Assinatura única com conteúdo exclusivo</p>
                      </div>
                    </label>
                    <label className="cursor-pointer group">
                      <input type="radio" name="monetization" className="sr-only peer" />
                      <div className="p-6 bg-pastel-blue/15 rounded-xl border-2 border-pastel-blue/30 peer-checked:border-pastel-blue peer-checked:ring-4 peer-checked:ring-pastel-blue/20 transition-all group-hover:shadow-md">
                        <div className="w-10 h-10 rounded-lg bg-pastel-blue mb-4 flex items-center justify-center">
                          <ChartPie className="w-5 h-5 text-pastel-gray-dark" />
                        </div>
                        <div className="font-bold text-slate-800 mb-2">Freemium (Mista)</div>
                        <p className="text-sm text-slate-600">Conteúdo básico grátis + Premium</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Pricing Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border-2 border-pastel-purple/30 shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="bg-pastel-purple p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">Plano Mensal</h3>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-pastel-gray-dark">Ativo</span>
                      </div>
                      <p className="text-white/90 text-sm">Cobrança recorrente mensal</p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Preço Mensal</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-slate-500 font-bold text-lg">R$</span>
                          <input 
                            type="number" 
                            className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-pastel-purple/20 focus:border-pastel-purple outline-none bg-slate-50" 
                            defaultValue="29.90" 
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="bg-pastel-purple/10 rounded-xl p-4 border border-pastel-purple/20">
                        <label className="flex items-center gap-3 mb-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded text-pastel-purple" />
                          <span className="font-bold text-slate-800">Habilitar período de trial</span>
                        </label>
                        <div className="pl-8">
                          <label className="block text-sm font-medium text-slate-600 mb-2">Duração do Trial (dias)</label>
                          <input type="number" className="w-full px-4 py-3 text-sm font-medium border-2 border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-pastel-purple/20 focus:border-pastel-purple outline-none" defaultValue="7" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border-2 border-pastel-green/30 shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="bg-pastel-green p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">Plano Anual</h3>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-pastel-gray-dark">Ativo</span>
                      </div>
                      <p className="text-white/90 text-sm">Cobrança anual com desconto</p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Preço Anual</label>
                        <div className="relative">
                          <span className="absolute left-4 top-4 text-slate-500 font-bold text-lg">R$</span>
                          <input 
                            type="number" 
                            className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-pastel-green/20 focus:border-pastel-green outline-none bg-slate-50" 
                            defaultValue="299.00" 
                            step="0.01"
                          />
                        </div>
                        <div className="mt-3 px-3 py-2 bg-pastel-green/20 rounded-lg">
                          <p className="text-sm font-bold text-pastel-gray-dark">Economia de 16% comparado ao mensal</p>
                        </div>
                      </div>
                      <div className="bg-pastel-green/10 rounded-xl p-4 border border-pastel-green/20">
                        <label className="flex items-center gap-3 mb-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pastel-green" />
                          <span className="font-bold text-slate-800">Habilitar período de trial</span>
                        </label>
                        <div className="pl-8">
                          <label className="block text-sm font-medium text-slate-600 mb-2">Duração do Trial (dias)</label>
                          <input type="number" className="w-full px-4 py-3 text-sm font-medium border-2 border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-pastel-green/20 focus:border-pastel-green outline-none" defaultValue="14" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing & Invoice Settings */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pastel-blue flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-pastel-gray-dark" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Configurações de Faturamento</h3>
                      <p className="text-sm text-slate-500">Defina datas e métodos de pagamento</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Dia de Vencimento da Fatura</label>
                      <select className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-pastel-blue/20 focus:border-pastel-blue outline-none bg-white font-medium">
                        <option value="1">Dia 1 do mês</option>
                        <option value="5" selected>Dia 5 do mês</option>
                        <option value="10">Dia 10 do mês</option>
                        <option value="15">Dia 15 do mês</option>
                        <option value="20">Dia 20 do mês</option>
                        <option value="signup">Data da assinatura</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Dia de Envio da Fatura</label>
                      <select className="w-full px-4 py-4 rounded-xl border-2 border-slate-300 focus:ring-4 focus:ring-pastel-purple/20 focus:border-pastel-purple outline-none bg-white font-medium">
                        <option value="same">No dia do vencimento</option>
                        <option value="1" selected>1 dia antes do vencimento</option>
                        <option value="3">3 dias antes do vencimento</option>
                        <option value="5">5 dias antes do vencimento</option>
                        <option value="7">7 dias antes do vencimento</option>
                        <option value="10">10 dias antes do vencimento</option>
                      </select>
                    </div>
                    <div className="space-y-3 col-span-1 md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700">Métodos de Pagamento</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Traditional Methods */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-4 cursor-pointer group bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-pastel-blue/50 transition-all">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pastel-blue flex-shrink-0" />
                            <div className="w-10 h-10 rounded-lg bg-pastel-blue flex items-center justify-center flex-shrink-0">
                              <CreditCard className="w-5 h-5 text-pastel-gray-dark" />
                            </div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-blue transition-colors">Cartão de Crédito</span>
                          </label>
                          <label className="flex items-center gap-4 cursor-pointer group bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-pastel-green/50 transition-all">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-pastel-green flex-shrink-0" />
                            <div className="w-10 h-10 rounded-lg bg-pastel-green flex items-center justify-center flex-shrink-0">
                              <Smartphone className="w-5 h-5 text-pastel-gray-dark" />
                            </div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-green transition-colors">PIX</span>
                          </label>
                          <label className="flex items-center gap-4 cursor-pointer group bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-pastel-orange/50 transition-all">
                            <input type="checkbox" className="w-5 h-5 rounded text-pastel-orange flex-shrink-0" />
                            <div className="w-10 h-10 rounded-lg bg-pastel-orange flex items-center justify-center flex-shrink-0">
                              <Receipt className="w-5 h-5 text-pastel-gray-dark" />
                            </div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-orange transition-colors">Boleto Bancário</span>
                          </label>
                        </div>

                        {/* Right Column - Digital Wallets */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-4 cursor-pointer group bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-pastel-purple/50 transition-all">
                            <input type="checkbox" className="w-5 h-5 rounded text-pastel-purple flex-shrink-0" />
                            <div className="w-10 h-10 rounded-lg bg-pastel-purple flex items-center justify-center flex-shrink-0">
                              <Smartphone className="w-5 h-5 text-pastel-gray-dark" />
                            </div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-purple transition-colors">Google Pay</span>
                          </label>
                          <label className="flex items-center gap-4 cursor-pointer group bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-pastel-pink/50 transition-all">
                            <input type="checkbox" className="w-5 h-5 rounded text-pastel-pink flex-shrink-0" />
                            <div className="w-10 h-10 rounded-lg bg-pastel-pink flex items-center justify-center flex-shrink-0">
                              <Smartphone className="w-5 h-5 text-pastel-gray-dark" />
                            </div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-pink transition-colors">Apple Pay</span>
                          </label>
                          <label className="flex items-center gap-4 cursor-pointer group bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-pastel-yellow/50 transition-all">
                            <input type="checkbox" className="w-5 h-5 rounded text-pastel-yellow flex-shrink-0" />
                            <div className="w-10 h-10 rounded-lg bg-pastel-yellow flex items-center justify-center flex-shrink-0">
                              <DollarSign className="w-5 h-5 text-pastel-gray-dark" />
                            </div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-pastel-yellow transition-colors">PayPal</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discounts & Promotions */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-pastel-yellow p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-pastel-gray-dark" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-pastel-gray-dark">Descontos & Promoções</h3>
                          <p className="text-sm text-pastel-gray-dark/80">Configure cupons e ofertas especiais</p>
                        </div>
                      </div>
                      <button className="px-5 py-3 bg-white text-pastel-gray-dark rounded-xl font-bold hover:shadow-lg transition flex items-center gap-2 border border-slate-200">
                        <Plus className="w-5 h-5" /> Novo Cupom
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Referral Program Section */}
                    <div className="bg-pastel-purple/15 rounded-xl p-6 border-2 border-pastel-purple/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-pastel-purple flex items-center justify-center">
                          <Users className="w-6 h-6 text-pastel-gray-dark" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-800">Programa de Indicação</h4>
                          <p className="text-sm text-slate-600">Descontos progressivos por amigos que assinarem</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white rounded-xl p-4 border-2 border-pastel-blue/30">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-pastel-blue mb-2">10%</div>
                            <div className="text-xs font-medium text-slate-600 mb-1">Desconto mensal</div>
                            <div className="text-sm font-bold text-slate-800">1 amigo</div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border-2 border-pastel-green/30">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-pastel-green mb-2">25%</div>
                            <div className="text-xs font-medium text-slate-600 mb-1">Desconto mensal</div>
                            <div className="text-sm font-bold text-slate-800">3 amigos</div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border-2 border-pastel-yellow/30">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-pastel-yellow mb-2">40%</div>
                            <div className="text-xs font-medium text-slate-600 mb-1">Desconto mensal</div>
                            <div className="text-sm font-bold text-slate-800">5 amigos</div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border-2 border-pastel-pink/30">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-pastel-pink mb-2">GRÁTIS</div>
                            <div className="text-xs font-medium text-slate-600 mb-1">Assinatura gratuita</div>
                            <div className="text-sm font-bold text-slate-800">10+ amigos</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-pastel-purple flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-slate-700">
                            <strong>Como funciona:</strong> Cada amigo que assinar usando seu link de indicação garante um desconto progressivo na sua assinatura mensal. O desconto é aplicado automaticamente e permanece ativo enquanto seus indicados mantiverem a assinatura.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pastel-green/15 rounded-xl p-5 border-2 border-pastel-green/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-lg font-bold text-slate-800 mb-1">LAUNCH2024</div>
                          <p className="text-sm text-slate-600">Promoção de lançamento</p>
                        </div>
                        <span className="px-4 py-2 bg-pastel-green text-pastel-gray-dark rounded-xl text-sm font-bold">Ativo</span>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-3">
                          <span className="text-xs text-slate-600 block mb-1">Desconto</span>
                          <div className="text-lg font-bold text-slate-800">50% OFF</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <span className="text-xs text-slate-600 block mb-1">Válido até</span>
                          <div className="text-lg font-bold text-slate-800">31/12/2024</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <span className="text-xs text-slate-600 block mb-1">Usos</span>
                          <div className="text-lg font-bold text-slate-800">45/100</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pastel-pink/15 rounded-xl p-5 border-2 border-pastel-pink/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-lg font-bold text-slate-800 mb-1">FRIEND20</div>
                          <p className="text-sm text-slate-600">Indicação de amigos</p>
                        </div>
                        <span className="px-4 py-2 bg-pastel-pink text-pastel-gray-dark rounded-xl text-sm font-bold">Ativo</span>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-3">
                          <span className="text-xs text-slate-600 block mb-1">Desconto</span>
                          <div className="text-lg font-bold text-slate-800">20% OFF</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <span className="text-xs text-slate-600 block mb-1">Válido até</span>
                          <div className="text-lg font-bold text-slate-800">Indeterminado</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <span className="text-xs text-slate-600 block mb-1">Usos</span>
                          <div className="text-lg font-bold text-slate-800">Ilimitado</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Fee Info */}
                <div className="bg-pastel-blue/20 border-2 border-pastel-blue/30 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pastel-blue flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-pastel-gray-dark" />
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-base">Informação importante:</strong> A plataforma cobra uma taxa de <strong>10%</strong> sobre todas as assinaturas processadas. 
                    Esta taxa cobre processamento de pagamentos, infraestrutura e suporte técnico.
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Summary */}
            {currentStep === 5 && (
              <div className="space-y-8 mb-8">
                {/* Hero Preview Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                  <div 
                    className="h-48 relative flex items-center justify-center"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
                    <div className="relative text-center space-y-3 px-8">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-white/90 backdrop-blur-sm">
                        <Newspaper className="w-3.5 h-3.5" />
                        {selectedProducts.map(id => productTypes.find(p => p.id === id)?.name).filter(Boolean).join(', ') || 'Sem tipo selecionado'}
                      </div>
                      <h2 className="text-3xl font-bold text-[hsl(var(--pastel-gray-dark))]">{title || 'Título não definido'}</h2>
                      <p className="text-sm text-slate-600 max-w-2xl">{description || 'Descrição não definida'}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{selectedFrequency || 'Diária'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>Seg a Sex às 07:00</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>0 assinantes</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[hsl(var(--pastel-gray-dark))]">R$ 49,90</span>
                        <span className="text-sm text-slate-500">/mês</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-600">Tags:</span>
                    {tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-sm font-medium text-[hsl(var(--pastel-gray-dark))]"
                        style={{ backgroundColor: ['#D4C5E8', '#C5E8D4', '#E8C5D8', '#B8D4E8', '#E8E0C5'][idx % 5] }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informações Básicas */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-[hsl(var(--pastel-blue))] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                        </div>
                        <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">Informações Básicas</h3>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <Newspaper className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Título</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">{title || 'Não definido'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <Hash className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Categoria</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">{selectedProducts.map(id => productTypes.find(p => p.id === id)?.name).filter(Boolean).join(', ') || 'Não definido'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Frequência</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">{selectedFrequency || 'Diária'}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Horário</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">Seg a Sex às 07:00</span>
                      </div>
                    </div>
                  </div>

                  {/* Tipos de Conteúdo */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-[hsl(var(--pastel-purple))] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <Newspaper className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                        </div>
                        <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">Tipos de Conteúdo</h3>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {selectedProducts.map((productId, idx) => {
                        const product = [
                          { id: "newspaper", name: "Newspaper" },
                          { id: "podcast", name: "Podcast" },
                          { id: "courses", name: "Cursos" },
                          { id: "avatar", name: "Avatar IA" },
                          { id: "ebooks", name: "E-books" },
                          { id: "webinars", name: "Webinars" },
                          { id: "articles", name: "Artigos" },
                          { id: "analysis", name: "Análises" },
                          { id: "reports", name: "Relatórios" },
                          { id: "studies", name: "Estudos" }
                        ].find(p => p.id === productId);
                        
                        return product ? (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-600">{product.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">Incluído</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Canais de Distribuição */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-[hsl(var(--pastel-green))] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <Send className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                        </div>
                        <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">Canais de Distribuição</h3>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {selectedChannels.map((channelId, idx) => {
                        const channelNames: Record<string, { name: string; icon: any }> = {
                          email: { name: "Email", icon: Mail },
                          sms: { name: "SMS", icon: MessageSquare },
                          whatsapp: { name: "WhatsApp", icon: MessageCircle },
                          rcs: { name: "RCS", icon: Smartphone },
                          mms: { name: "MMS", icon: Image },
                          slack: { name: "Slack", icon: Hash },
                          telegram: { name: "Telegram", icon: Send },
                          discord: { name: "Discord", icon: Users }
                        };
                        const channel = channelNames[channelId];
                        const ChannelIcon = channel?.icon;
                        
                        return channel ? (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                            <div className="flex items-center gap-3">
                              {ChannelIcon && <ChannelIcon className="w-4 h-4 text-slate-400" />}
                              <span className="text-sm font-medium text-slate-600">{channel.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">Ativo</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Monetização */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-[hsl(var(--pastel-peach))] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                        </div>
                        <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">Monetização</h3>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Preço</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">R$ 49,90</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Período Trial</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">7 dias grátis</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Hash className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-600">Desconto</span>
                        </div>
                        <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">20% OFF anual</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Theme Preview */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(var(--pastel-purple))] flex items-center justify-center">
                        <Palette className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                      </div>
                      <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">Tema Visual</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 rounded-xl shadow-md border-4 border-white"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Cor Principal</p>
                      <p className="text-xs text-slate-400 font-mono">{selectedColor}</p>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="bg-gradient-to-r from-[hsl(var(--pastel-green))] to-[hsl(var(--pastel-blue))] rounded-2xl p-8 text-center shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[hsl(var(--pastel-green-btn))]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(var(--pastel-gray-dark))] mb-2">Tudo Pronto para Publicar!</h2>
                  <p className="text-[hsl(var(--pastel-gray-dark))]/80">Revise as informações acima e clique em "Publicar Newsletter" para finalizar.</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button 
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(currentStep - 1);
                    window.scrollTo(0, 0);
                  } else {
                    navigate('/criar-newsletter');
                  }
                }}
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              {currentStep === 5 ? (
                <button 
                  onClick={async () => {
                    if (!title.trim()) {
                      toast({
                        title: "Título obrigatório",
                        description: "Preencha o título da newsletter antes de publicar.",
                        variant: "destructive",
                      });
                      return;
                    }
                    setIsPublishing(true);
                    const updateData = {
                      title,
                      description,
                      frequency: selectedFrequency || "weekly",
                      color: selectedColor,
                      status,
                      tags,
                      product_types: selectedProducts,
                      distribution_channels: selectedChannels,
                    };
                    console.log('Saving newsletter with data:', updateData);
                    try {
                      if (isEditMode && editId) {
                        await updateNewsletter(editId, updateData);
                        toast({
                          title: "Newsletter atualizada",
                          description: "As alterações foram salvas com sucesso.",
                        });
                      } else {
                        await createNewsletter(title, description, selectedFrequency || "weekly", selectedColor, tags, selectedProducts, selectedChannels);
                      }
                      navigate('/criar-newsletter');
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setIsPublishing(false);
                    }
                  }}
                  disabled={isPublishing}
                  className="px-8 py-3 rounded-lg font-bold transition shadow-md hover:shadow-lg flex items-center gap-2 text-white disabled:opacity-50"
                  style={{ backgroundColor: 'hsl(210, 50%, 35%)' }}
                >
                  {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isPublishing ? "Salvando..." : isEditMode ? "Salvar Alterações" : "Publicar Newsletter"}
                </button>
              ) : (
                <button 
                  onClick={() => {
                    if (currentStep < 5) {
                      setCurrentStep(currentStep + 1);
                      window.scrollTo(0, 0);
                    }
                  }}
                  className="px-8 py-3 rounded-lg text-slate-700 font-bold hover:opacity-90 transition shadow-sm hover:shadow flex items-center gap-2"
                  style={{ backgroundColor: '#D4C5E8' }}
                >
                  {currentStep === 4 ? 'Revisar & Finalizar' : 'Próxima Etapa'} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
