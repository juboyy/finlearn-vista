import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Filter, GraduationCap, UserCheck, Users, Search, Building2, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Empresas = () => {
  const navigate = useNavigate();

  const empresas = [
    {
      id: 1,
      initial: "I",
      name: "Itaú Unibanco",
      description: "Maior banco privado da América Latina com soluções completas em serviços bancários, investimentos e seguros",
      followers: "142.5k",
      contents: "612",
      location: "São Paulo, SP",
      founded: "1945",
      tags: ["Banking", "Investimentos", "Seguros", "Cartões", "Open Banking"],
      color: "pastel-orange",
      badgeColor: "pastel-blue",
      iconColor: "pastel-orange",
      isFollowing: false
    },
    {
      id: 2,
      initial: "B",
      name: "Banco do Brasil",
      description: "Instituição financeira com mais de 200 anos, referência em agronegócio e soluções empresariais",
      followers: "98.3k",
      contents: "487",
      location: "Brasília, DF",
      founded: "1808",
      tags: ["Banking", "Agronegócio", "Crédito", "Investimentos"],
      color: "pastel-blue",
      badgeColor: "pastel-green",
      iconColor: "pastel-blue",
      isFollowing: true
    },
    {
      id: 3,
      initial: "N",
      name: "Nubank",
      description: "Maior fintech da América Latina, revolucionando serviços financeiros com tecnologia e simplicidade",
      followers: "215.7k",
      contents: "358",
      location: "São Paulo, SP",
      founded: "2013",
      tags: ["Fintechs", "Cartões", "Investimentos", "Tecnologia"],
      color: "pastel-green",
      badgeColor: "pastel-purple",
      iconColor: "pastel-green",
      isFollowing: false
    },
    {
      id: 4,
      initial: "B",
      name: "B3 - Brasil Bolsa Balcão",
      description: "Principal bolsa de valores do Brasil, oferecendo infraestrutura para negociação de ativos financeiros",
      followers: "187.2k",
      contents: "523",
      location: "São Paulo, SP",
      founded: "2008",
      tags: ["Mercado de Capitais", "Bolsa de Valores", "Renda Variável"],
      color: "pastel-purple",
      badgeColor: "pastel-yellow",
      iconColor: "pastel-purple",
      isFollowing: true
    },
    {
      id: 5,
      initial: "X",
      name: "XP Investimentos",
      description: "Plataforma líder em investimentos no Brasil, oferecendo ampla gama de produtos financeiros",
      followers: "156.8k",
      contents: "691",
      location: "São Paulo, SP",
      founded: "2001",
      tags: ["Investimentos", "Corretora", "Renda Fixa", "Renda Variável"],
      color: "pastel-yellow",
      badgeColor: "pastel-pink",
      iconColor: "pastel-yellow",
      isFollowing: false
    },
    {
      id: 6,
      initial: "S",
      name: "Stone",
      description: "Empresa de tecnologia financeira especializada em soluções de pagamento para negócios",
      followers: "89.4k",
      contents: "234",
      location: "Rio de Janeiro, RJ",
      founded: "2012",
      tags: ["Meios de Pagamento", "Maquininhas", "Tecnologia"],
      color: "pastel-pink",
      badgeColor: "pastel-orange",
      iconColor: "pastel-pink",
      isFollowing: false
    },
    {
      id: 7,
      initial: "B",
      name: "Bradesco",
      description: "Um dos maiores bancos privados do Brasil, com forte presença em seguros e previdência",
      followers: "124.6k",
      contents: "445",
      location: "Osasco, SP",
      founded: "1943",
      tags: ["Banking", "Seguros", "Previdência", "Investimentos"],
      color: "pastel-peach",
      badgeColor: "pastel-blue",
      iconColor: "pastel-peach",
      isFollowing: false
    },
    {
      id: 8,
      initial: "C",
      name: "Cielo",
      description: "Líder em meios de pagamento eletrônico no Brasil, oferecendo soluções completas para estabelecimentos",
      followers: "76.9k",
      contents: "312",
      location: "Barueri, SP",
      founded: "1995",
      tags: ["Meios de Pagamento", "Adquirência", "Tecnologia"],
      color: "pastel-orange",
      badgeColor: "pastel-green",
      iconColor: "pastel-orange",
      isFollowing: true
    },
    {
      id: 9,
      initial: "S",
      name: "Santander Brasil",
      description: "Instituição financeira global com forte presença no Brasil, oferecendo serviços bancários completos",
      followers: "108.3k",
      contents: "398",
      location: "São Paulo, SP",
      founded: "1857",
      tags: ["Banking", "Crédito", "Investimentos", "Global"],
      color: "pastel-blue",
      badgeColor: "pastel-purple",
      iconColor: "pastel-blue",
      isFollowing: false
    },
    {
      id: 10,
      initial: "I",
      name: "Inter",
      description: "Banco digital completo com super app oferecendo serviços financeiros integrados",
      followers: "92.1k",
      contents: "276",
      location: "Belo Horizonte, MG",
      founded: "1994",
      tags: ["Banco Digital", "Investimentos", "Super App"],
      color: "pastel-green",
      badgeColor: "pastel-yellow",
      iconColor: "pastel-green",
      isFollowing: false
    },
    {
      id: 11,
      initial: "P",
      name: "PagSeguro",
      description: "Ecossistema completo de pagamentos e serviços financeiros para empreendedores",
      followers: "67.5k",
      contents: "189",
      location: "São Paulo, SP",
      founded: "2006",
      tags: ["Meios de Pagamento", "E-commerce", "Banking"],
      color: "pastel-purple",
      badgeColor: "pastel-pink",
      iconColor: "pastel-purple",
      isFollowing: false
    }
  ];

  const categories = [
    "Todas",
    "Banking",
    "Investimentos",
    "Seguros",
    "Fintechs",
    "Meios de Pagamento",
    "Mercado de Capitais"
  ];

  const getBgColor = (color: string) => {
    const colors: Record<string, string> = {
      "pastel-orange": "bg-[#F5D5B8]",
      "pastel-blue": "bg-[#B8D4E8]",
      "pastel-green": "bg-[#C5E8D4]",
      "pastel-purple": "bg-[#D4C5E8]",
      "pastel-yellow": "bg-[#E8E0C5]",
      "pastel-pink": "bg-[#E8C5D8]",
      "pastel-peach": "bg-[#E8D4C5]"
    };
    return colors[color] || "bg-[#B8D4E8]";
  };

  const getBorderColor = (color: string) => {
    const colors: Record<string, string> = {
      "pastel-orange": "border-[#F5D5B8]",
      "pastel-blue": "border-[#B8D4E8]",
      "pastel-green": "border-[#C5E8D4]",
      "pastel-purple": "border-[#D4C5E8]",
      "pastel-yellow": "border-[#E8E0C5]",
      "pastel-pink": "border-[#E8C5D8]",
      "pastel-peach": "border-[#E8D4C5]"
    };
    return colors[color] || "border-[#B8D4E8]";
  };

  const getTextColor = (color: string) => {
    const colors: Record<string, string> = {
      "pastel-orange": "text-[#F5D5B8]",
      "pastel-blue": "text-[#B8D4E8]",
      "pastel-green": "text-[#C5E8D4]",
      "pastel-purple": "text-[#D4C5E8]",
      "pastel-yellow": "text-[#E8E0C5]",
      "pastel-pink": "text-[#E8C5D8]",
      "pastel-peach": "text-[#E8D4C5]"
    };
    return colors[color] || "text-[#B8D4E8]";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Empresas</h1>
                <p className="text-sm text-slate-500 mt-1">Descubra e siga empresas do mercado financeiro</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Filter size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar Cards */}
            <aside className="w-80 space-y-6">
              {/* Empresas que Você Segue */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Suas Empresas</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">12</p>
                      <p className="text-sm text-slate-600">Empresas seguindo</p>
                    </div>
                    <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center">
                      <i className="fas fa-star text-slate-700 text-xl"></i>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">847</p>
                      <p className="text-sm text-slate-600">Conteúdos lidos</p>
                    </div>
                    <div className="w-12 h-12 bg-[#C5E8D4] rounded-lg flex items-center justify-center">
                      <i className="fas fa-book-open text-slate-700 text-xl"></i>
                    </div>
                  </div>
                </div>
              </section>

              {/* Empresa Mais Lida */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Mais Lida por Você</h2>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-16 h-16 bg-[#B8D4E8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl font-bold text-slate-700">B</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800">Banco do Brasil</h3>
                    <p className="text-xs text-slate-600">156 conteúdos lidos</p>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-[#B8D4E8]" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-xs text-slate-600">75%</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Trends - Empresas em Alta */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Trends - Em Alta</h2>
                  <i className="fas fa-fire text-[#F5D5B8]"></i>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Nubank', growth: '+45%', color: '#C5E8D4', followers: '215.7k' },
                    { name: 'Stone', growth: '+32%', color: '#E8C5D8', followers: '89.4k' },
                    { name: 'Inter', growth: '+28%', color: '#C5E8D4', followers: '92.1k' },
                    { name: 'XP Investimentos', growth: '+24%', color: '#E8E0C5', followers: '156.8k' }
                  ].map((trend) => (
                    <div key={trend.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: trend.color }}></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{trend.name}</p>
                          <p className="text-xs text-slate-500">{trend.followers} seguidores</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#C5E8D4]">{trend.growth}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tags Populares */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Tags Populares</h2>
                <div className="space-y-2">
                  {[
                    { tag: 'Banking', count: 156, color: '#7FA8C9' },
                    { tag: 'Fintechs', count: 234, color: '#A68CC9' },
                    { tag: 'Investimentos', count: 124, color: '#8CC99B' },
                    { tag: 'Meios de Pagamento', count: 143, color: '#C99B8C' },
                    { tag: 'Seguros', count: 89, color: '#C9B88C' },
                    { tag: 'Mercado de Capitais', count: 67, color: '#E8C5D8' }
                  ].map((item) => (
                    <div key={item.tag} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                      <div className="flex items-center gap-3">
                        <i className="fas fa-circle" style={{ fontSize: '8px', color: item.color }}></i>
                        <span className="text-sm text-slate-700">{item.tag}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{item.count}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Empresas Verificadas */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-certificate text-[#B8D4E8]"></i>
                      <span className="text-sm text-slate-700">Verificadas</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">466</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-building text-[#D4C5E8]"></i>
                      <span className="text-sm text-slate-700">Total Empresas</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">612</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-file-alt text-[#C5E8D4]"></i>
                      <span className="text-sm text-slate-700">Conteúdos</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">8,942</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-users text-[#E8C5D8]"></i>
                      <span className="text-sm text-slate-700">Seguidores Total</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">2.1M</span>
                  </div>
                </div>
              </section>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Category Filters */}
              <section className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-slate-700">Filtrar por categoria:</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <button
                        key={category}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                          index === 0
                            ? "bg-[#F5D5B8] text-slate-700 hover:bg-opacity-80"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Navigation Tabs */}
              <section className="bg-white rounded-xl p-4 border-2 border-slate-300">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/mentores")}
                className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <GraduationCap size={18} />
                Mentores
              </button>
              <button 
                onClick={() => navigate("/autores")}
                className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <UserCheck size={18} />
                Seguindo
              </button>
              <button 
                onClick={() => navigate("/seguidores")}
                className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <Users size={18} />
                Seguidores
              </button>
              <button 
                onClick={() => navigate("/descobrir-novos")}
                className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <Search size={18} />
                Descobrir Novos
              </button>
              <button 
                className="px-6 py-2.5 bg-[hsl(142,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <Building2 size={18} />
                Empresas
              </button>
            </div>
          </section>

              {/* Companies List */}
              <section className="space-y-4">
            {empresas.map((empresa) => (
              <div
                key={empresa.id}
                onClick={() => empresa.name === "Itaú Unibanco" && navigate('/perfil-empresa/1')}
                className={`bg-white rounded-xl border border-slate-200 p-6 hover:${getBorderColor(empresa.color)} transition ${empresa.name === "Itaú Unibanco" ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-start gap-6">
                  {/* Company Logo/Initial */}
                  <div className={`w-24 h-24 ${getBgColor(empresa.color)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <div className="text-4xl font-bold text-slate-700">{empresa.initial}</div>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        {/* Company Name and Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{empresa.name}</h3>
                          <i className={`fas fa-certificate ${getTextColor(empresa.iconColor)}`}></i>
                          <span className={`px-2 py-0.5 ${getBgColor(empresa.badgeColor)} text-slate-700 rounded-full text-xs font-medium`}>
                            Verificada
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 mb-3">{empresa.description}</p>

                        {/* Company Stats */}
                        <div className="flex items-center gap-6 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <i className="fas fa-users"></i>
                            {empresa.followers} seguidores
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-file-alt"></i>
                            {empresa.contents} conteúdos
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            {empresa.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-calendar"></i>
                            Fundado em {empresa.founded}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {empresa.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-slate-400 text-white rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Follow Button */}
                      {empresa.isFollowing ? (
                        <button className={`px-6 py-2.5 ${getBgColor(empresa.color)} text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition whitespace-nowrap ml-4`}>
                          <Check size={14} className="inline mr-2" />
                          Seguindo
                        </button>
                      ) : (
                        <button className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition whitespace-nowrap ml-4">
                          <Star size={14} className="inline mr-2" />
                          Seguir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

              {/* Pagination */}
              <section className="mt-8 flex items-center justify-center gap-2">
            <button
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <ChevronLeft size={14} className="inline mr-2" />
              Anterior
            </button>
            <button className="px-4 py-2 bg-[#F5D5B8] text-slate-700 rounded-lg text-sm font-medium">1</button>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">2</button>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">3</button>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">4</button>
            <span className="px-3 text-slate-500">...</span>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">12</button>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
              Próximo
              <ChevronRight size={14} className="inline ml-2" />
            </button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Empresas;
