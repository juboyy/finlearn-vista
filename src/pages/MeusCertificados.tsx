import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Download, Eye, Award, Calendar, TrendingUp, CheckCircle, Clock, LayoutGrid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Import images
import cursoAnaliseImage from "@/assets/curso-analise-tecnica-illustration.png";
import ebookRiskImage from "@/assets/ebook-risk-management-pink.png";
import newspaperStabilityImage from "@/assets/newspaper-financial-stability.png";
import newspaperOpenFinanceImage from "@/assets/newspaper-open-finance.png";
import newspaperRiskImage from "@/assets/newspaper-risk-management.png";
import relatorioAnaliseImage from "@/assets/relatorio-analise-dados.png";
import relatorioBIImage from "@/assets/relatorio-bi-dashboard.png";
import creditoRuralImage from "@/assets/credito-rural-2025.png";

const MeusCertificados = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const certificates = [
    {
      id: 1,
      title: "Análise Fundamentalista Avançada",
      institution: "Instituto Brasileiro de Mercado de Capitais",
      date: "15/03/2024",
      score: "95/100",
      duration: "40 horas",
      category: "Mercado de Capitais",
      status: "Concluído",
      image: cursoAnaliseImage
    },
    {
      id: 2,
      title: "Gestão de Portfólios e Risco",
      institution: "FGV - Fundação Getulio Vargas",
      date: "22/02/2024",
      score: "92/100",
      duration: "60 horas",
      category: "Gestão de Risco",
      status: "Concluído",
      image: ebookRiskImage
    },
    {
      id: 3,
      title: "Certificação CFA Level I",
      institution: "CFA Institute",
      date: "10/01/2024",
      score: "88/100",
      duration: "300 horas",
      category: "Certificação Internacional",
      status: "Concluído",
      image: newspaperStabilityImage
    },
    {
      id: 4,
      title: "Derivativos Financeiros",
      institution: "B3 Educação",
      date: "05/12/2023",
      score: "97/100",
      duration: "32 horas",
      category: "Derivativos",
      status: "Concluído",
      image: newspaperOpenFinanceImage
    },
    {
      id: 5,
      title: "Valuation e Precificação de Ativos",
      institution: "Insper",
      date: "18/11/2023",
      score: "94/100",
      duration: "48 horas",
      category: "Valuation",
      status: "Concluído",
      image: relatorioAnaliseImage
    },
    {
      id: 6,
      title: "Análise Técnica e Grafista",
      institution: "APIMEC",
      date: "30/10/2023",
      score: "91/100",
      duration: "24 horas",
      category: "Análise Técnica",
      status: "Concluído",
      image: relatorioBIImage
    },
    {
      id: 7,
      title: "Compliance e Regulação do Mercado",
      institution: "CVM - Comissão de Valores Mobiliários",
      date: "Em andamento",
      score: "75/100",
      duration: "52 horas",
      category: "Compliance",
      status: "Em Progresso",
      image: newspaperRiskImage
    },
    {
      id: 8,
      title: "ESG e Investimentos Sustentáveis",
      institution: "FGV - Fundação Getulio Vargas",
      date: "Em andamento",
      score: "68/100",
      duration: "36 horas",
      category: "ESG",
      status: "Em Progresso",
      image: creditoRuralImage
    }
  ];

  const filterCategories = [
    { id: "todos", label: "Todos", count: certificates.length },
    { id: "concluido", label: "Concluídos", count: certificates.filter(c => c.status === "Concluído").length },
    { id: "progresso", label: "Em Progresso", count: certificates.filter(c => c.status === "Em Progresso").length }
  ];

  const filteredCertificates = certificates.filter(cert => {
    if (selectedFilter === "todos") return true;
    if (selectedFilter === "concluido") return cert.status === "Concluído";
    if (selectedFilter === "progresso") return cert.status === "Em Progresso";
    return true;
  });

  const handleDownload = (certId: number) => {
    console.log("Downloading certificate:", certId);
    // Implementar lógica de download
  };

  const handleView = (certId: number) => {
    console.log("Viewing certificate:", certId);
    // Implementar lógica de visualização
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Meus Certificados</h1>
                <p className="text-sm text-slate-500 mt-1">Gerencie e baixe seus certificados conquistados</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Download size={16} className="inline mr-2" />
                Baixar Todos
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pastel-blue/30 to-pastel-blue/10 border border-pastel-blue rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <Award className="text-pastel-dark-gray" size={24} />
                </div>
                <Badge className="bg-pastel-blue/50 text-pastel-dark-gray border-0">Total</Badge>
              </div>
              <p className="text-3xl font-bold text-pastel-dark-gray mb-1">{certificates.length}</p>
              <p className="text-sm text-slate-600">Certificados</p>
            </div>

            <div className="bg-gradient-to-br from-pastel-green/30 to-pastel-green/10 border border-pastel-green rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-pastel-dark-gray" size={24} />
                </div>
                <Badge className="bg-pastel-green/50 text-pastel-dark-gray border-0">Completos</Badge>
              </div>
              <p className="text-3xl font-bold text-pastel-dark-gray mb-1">
                {certificates.filter(c => c.status === "Concluído").length}
              </p>
              <p className="text-sm text-slate-600">Concluídos</p>
            </div>

            <div className="bg-gradient-to-br from-pastel-yellow/30 to-pastel-yellow/10 border border-pastel-yellow rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                  <Clock className="text-pastel-dark-gray" size={24} />
                </div>
                <Badge className="bg-pastel-yellow/50 text-pastel-dark-gray border-0">Ativo</Badge>
              </div>
              <p className="text-3xl font-bold text-pastel-dark-gray mb-1">
                {certificates.filter(c => c.status === "Em Progresso").length}
              </p>
              <p className="text-sm text-slate-600">Em Progresso</p>
            </div>

            <div className="bg-gradient-to-br from-pastel-purple/30 to-pastel-purple/10 border border-pastel-purple rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-pastel-dark-gray" size={24} />
                </div>
                <Badge className="bg-pastel-purple/50 text-pastel-dark-gray border-0">Média</Badge>
              </div>
              <p className="text-3xl font-bold text-pastel-dark-gray mb-1">93%</p>
              <p className="text-sm text-slate-600">Nota Média</p>
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {filterCategories.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedFilter === filter.id
                      ? "bg-pastel-green text-pastel-dark-gray"
                      : "bg-pastel-blue text-slate-700 hover:bg-pastel-pink"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 opacity-75">({filter.count})</span>
                </button>
              ))}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-pastel-green text-pastel-dark-gray"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-pastel-green text-pastel-dark-gray"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Certificates Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gradient-to-br from-pastel-blue/20 to-pastel-purple/20">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Award className="text-pastel-blue" size={28} />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={
                          cert.status === "Concluído"
                            ? "bg-pastel-green text-pastel-dark-gray border-0"
                            : "bg-pastel-yellow text-pastel-dark-gray border-0"
                        }
                      >
                        {cert.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{cert.institution}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-pastel-blue" />
                        <span>{cert.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={16} className="text-pastel-purple" />
                        <span>{cert.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <TrendingUp size={16} className="text-pastel-green" />
                        <span>Nota: {cert.score}</span>
                      </div>
                    </div>

                    <Badge className="bg-pastel-blue/50 text-pastel-dark-gray border-0 mb-4">
                      {cert.category}
                    </Badge>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-pastel-blue text-slate-700 hover:bg-pastel-blue hover:text-pastel-dark-gray"
                        onClick={() => handleView(cert.id)}
                        disabled={cert.status !== "Concluído"}
                      >
                        <Eye size={16} className="mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-pastel-green text-pastel-dark-gray hover:bg-pastel-green/80"
                        onClick={() => handleDownload(cert.id)}
                        disabled={cert.status !== "Concluído"}
                      >
                        <Download size={16} className="mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-6 p-6">
                    {/* Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-pastel-blue/20 to-pastel-purple/20">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute top-2 left-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Award className="text-pastel-blue" size={17} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-slate-600">{cert.institution}</p>
                        </div>
                        <Badge
                          className={
                            cert.status === "Concluído"
                              ? "bg-pastel-green text-pastel-dark-gray border-0"
                              : "bg-pastel-yellow text-pastel-dark-gray border-0"
                          }
                        >
                          {cert.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={16} className="text-pastel-blue" />
                          <span>{cert.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock size={16} className="text-pastel-purple" />
                          <span>{cert.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <TrendingUp size={16} className="text-pastel-green" />
                          <span>Nota: {cert.score}</span>
                        </div>
                        <Badge className="bg-pastel-blue/50 text-pastel-dark-gray border-0">
                          {cert.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-pastel-blue text-slate-700 hover:bg-pastel-blue hover:text-pastel-dark-gray"
                        onClick={() => handleView(cert.id)}
                        disabled={cert.status !== "Concluído"}
                      >
                        <Eye size={16} className="mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-pastel-green text-pastel-dark-gray hover:bg-pastel-green/80"
                        onClick={() => handleDownload(cert.id)}
                        disabled={cert.status !== "Concluído"}
                      >
                        <Download size={16} className="mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredCertificates.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-slate-400" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum certificado encontrado</h3>
              <p className="text-slate-600">
                Não há certificados para os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MeusCertificados;
