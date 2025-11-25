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
          <div className="px-8 py-6">
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
            {/* Sidebar Filters */}
            <aside className="w-80 space-y-6">
              {/* Tipo de Empresa */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Tipo de Empresa</h2>
                  <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
                </div>
                <div className="mb-4">
                  <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-blue bg-white text-slate-700">
                    <option value="">Selecione o tipo</option>
                    <option value="banco-comercial">Banco Comercial</option>
                    <option value="banco-investimento">Banco de Investimento</option>
                    <option value="banco-digital">Banco Digital</option>
                    <option value="fintech">Fintech</option>
                    <option value="seguradora">Seguradora</option>
                    <option value="corretora">Corretora</option>
                    <option value="processadora">Processadora de Pagamentos</option>
                    <option value="adquirente">Adquirente</option>
                    <option value="bolsa">Bolsa de Valores</option>
                    <option value="regulador">Órgão Regulador</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Banking', count: 156, color: '#7FA8C9' },
                    { name: 'Fintechs', count: 234, color: '#A68CC9' },
                    { name: 'Investimentos', count: 124, color: '#8CC99B' },
                    { name: 'Seguros', count: 89, color: '#C9B88C' },
                    { name: 'Meios de Pagamento', count: 143, color: '#C99B8C' },
                    { name: 'Mercado de Capitais', count: 67, color: '#E8C5D8' }
                  ].map((type) => (
                    <label key={type.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <i className="fas fa-circle" style={{ fontSize: '8px', color: type.color }}></i>
                      <span className="text-sm text-slate-700 flex-1">{type.name}</span>
                      <span className="text-xs text-slate-500">{type.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Porte da Empresa */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Porte da Empresa</h2>
                <div className="mb-4">
                  <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-blue bg-white text-slate-700">
                    <option value="">Selecione o porte</option>
                    <option value="startup">Startup (1-50 funcionários)</option>
                    <option value="pequeno">Pequeno Porte (51-200)</option>
                    <option value="medio">Médio Porte (201-1000)</option>
                    <option value="grande">Grande Porte (1000+)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Startup', count: 145 },
                    { name: 'Pequeno Porte', count: 89 },
                    { name: 'Médio Porte', count: 134 },
                    { name: 'Grande Porte', count: 98 }
                  ].map((size) => (
                    <label key={size.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{size.name}</span>
                      <span className="text-xs text-slate-500">{size.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Localização */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Localização</h2>
                <div className="mb-4">
                  <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-blue bg-white text-slate-700">
                    <option value="">Selecione a cidade</option>
                    <option value="sp">São Paulo, SP</option>
                    <option value="rj">Rio de Janeiro, RJ</option>
                    <option value="bh">Belo Horizonte, MG</option>
                    <option value="bsb">Brasília, DF</option>
                    <option value="cwb">Curitiba, PR</option>
                    <option value="poa">Porto Alegre, RS</option>
                    <option value="ssa">Salvador, BA</option>
                    <option value="rec">Recife, PE</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'São Paulo, SP', count: 234 },
                    { name: 'Rio de Janeiro, RJ', count: 89 },
                    { name: 'Belo Horizonte, MG', count: 56 },
                    { name: 'Brasília, DF', count: 43 },
                    { name: 'Curitiba, PR', count: 38 }
                  ].map((location) => (
                    <label key={location.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{location.name}</span>
                      <span className="text-xs text-slate-500">{location.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Ano de Fundação */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Ano de Fundação</h2>
                <div className="mb-4">
                  <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pastel-blue bg-white text-slate-700">
                    <option value="">Selecione o período</option>
                    <option value="2020s">2020 em diante</option>
                    <option value="2010s">2010 - 2019</option>
                    <option value="2000s">2000 - 2009</option>
                    <option value="1990s">1990 - 1999</option>
                    <option value="antes-1990">Antes de 1990</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {[
                    { name: '2020 em diante', count: 78 },
                    { name: '2010 - 2019', count: 156 },
                    { name: '2000 - 2009', count: 89 },
                    { name: 'Antes de 2000', count: 143 }
                  ].map((period) => (
                    <label key={period.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{period.name}</span>
                      <span className="text-xs text-slate-500">{period.count}</span>
                    </label>
                  ))}
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
                className={`bg-white rounded-xl border border-slate-200 p-6 hover:${getBorderColor(empresa.color)} transition cursor-pointer`}
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
