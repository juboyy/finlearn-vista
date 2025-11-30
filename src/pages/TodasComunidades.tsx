import { useState } from "react";
import { ChevronLeft, Search, Bell, Plus, Flame, Users, MessageSquare, Layers, ChevronRight, University, PieChart, CreditCard, Gavel, Briefcase, Leaf, TrendingUp, Bot, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TodasComunidades = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/comunidade")}
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Comunidades</h1>
                <p className="text-sm text-slate-500 mt-1">Conecte-se com profissionais e discuta tendências do mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar comunidades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pastel-blue text-slate-600 placeholder-slate-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
              <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-pastel-purple/80 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Criar Comunidade
              </Button>
            </div>
          </div>
          
          {/* Sub-header Filters */}
          <div className="px-8 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-6 overflow-x-auto">
            <button className="text-sm font-medium text-slate-800 border-b-2 border-pastel-dark-blue pb-3 -mb-3.5 whitespace-nowrap">
              Todas as Comunidades
            </button>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-700 pb-3 -mb-3.5 transition whitespace-nowrap">
              Minhas Comunidades
            </button>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-700 pb-3 -mb-3.5 transition whitespace-nowrap">
              Pendentes de Aprovação
            </button>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-700 pb-3 -mb-3.5 transition whitespace-nowrap">
              Arquivadas
            </button>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Section */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-pastel-dark-pink" />
                  Em Alta
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                    <div className="h-32 bg-pastel-blue relative overflow-hidden flex items-center justify-center">
                      <img 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" 
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7751f850a-69a10e658ef483c7546c.png" 
                        alt="Inovação em Pagamentos" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">Inovação em Pagamentos</h3>
                        <span className="bg-pastel-green text-slate-700 text-xs px-2 py-1 rounded font-medium">Pix & Open</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        Discussões sobre o futuro dos meios de pagamento, Pix Automático, Drex e Open Finance no Brasil.
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>12.5k membros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                          <span>+150 hoje</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => navigate("/discussao")}
                        className="w-full mt-4 py-2 bg-slate-50 text-slate-600 hover:bg-pastel-blue hover:text-slate-800 rounded-lg text-sm font-medium border border-slate-200 hover:border-pastel-blue"
                      >
                        Participar
                      </Button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                    <div className="h-32 bg-pastel-purple relative overflow-hidden flex items-center justify-center">
                      <img 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" 
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6dfd8aa8e6-04aecebcfcd318bbfa7b.png" 
                        alt="Compliance & Regulação" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">Compliance & Regulação</h3>
                        <span className="bg-pastel-purple text-slate-700 text-xs px-2 py-1 rounded font-medium">CVM/Bacen</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        Comunidade dedicada a profissionais de compliance, riscos e jurídico. Atualizações CVM e Bacen.
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>8.2k membros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                          <span>+84 hoje</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => navigate("/discussao")}
                        className="w-full mt-4 py-2 bg-slate-50 text-slate-600 hover:bg-pastel-purple hover:text-slate-800 rounded-lg text-sm font-medium border border-slate-200 hover:border-pastel-purple"
                      >
                        Participar
                      </Button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                    <div className="h-32 bg-pastel-peach relative overflow-hidden flex items-center justify-center">
                      <img 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" 
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4e86e9b6bd-f17e86eb38f86ecd4e84.png" 
                        alt="Gestão de Investimentos" 
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">Gestão de Investimentos</h3>
                        <span className="bg-pastel-peach text-slate-700 text-xs px-2 py-1 rounded font-medium">Asset Mgmt</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        Fórum para gestores, analistas e consultores. Estratégias de alocação, macroeconomia e cenários.
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>15.1k membros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                          <span>+210 hoje</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => navigate("/discussao")}
                        className="w-full mt-4 py-2 bg-slate-50 text-slate-600 hover:bg-pastel-peach hover:text-slate-800 rounded-lg text-sm font-medium border border-slate-200 hover:border-pastel-peach"
                      >
                        Participar
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Filter Bar */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Explorar Comunidades</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Ordenar por:</span>
                  <Select defaultValue="relevant">
                    <SelectTrigger className="w-[180px] text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevant">Mais Relevantes</SelectItem>
                      <SelectItem value="recent">Mais Recentes</SelectItem>
                      <SelectItem value="az">A-Z</SelectItem>
                      <SelectItem value="members">Mais Membros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* List View */}
              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                {/* Item 1 */}
                <div className="p-4 hover:bg-slate-50 transition flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-pastel-green flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/12dc9337e1-67da3e9bb9476b9ad0f7.png" alt="ESG" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-800 text-lg">ESG no Mercado Financeiro</h3>
                      <Button className="px-3 py-1 bg-pastel-green/30 text-slate-700 hover:bg-pastel-green rounded text-xs font-medium">
                        Seguindo
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                      Debates sobre investimentos sustentáveis, green bonds e governança corporativa.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> 5.4k membros
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Sustentabilidade
                      </span>
                      <span className="text-xs text-pastel-dark-green font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span> 12 novos tópicos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-4 hover:bg-slate-50 transition flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-pastel-yellow flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0d113c67e7-7b69a19d50977feb01f0.png" alt="Cartões" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-800 text-lg">Indústria de Cartões & Adquirência</h3>
                      <Button variant="outline" className="px-3 py-1 border border-slate-200 text-slate-600 hover:bg-pastel-yellow hover:text-slate-800 hover:border-pastel-yellow rounded text-xs font-medium">
                        Seguir
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                      Tudo sobre bandeiras, adquirentes, subadquirentes e tecnologias de pagamento contactless.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> 9.1k membros
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Pagamentos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-4 hover:bg-slate-50 transition flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-pastel-pink flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/847109957d-5a9eb464bbc7c7e673a2.png" alt="Mulheres" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-800 text-lg">Mulheres no Mercado Financeiro</h3>
                      <Button className="px-3 py-1 bg-pastel-pink/30 text-slate-700 hover:bg-pastel-pink rounded text-xs font-medium">
                        Seguindo
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                      Networking, mentoria e desenvolvimento de carreira para mulheres executivas.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> 18.2k membros
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Carreira
                      </span>
                      <span className="text-xs text-pastel-dark-pink font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span> 45 novos tópicos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="p-4 hover:bg-slate-50 transition flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-pastel-blue flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ea4113851d-aa5cc56583838cee729b.png" alt="Desenvolvedores" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-800 text-lg">Desenvolvedores Open Finance</h3>
                      <Button variant="outline" className="px-3 py-1 border border-slate-200 text-slate-600 hover:bg-pastel-blue hover:text-slate-800 hover:border-pastel-blue rounded text-xs font-medium">
                        Seguir
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                      Comunidade técnica para dev, arquitetos e PMs trabalhando com APIs do Open Finance Brasil.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> 3.8k membros
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Tecnologia
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="p-4 hover:bg-slate-50 transition flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-pastel-purple flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f769b62de9-4bf2c0c6e79b99c98ee2.png" alt="Private Banking" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-800 text-lg">Private Banking & Wealth</h3>
                      <Button variant="outline" className="px-3 py-1 border border-slate-200 text-slate-600 hover:bg-pastel-purple hover:text-slate-800 hover:border-pastel-purple rounded text-xs font-medium">
                        Seguir
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                      Estratégias de sucessão patrimonial, offshore e gestão de grandes fortunas.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> 2.1k membros
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Wealth
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  <Button className="w-8 h-8 bg-pastel-blue text-slate-800 rounded-lg font-medium text-sm">1</Button>
                  <Button variant="ghost" className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded-lg text-sm">2</Button>
                  <Button variant="ghost" className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded-lg text-sm">3</Button>
                  <span className="text-slate-400 px-2">...</span>
                  <Button variant="ghost" className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded-lg text-sm">12</Button>
                  <Button variant="ghost" className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm">
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="w-80 space-y-6 flex-shrink-0">
              {/* Categories */}
              <section className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Categorias</h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-pastel-blue/30 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-sm text-pastel-dark-blue">
                        <University className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Banking</span>
                    </div>
                    <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">24</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-pastel-dark-green transition">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">Investimentos</span>
                    </div>
                    <span className="text-xs text-slate-400">18</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-pastel-dark-pink transition">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">Pagamentos</span>
                    </div>
                    <span className="text-xs text-slate-400">32</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-pastel-dark-purple transition">
                        <Gavel className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">Regulatório</span>
                    </div>
                    <span className="text-xs text-slate-400">15</span>
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-pastel-dark-yellow transition">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">Carreira</span>
                    </div>
                    <span className="text-xs text-slate-400">41</span>
                  </a>
                </div>
              </section>

              {/* Suggestions */}
              <section className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800">Sugeridos para você</h3>
                  <button className="text-xs text-pastel-dark-blue hover:underline">Ver tudo</button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-pastel-green flex-shrink-0 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-800">Finanças Verdes Brasil</h4>
                      <p className="text-xs text-slate-500 mt-0.5 mb-2">2.3k membros</p>
                      <button className="text-xs font-medium text-pastel-dark-blue hover:text-slate-800 transition">Participar</button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-pastel-peach flex-shrink-0 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-800">Day Trade Consciente</h4>
                      <p className="text-xs text-slate-500 mt-0.5 mb-2">8.9k membros</p>
                      <button className="text-xs font-medium text-pastel-dark-blue hover:text-slate-800 transition">Participar</button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-pastel-blue flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-800">IA em Finanças</h4>
                      <p className="text-xs text-slate-500 mt-0.5 mb-2">4.1k membros</p>
                      <button className="text-xs font-medium text-pastel-dark-blue hover:text-slate-800 transition">Participar</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Create Community Promo */}
              <div className="bg-gradient-to-br from-pastel-blue to-pastel-purple rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Plus className="w-5 h-5 text-pastel-dark-purple" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Crie sua Comunidade</h3>
                <p className="text-sm text-slate-600 mb-4">Reúna profissionais em torno de um tema que você domina.</p>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full py-2 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm"
                >
                  Começar Agora
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Create Community Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">Nova Comunidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">Nome da Comunidade</Label>
              <Input 
                type="text" 
                placeholder="Ex: Especialistas em Renda Fixa" 
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">Categoria Principal</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="investimentos">Investimentos</SelectItem>
                  <SelectItem value="pagamentos">Pagamentos</SelectItem>
                  <SelectItem value="regulatorio">Regulatório</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="carreira">Carreira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">Descrição</Label>
              <Textarea 
                rows={3} 
                placeholder="Descreva o propósito da comunidade..." 
                className="resize-none"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">Privacidade</Label>
              <RadioGroup defaultValue="public" className="flex gap-4">
                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 flex-1">
                  <RadioGroupItem value="public" />
                  <div>
                    <span className="block text-sm font-medium text-slate-800">Pública</span>
                    <span className="block text-xs text-slate-500">Qualquer um pode ver e entrar</span>
                  </div>
                </label>
                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 flex-1">
                  <RadioGroupItem value="private" />
                  <div>
                    <span className="block text-sm font-medium text-slate-800">Privada</span>
                    <span className="block text-xs text-slate-500">Apenas convidados</span>
                  </div>
                </label>
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100 mt-2">
              <Button className="flex-1 bg-pastel-purple text-slate-700 hover:bg-pastel-purple/80 shadow-sm">
                Criar Comunidade
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodasComunidades;
