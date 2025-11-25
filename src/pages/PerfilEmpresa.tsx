import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, Share2, ArrowLeft, MapPin, Calendar as CalendarIcon, Users, Star, Check, 
  Globe, Linkedin, Mail, Building2, TrendingUp, FileText, BookOpen, Award, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PerfilEmpresa = () => {
  const [activeTab, setActiveTab] = useState<"mentores" | "seguindo" | "seguidores" | "descobrir" | "empresas">("empresas");
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState<"todos" | "artigos" | "analises" | "relatorios">("todos");
  const navigate = useNavigate();
  const { id } = useParams();

  const empresa = {
    id: 1,
    initial: "I",
    name: "Itaú Unibanco",
    description: "Maior banco privado da América Latina com soluções completas em serviços bancários, investimentos e seguros",
    fullDescription: "O Itaú Unibanco é uma instituição financeira brasileira com mais de 100 anos de história, sendo atualmente o maior banco privado da América Latina. Com presença em diversos países, oferece soluções completas em serviços bancários, investimentos, seguros e previdência para pessoas físicas, empresas e instituições.",
    followers: "142.5k",
    contents: "612",
    location: "São Paulo, SP",
    founded: "1945",
    employees: "98.000+",
    website: "www.itau.com.br",
    tags: ["Banking", "Investimentos", "Seguros", "Cartões", "Open Banking"],
    color: "#F5D5B8",
    stats: [
      { label: "Ativos Totais", value: "R$ 2,3 Tri" },
      { label: "Clientes", value: "58 milhões" },
      { label: "Agências", value: "3.200+" },
      { label: "Rating", value: "Baa2 (Moody's)" }
    ]
  };

  const conteudos = [
    {
      id: 1,
      type: "Artigo",
      title: "Tendências em Open Banking para 2025",
      description: "Análise das principais tendências e inovações no ecossistema de Open Banking",
      author: "Equipe de Inovação Itaú",
      date: "15 Mar 2024",
      readTime: "8 min",
      tags: ["Open Banking", "Inovação"]
    },
    {
      id: 2,
      type: "Análise",
      title: "Panorama do Mercado de Crédito Q1 2024",
      description: "Relatório trimestral sobre a evolução do mercado de crédito brasileiro",
      author: "Itaú Research",
      date: "12 Mar 2024",
      readTime: "15 min",
      tags: ["Crédito", "Mercado"]
    },
    {
      id: 3,
      type: "Relatório",
      title: "ESG e Sustentabilidade no Setor Financeiro",
      description: "Como práticas ESG estão transformando o setor bancário",
      author: "Diretoria de Sustentabilidade",
      date: "08 Mar 2024",
      readTime: "12 min",
      tags: ["ESG", "Sustentabilidade"]
    },
    {
      id: 4,
      type: "Artigo",
      title: "Segurança e Prevenção à Fraudes Digitais",
      description: "Melhores práticas para proteger suas transações financeiras online",
      author: "Equipe de Segurança",
      date: "05 Mar 2024",
      readTime: "6 min",
      tags: ["Segurança", "Tecnologia"]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Perfil da Empresa</h1>
                <p className="text-sm text-slate-500 mt-1">Informações institucionais e conteúdos publicados</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Buttons */}
        <div className="bg-white border-b-2 border-slate-300 px-8 py-4">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setActiveTab("mentores");
                navigate("/mentores");
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition border-2 border-slate-300 ${
                activeTab === "mentores" 
                  ? "bg-[#C5E8D4] text-slate-700" 
                  : "bg-[#B8D4E8] text-slate-700 hover:bg-[#E8C5D8]"
              }`}
            >
              Mentores
            </button>
            <button
              onClick={() => {
                setActiveTab("seguindo");
                navigate("/autores");
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition border-2 border-slate-300 ${
                activeTab === "seguindo" 
                  ? "bg-[#C5E8D4] text-slate-700" 
                  : "bg-[#B8D4E8] text-slate-700 hover:bg-[#E8C5D8]"
              }`}
            >
              Seguindo
            </button>
            <button
              onClick={() => {
                setActiveTab("seguidores");
                navigate("/seguidores");
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition border-2 border-slate-300 ${
                activeTab === "seguidores" 
                  ? "bg-[#C5E8D4] text-slate-700" 
                  : "bg-[#B8D4E8] text-slate-700 hover:bg-[#E8C5D8]"
              }`}
            >
              Seguidores
            </button>
            <button
              onClick={() => {
                setActiveTab("descobrir");
                navigate("/descobrir-novos");
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition border-2 border-slate-300 ${
                activeTab === "descobrir" 
                  ? "bg-[#C5E8D4] text-slate-700" 
                  : "bg-[#B8D4E8] text-slate-700 hover:bg-[#E8C5D8]"
              }`}
            >
              Descobrir Novos
            </button>
            <button
              onClick={() => {
                setActiveTab("empresas");
                navigate("/empresas");
              }}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition border-2 border-slate-300 ${
                activeTab === "empresas" 
                  ? "bg-[#C5E8D4] text-slate-700" 
                  : "bg-[#B8D4E8] text-slate-700 hover:bg-[#E8C5D8]"
              }`}
            >
              Empresas
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Hero Section */}
          <section className="bg-white rounded-2xl border-2 border-slate-300 overflow-hidden mb-6">
            <div className="h-48" style={{ backgroundColor: empresa.color }}></div>
            <div className="px-8 pb-8">
              <div className="flex items-start gap-6 -mt-16">
                <div 
                  className="w-32 h-32 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg text-5xl font-bold text-slate-700"
                  style={{ backgroundColor: empresa.color }}
                >
                  {empresa.initial}
                </div>
                <div className="flex-1 pt-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-slate-800">{empresa.name}</h2>
                        <Award className="text-[#F5D5B8]" size={24} />
                        <span className="px-3 py-1 bg-[#B8D4E8] text-slate-700 rounded-full text-sm font-medium border-2 border-slate-300">
                          Verificada
                        </span>
                      </div>
                      <p className="text-lg text-slate-600 mb-3">{empresa.description}</p>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" />
                          <span>{empresa.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon size={16} className="text-slate-400" />
                          <span>Fundado em {empresa.founded}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-slate-400" />
                          <span>{empresa.employees} colaboradores</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`px-6 py-3 rounded-lg font-medium border-2 border-slate-300 transition ${
                        isFollowing 
                          ? "bg-[#B8D4E8] text-slate-700" 
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <Check size={16} className="inline mr-2" />
                          Seguindo
                        </>
                      ) : (
                        <>
                          <Star size={16} className="inline mr-2" />
                          Seguir
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {empresa.stats.map((stat, index) => (
                  <div key={index} className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-white rounded-2xl border-2 border-slate-300 p-6 mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Building2 size={20} className="text-slate-600" />
              Sobre a Empresa
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">{empresa.fullDescription}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {empresa.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-slate-400 text-white rounded text-sm border-2 border-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Users size={16} className="text-slate-400" />
                <span className="font-medium">{empresa.followers}</span>
                <span>seguidores</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FileText size={16} className="text-slate-400" />
                <span className="font-medium">{empresa.contents}</span>
                <span>conteúdos publicados</span>
              </div>
              <div className="flex items-center gap-2 text-[#B8D4E8] cursor-pointer hover:text-[#D4C5E8]">
                <Globe size={16} />
                <span>{empresa.website}</span>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="bg-white rounded-2xl border-2 border-slate-300 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen size={20} className="text-slate-600" />
                Conteúdos Publicados
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveContentTab("todos")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeContentTab === "todos"
                      ? "bg-[#F5D5B8] text-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveContentTab("artigos")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeContentTab === "artigos"
                      ? "bg-[#F5D5B8] text-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Artigos
                </button>
                <button
                  onClick={() => setActiveContentTab("analises")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeContentTab === "analises"
                      ? "bg-[#F5D5B8] text-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Análises
                </button>
                <button
                  onClick={() => setActiveContentTab("relatorios")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeContentTab === "relatorios"
                      ? "bg-[#F5D5B8] text-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Relatórios
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {conteudos.map((conteudo) => (
                <div key={conteudo.id} className="border-2 border-slate-200 rounded-xl p-5 hover:border-[#F5D5B8] transition cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-[#B8D4E8] text-slate-700 rounded text-xs font-medium border border-slate-300">
                          {conteudo.type}
                        </span>
                        <h4 className="text-lg font-semibold text-slate-800">{conteudo.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{conteudo.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{conteudo.author}</span>
                        <span>•</span>
                        <span>{conteudo.date}</span>
                        <span>•</span>
                        <span>{conteudo.readTime} de leitura</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {conteudo.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-400 text-white rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronLeft size={16} className="inline mr-2" />
                Anterior
              </button>
              <button className="px-4 py-2 bg-[#F5D5B8] text-slate-700 rounded-lg text-sm font-medium border-2 border-slate-300">1</button>
              <button className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">2</button>
              <button className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">3</button>
              <button className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                Próximo
                <ChevronRight size={16} className="inline ml-2" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PerfilEmpresa;
