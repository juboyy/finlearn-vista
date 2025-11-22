import { useState } from "react";
import { Search, Bell, Plus, MoreHorizontal, Bookmark, ChevronLeft, ChevronRight, Newspaper, Globe, Calendar, Clock, Star as StarIcon, Circle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const HistoricoDocumentos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [viewType, setViewType] = useState("grid");
  const [filterType, setFilterType] = useState("Todas");

  const categories = [
    { name: "Todas", count: 142, color: "bg-pastel-blue", dotColor: "text-slate-600" },
    { name: "Análise de Mercado", count: 45, color: "bg-[#7FA8C9]", dotColor: "text-[#7FA8C9]" },
    { name: "Regulamentação", count: 28, color: "bg-[#A68CC9]", dotColor: "text-[#A68CC9]" },
    { name: "Criptomoedas", count: 32, color: "bg-[#8CC99B]", dotColor: "text-[#8CC99B]" },
    { name: "Investimentos", count: 22, color: "bg-[#C9B88C]", dotColor: "text-[#C9B88C]" },
    { name: "Tecnologia", count: 15, color: "bg-[#C99B8C]", dotColor: "text-[#C99B8C]" },
  ];

  const sources = [
    { name: "Valor Econômico", count: 38 },
    { name: "InfoMoney", count: 26 },
    { name: "CoinDesk", count: 19 },
    { name: "CVM", count: 15 },
  ];

  const recentActivity = [
    { type: "completed", title: "Artigo concluído", description: "DeFi e o futuro dos pagamentos", time: "1 hora atrás", bgColor: "bg-pastel-green" },
    { type: "saved", title: "Artigo salvo", description: "Nova resolução CVM", time: "3 horas atrás", bgColor: "bg-pastel-yellow" },
    { type: "shared", title: "Artigo compartilhado", description: "Análise SWOT - Banco XYZ", time: "Ontem", bgColor: "bg-pastel-purple" },
  ];

  const articles = [
    {
      id: 1,
      title: "Análise: Tendências do Mercado de Cartões em 2024",
      category: "Cartão de Crédito",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#7FA8C9]",
      readTime: "8 min de leitura",
      progress: 100,
      progressColor: "bg-[#7FA8C9]",
      readDate: "17/11/2024",
      readAgo: "há 1 hora",
      source: "Valor Econômico",
      saved: false,
    },
    {
      id: 2,
      title: "Nova Resolução CVM sobre Fundos de Investimento",
      category: "Regulamentação",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      readTime: "12 min de leitura",
      progress: 75,
      progressColor: "bg-[#A68CC9]",
      readDate: "16/11/2024",
      readAgo: "há 3 horas",
      source: "CVM",
      saved: true,
    },
    {
      id: 3,
      title: "Como Identificar Oportunidades em Ações Small Caps",
      category: "Análise de Mercado",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      readTime: "15 min de leitura",
      progress: 100,
      progressColor: "bg-[#7FA8C9]",
      readDate: "16/11/2024",
      readAgo: "ontem",
      source: "Valor Econômico",
      saved: false,
    },
    {
      id: 4,
      title: "Diversificação de Portfólio: Estratégias para 2024",
      category: "Investimentos",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      readTime: "10 min de leitura",
      progress: 100,
      progressColor: "bg-[#C9B88C]",
      readDate: "15/11/2024",
      readAgo: "há 2 dias",
      source: "InfoMoney",
      saved: true,
    },
    {
      id: 5,
      title: "IA e Machine Learning no Trading Algorítmico",
      category: "Tecnologia",
      categoryColor: "bg-[#C99B8C]",
      iconColor: "bg-[#C99B8C]",
      readTime: "18 min de leitura",
      progress: 45,
      progressColor: "bg-[#C99B8C]",
      readDate: "14/11/2024",
      readAgo: "há 3 dias",
      source: "Valor Econômico",
      saved: false,
    },
    {
      id: 6,
      title: "Programa de Benefícios em Cartões: Guia Completo",
      category: "Cartão de Crédito",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      readTime: "14 min de leitura",
      progress: 100,
      progressColor: "bg-[#8CC99B]",
      readDate: "13/11/2024",
      readAgo: "há 4 dias",
      source: "InfoMoney",
      saved: false,
    },
    {
      id: 7,
      title: "Compliance: Novas Diretrizes do Banco Central",
      category: "Regulamentação",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      readTime: "11 min de leitura",
      progress: 100,
      progressColor: "bg-[#A68CC9]",
      readDate: "12/11/2024",
      readAgo: "há 5 dias",
      source: "InfoMoney",
      saved: false,
    },
    {
      id: 8,
      title: "Análise Técnica: Padrões de Candlestick",
      category: "Análise de Mercado",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      readTime: "16 min de leitura",
      progress: 100,
      progressColor: "bg-[#7FA8C9]",
      readDate: "11/11/2024",
      readAgo: "há 6 dias",
      source: "Valor Econômico",
      saved: true,
    },
    {
      id: 9,
      title: "ETFs: Guia Completo para Iniciantes",
      category: "Investimentos",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      readTime: "13 min de leitura",
      progress: 60,
      progressColor: "bg-[#C9B88C]",
      readDate: "10/11/2024",
      readAgo: "há 1 semana",
      source: "InfoMoney",
      saved: false,
    },
    {
      id: 10,
      title: "Segurança em Pagamentos: Prevenção de Fraudes",
      category: "Cartão de Crédito",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      readTime: "9 min de leitura",
      progress: 100,
      progressColor: "bg-[#8CC99B]",
      readDate: "09/11/2024",
      readAgo: "há 1 semana",
      source: "Valor Econômico",
      saved: false,
    },
  ];

  return (
    <div className="flex gap-6">
      <aside className="w-80 space-y-6">
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas de Leitura</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <Newspaper className="text-slate-700 w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700">Total Lidos</span>
              </div>
              <span className="font-semibold text-slate-800">142</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                  <Calendar className="text-slate-700 w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700">Esta Semana</span>
              </div>
              <span className="font-semibold text-slate-800">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <Clock className="text-slate-700 w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700">Tempo Médio</span>
              </div>
              <span className="font-semibold text-slate-800">12 min</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                  <Bookmark className="text-slate-700 w-4 h-4" />
                </div>
                <span className="text-sm text-slate-700">Salvos</span>
              </div>
              <span className="font-semibold text-slate-800">34</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
            <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
          </div>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                  selectedCategory === cat.name
                    ? "bg-pastel-blue text-slate-800"
                    : "hover:bg-slate-100"
                }`}
              >
                <Circle className={`w-2 h-2 ${cat.dotColor} fill-current`} />
                <span className="text-sm font-medium flex-1">{cat.name}</span>
                <span className={`text-xs ${selectedCategory === cat.name ? "bg-white px-2 py-1 rounded-full" : "text-slate-500"}`}>
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Fontes</h2>
          <div className="space-y-3">
            {sources.map((source) => (
              <div key={source.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <Globe className="text-slate-600 w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{source.name}</p>
                  <p className="text-xs text-slate-500">{source.count} artigos</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-6 h-6 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                  {activity.type === "completed" && <i className="fas fa-check text-slate-700 text-xs"></i>}
                  {activity.type === "saved" && <Bookmark className="text-slate-700 w-3 h-3" />}
                  {activity.type === "shared" && <i className="fas fa-share text-slate-700 text-xs"></i>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.description}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <div className="flex-1 space-y-6">
        <section className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Visualizar:</span>
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 rounded-lg transition ${
                    viewType === "grid" ? "bg-pastel-blue text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <i className="fas fa-th-large"></i>
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded-lg transition ${
                    viewType === "list" ? "bg-pastel-blue text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue appearance-none pr-8 bg-white text-slate-700">
                  <option>Modificado recentemente</option>
                  <option>Lido recentemente</option>
                  <option>Título (A-Z)</option>
                  <option>Data de publicação</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterType("Todas")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                  filterType === "Todas" ? "bg-pastel-green text-slate-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <i className="fas fa-layer-group"></i>
                <span>Todas</span>
              </button>
              <button
                onClick={() => setFilterType("Notas")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                  filterType === "Notas" ? "bg-pastel-green text-slate-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <i className="far fa-file-lines"></i>
                <span>Notas</span>
              </button>
              <button
                onClick={() => setFilterType("Salvos")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                  filterType === "Salvos" ? "bg-pastel-green text-slate-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <i className="far fa-bookmark"></i>
                <span>Salvos</span>
              </button>
              <button
                onClick={() => setFilterType("Favoritos")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                  filterType === "Favoritos" ? "bg-pastel-green text-slate-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <i className="far fa-star"></i>
                <span>Favoritos</span>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
              <div className="col-span-4">Artigo</div>
              <div className="col-span-2">Categoria</div>
              <div className="col-span-3">Fonte</div>
              <div className="col-span-2">Lido em</div>
              <div className="col-span-1 text-right">Ações</div>
            </div>
          </div>

          {articles.map((article) => (
            <div
              key={article.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                <div className="col-span-4 flex items-center gap-4">
                  <div className={`w-10 h-10 ${article.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Newspaper className="text-slate-600 w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                      {article.title}
                      {article.saved && <Bookmark className="text-yellow-500 w-3 h-3 fill-current" />}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 bg-slate-200 rounded-full h-1">
                          <div className={`${article.progressColor} h-1 rounded-full`} style={{ width: `${article.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-slate-500">{article.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 ${article.categoryColor} text-slate-700 rounded-full text-xs font-medium`}>
                    <Circle className="w-1.5 h-1.5 fill-current" />
                    {article.category}
                  </span>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                      <Globe className="text-slate-600 w-3 h-3" />
                    </div>
                    <span className="text-sm text-slate-700">{article.source}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-slate-700">{article.readDate}</div>
                  <div className="text-xs text-slate-500">{article.readAgo}</div>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button className={`p-2 transition-colors ${article.saved ? "text-yellow-600 hover:text-yellow-700" : "text-slate-400 hover:text-yellow-600"}`}>
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="flex items-center justify-center pt-6">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>
            <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium">1</button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">2</button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">3</button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">4</button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">5</button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-2">
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">Adicionar Artigo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">URL do Artigo</label>
              <Input type="url" placeholder="https://exemplo.com/artigo" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
              <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue text-slate-700">
                <option>Análise de Mercado</option>
                <option>Regulamentação</option>
                <option>Criptomoedas</option>
                <option>Investimentos</option>
                <option>Tecnologia</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-pastel-blue text-slate-700 hover:bg-opacity-80">
                Adicionar
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
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
