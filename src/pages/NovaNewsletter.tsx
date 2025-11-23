import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Newspaper, Podcast, GraduationCap, Bot, Book, Video, FileText, BarChart3, 
  FileCheck, FlaskConical, Upload, Plus, ChevronRight, Check, Bold, 
  Italic, Underline, List, Link, Image, Calendar, Users, DollarSign,
  ChartPie, MessageCircle, Eye, ArrowRight, ArrowLeft, Info
} from "lucide-react";

export default function NovaNewsletter() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("newspaper");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedColor, setSelectedColor] = useState("#B8D4E8");

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

  const contentTypes = [
    { name: "Newsletter Principal", icon: Newspaper, color: "bg-[hsl(var(--pastel-purple))]", description: "Conteúdo base da assinatura", frequency: "Diária", days: "Seg a Sex", time: "07:00" },
    { name: "Podcast Semanal", icon: Podcast, color: "bg-[hsl(var(--pastel-peach))]", description: "Episódios em áudio", frequency: "Semanal", days: "Quarta-feira", time: "09:00" },
    { name: "Webinar Mensal", icon: Video, color: "bg-pink-100", description: "Aulas ao vivo", frequency: "Mensal", days: "Última quinta-feira", time: "19:00" },
    { name: "E-book Trimestral", icon: Book, color: "bg-[hsl(var(--pastel-yellow))]", description: "Conteúdo aprofundado", frequency: "Trimestral", days: "Mar, Jun, Set, Dez", time: "1º dia do mês" },
    { name: "Análises Especiais", icon: BarChart3, color: "bg-teal-100", description: "Sob demanda", frequency: "Sob Demanda", days: "Manual", time: "N/A" }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      <SidebarFix />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shrink-0">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <a href="#" className="hover:text-slate-700">Studio de Criação</a>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-800 font-medium">Nova Publicação</span>
              </div>
              <h1 className="text-2xl font-semibold text-slate-800">Criar Newsletter & Conteúdo</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition">
                Salvar Rascunho
              </button>
              <button className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition flex items-center gap-2">
                <Eye className="w-4 h-4" /> Visualizar
              </button>
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
                  <span className={`text-sm font-medium ${currentStep === 4 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-400'}`}>Revisão</span>
                </div>
              </div>
            </div>

            {/* Step 1: Product Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Selecione o formato do conteúdo</h2>
                <p className="text-slate-500 mb-8">Escolha o tipo de produto principal que você deseja criar. Você poderá adicionar complementos nas próximas etapas.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {productTypes.map((product) => {
                    const Icon = product.icon;
                    const isSelected = selectedProduct === product.id;
                    
                    return (
                      <label key={product.id} className="cursor-pointer group relative">
                        <input 
                          type="radio" 
                          name="product_type" 
                          className="sr-only" 
                          checked={isSelected}
                          onChange={() => setSelectedProduct(product.id)}
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
                        {['#B8D4E8', '#D4C5E8', '#E8C5D8', '#C5E8D4', '#E8E0C5'].map((color, idx) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full transition ${
                              selectedColor === color ? 'ring-2 ring-offset-2 ring-purple-300' : 'hover:ring-2 hover:ring-offset-2 hover:ring-slate-200'
                            }`}
                            style={{ backgroundColor: color }}
                          />
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
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition resize-none" 
                          placeholder="Uma breve descrição que aparecerá nos cards e na página de detalhes..."
                        />
                        <div className="flex justify-end mt-1 text-xs text-slate-400">0/160 caracteres</div>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                        <div className="p-2 border border-slate-300 rounded-lg bg-white flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-purple-50 text-[hsl(var(--pastel-gray-dark))] rounded text-sm flex items-center gap-1">
                            Pix 
                            <button className="hover:text-slate-900">
                              <span className="text-xs">×</span>
                            </button>
                          </span>
                          <span className="px-2 py-1 bg-purple-50 text-[hsl(var(--pastel-gray-dark))] rounded text-sm flex items-center gap-1">
                            Open Finance 
                            <button className="hover:text-slate-900">
                              <span className="text-xs">×</span>
                            </button>
                          </span>
                          <input type="text" className="flex-1 outline-none min-w-[100px] text-sm py-1" placeholder="Digite e pressione Enter..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Editor Preview */}
                <div className="mt-8 border-t border-slate-100 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Conteúdo da Primeira Edição</h3>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition flex items-center gap-2">
                        <Bot className="w-4 h-4" /> Gerar com IA
                      </button>
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600"><Bold className="w-4 h-4" /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600"><Italic className="w-4 h-4" /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600"><Underline className="w-4 h-4" /></button>
                      <div className="w-px bg-slate-300 mx-1 h-6 self-center"></div>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600"><List className="w-4 h-4" /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600"><Link className="w-4 h-4" /></button>
                      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 text-slate-600"><Image className="w-4 h-4" /></button>
                    </div>
                    <div className="p-6 bg-white min-h-[300px]">
                      <p className="text-slate-400 italic">Comece a escrever sua newsletter aqui...</p>
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
                    <button className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition text-sm flex items-center gap-2 shadow-sm">
                      <Plus className="w-4 h-4" /> Adicionar Tipo
                    </button>
                  </div>

                  <div className="space-y-3">
                    {contentTypes.map((type, index) => {
                      const Icon = type.icon;
                      return (
                        <div key={index} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center`}>
                                <Icon className="w-5 h-5 text-slate-700" />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800">{type.name}</h4>
                                <p className="text-xs text-slate-500">{type.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Ativo</span>
                              <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition">
                                <span className="text-lg">⋮</span>
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1.5">Frequência</label>
                              <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none">
                                <option>{type.frequency}</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1.5">Dias de Publicação</label>
                              <div className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50">
                                <span className="text-xs font-medium text-slate-700">{type.days}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1.5">Horário de Envio</label>
                              <input type="time" defaultValue={type.time} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-200 outline-none" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">5</div>
                      <div className="text-xs text-slate-600 mt-1">Tipos Ativos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">~28</div>
                      <div className="text-xs text-slate-600 mt-1">Publicações/Mês</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">3</div>
                      <div className="text-xs text-slate-600 mt-1">Formatos Diferentes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">100%</div>
                      <div className="text-xs text-slate-600 mt-1">Automação</div>
                    </div>
                  </div>
                </div>

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

                <h3 className="font-bold text-slate-800 mb-4">Configurações de Monetização</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="monetization" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                      <span className="text-slate-700 font-medium">Gratuita</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="monetization" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" defaultChecked />
                      <span className="text-slate-700 font-medium">Premium (Paga)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="monetization" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                      <span className="text-slate-700 font-medium">Freemium (Mista)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Preço Mensal (R$)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">R$</span>
                        <input type="number" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 outline-none" defaultValue="29.90" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Preço Anual (R$)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">R$</span>
                        <input type="number" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-200 outline-none" defaultValue="299.00" />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <div className="text-sm text-slate-500 mb-3">
                        <Info className="w-4 h-4 inline mr-1" /> A plataforma cobra 10% de taxa sobre assinaturas.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button 
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/criar-newsletter')}
                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button 
                onClick={() => currentStep < 4 && setCurrentStep(currentStep + 1)}
                className="px-8 py-3 rounded-lg text-slate-700 font-bold hover:opacity-90 transition shadow-sm hover:shadow flex items-center gap-2"
                style={{ backgroundColor: '#D4C5E8' }}
              >
                Próxima Etapa <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
