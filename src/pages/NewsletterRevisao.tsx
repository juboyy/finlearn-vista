import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, ArrowLeft, Check, Edit, Newspaper, Calendar, 
  Clock, Mail, MessageSquare, Smartphone, Hash, DollarSign, 
  Users, Tag, Palette, FileText, Globe, Send, CheckCircle
} from "lucide-react";

export default function NewsletterRevisao() {
  const navigate = useNavigate();

  const newsletterData = {
    title: "Revolução dos Pagamentos",
    category: "Fintechs & Inovação",
    description: "Análise profunda sobre as transformações no mercado de pagamentos digitais e seu impacto no ecossistema financeiro.",
    frequency: "Diária",
    schedule: "Seg a Sex às 07:00",
    color: "#B8D4E8",
    tags: ["Pix", "Open Banking", "Fintechs", "Regulação"],
    products: ["Newspaper", "Podcast", "Webinars"],
    channels: ["Email", "WhatsApp", "SMS"],
    price: "R$ 49,90",
    trialPeriod: "7 dias grátis",
    discount: "20% OFF para assinantes anuais",
    subscribers: 0
  };

  const summaryCards = [
    {
      title: "Informações Básicas",
      icon: FileText,
      color: "bg-[hsl(var(--pastel-blue))]",
      items: [
        { label: "Título", value: newsletterData.title, icon: Newspaper },
        { label: "Categoria", value: newsletterData.category, icon: Tag },
        { label: "Frequência", value: newsletterData.frequency, icon: Clock },
        { label: "Horário", value: newsletterData.schedule, icon: Calendar }
      ]
    },
    {
      title: "Tipos de Conteúdo",
      icon: Newspaper,
      color: "bg-[hsl(var(--pastel-purple))]",
      items: newsletterData.products.map(product => ({
        label: product,
        value: "Incluído",
        icon: CheckCircle
      }))
    },
    {
      title: "Canais de Distribuição",
      icon: Send,
      color: "bg-[hsl(var(--pastel-green))]",
      items: newsletterData.channels.map(channel => ({
        label: channel,
        value: "Ativo",
        icon: channel === "Email" ? Mail : channel === "WhatsApp" ? MessageSquare : Smartphone
      }))
    },
    {
      title: "Monetização",
      icon: DollarSign,
      color: "bg-[hsl(var(--pastel-peach))]",
      items: [
        { label: "Preço", value: newsletterData.price, icon: DollarSign },
        { label: "Período Trial", value: newsletterData.trialPeriod, icon: Calendar },
        { label: "Desconto", value: newsletterData.discount, icon: Tag }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <a href="#" className="hover:text-slate-700">Studio de Criação</a>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-slate-800 font-medium">Revisão & Publicação</span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-800">Revisar Newsletter</h1>
              </div>
              <button 
                onClick={() => navigate("/nova-newsletter")}
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-3">
              {["Tipo", "Detalhes", "Configurações", "Monetização", "Revisão"].map((step, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`flex items-center gap-2 ${idx === 4 ? 'font-semibold' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      idx < 4 ? 'bg-[hsl(var(--pastel-green))] text-white' : 
                      idx === 4 ? 'bg-[hsl(var(--pastel-purple))] text-white' : 
                      'bg-slate-200 text-slate-400'
                    }`}>
                      {idx < 4 ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    <span className={`text-xs ${idx === 4 ? 'text-[hsl(var(--pastel-gray-dark))]' : 'text-slate-500'}`}>
                      {step}
                    </span>
                  </div>
                  {idx < 4 && <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Preview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8">
              <div 
                className="h-48 relative flex items-center justify-center"
                style={{ backgroundColor: newsletterData.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
                <div className="relative text-center space-y-3 px-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-white/90 backdrop-blur-sm">
                    <Newspaper className="w-3.5 h-3.5" />
                    {newsletterData.category}
                  </div>
                  <h2 className="text-3xl font-bold text-[hsl(var(--pastel-gray-dark))]">{newsletterData.title}</h2>
                  <p className="text-sm text-slate-600 max-w-2xl">{newsletterData.description}</p>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{newsletterData.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{newsletterData.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{newsletterData.subscribers} assinantes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[hsl(var(--pastel-gray-dark))]">{newsletterData.price}</span>
                    <span className="text-sm text-slate-500">/mês</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-600">Tags:</span>
                {newsletterData.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-[hsl(var(--pastel-gray-dark))]"
                    style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {summaryCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className={`${card.color} p-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                        </div>
                        <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">{card.title}</h3>
                      </div>
                      <button className="p-2 rounded-lg bg-white/80 hover:bg-white transition text-[hsl(var(--pastel-gray-dark))]">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-5 space-y-3">
                      {card.items.map((item, itemIdx) => {
                        const ItemIcon = item.icon;
                        return (
                          <div key={itemIdx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                            <div className="flex items-center gap-3">
                              <ItemIcon className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-600">{item.label}</span>
                            </div>
                            <span className="text-sm font-semibold text-[hsl(var(--pastel-gray-dark))]">{item.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Color Theme Preview */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--pastel-purple))] flex items-center justify-center">
                    <Palette className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--pastel-gray-dark))]">Tema Visual</h3>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-50 transition text-[hsl(var(--pastel-gray-dark))]">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div 
                  className="w-20 h-20 rounded-xl shadow-md border-4 border-white"
                  style={{ backgroundColor: newsletterData.color }}
                ></div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Cor Principal</p>
                  <p className="text-xs text-slate-400 font-mono">{newsletterData.color}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-6 sticky bottom-0 shadow-lg">
              <button 
                onClick={() => navigate("/nova-newsletter")}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar e Editar
              </button>
              
              <div className="flex gap-3">
                <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
                  Salvar Rascunho
                </button>
                <button 
                  className="px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 text-white shadow-md"
                  style={{ backgroundColor: 'hsl(var(--pastel-purple-btn))' }}
                >
                  <Send className="w-4 h-4" />
                  Publicar Newsletter
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
