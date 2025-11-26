import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Search, Bell, ArrowLeft, Wrench, FileText, TrendingUp, Scale, Calculator, Megaphone, Target, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ferramentas = [
  {
    id: 1,
    nome: "Revisor de Contratos",
    descricao: "Análise automática de contratos com verificação de cláusulas e riscos",
    area: "Jurídico",
    icon: Scale,
    color: "hsl(142, 35%, 75%)"
  },
  {
    id: 2,
    nome: "Resumo de Contratos",
    descricao: "Geração de resumos executivos de documentos contratuais",
    area: "Jurídico",
    icon: FileText,
    color: "hsl(142, 35%, 75%)"
  },
  {
    id: 3,
    nome: "Busca de dados do Mercado",
    descricao: "Pesquisa e análise de dados financeiros e indicadores de mercado",
    area: "Marketing",
    icon: TrendingUp,
    color: "hsl(280, 35%, 75%)"
  },
  {
    id: 4,
    nome: "Resumo de DRE",
    descricao: "Análise e sumarização de Demonstrações do Resultado do Exercício",
    area: "Contábil",
    icon: Calculator,
    color: "hsl(207, 35%, 75%)"
  },
  {
    id: 5,
    nome: "Modelos de envio de Informes Legais",
    descricao: "Templates e estruturas para envio de informações regulatórias obrigatórias",
    area: "Jurídico",
    icon: FileText,
    color: "hsl(142, 35%, 75%)"
  },
  {
    id: 6,
    nome: "Notas Explicativas de artigos Bacen",
    descricao: "Interpretação e contextualização de normativos do Banco Central",
    area: "Jurídico",
    icon: FileText,
    color: "hsl(142, 35%, 75%)"
  },
  {
    id: 7,
    nome: "Notas Explicativas de artigo CVM",
    descricao: "Interpretação e contextualização de normativos da Comissão de Valores Mobiliários",
    area: "Jurídico",
    icon: FileText,
    color: "hsl(142, 35%, 75%)"
  },
  {
    id: 8,
    nome: "PRD de Features",
    descricao: "Criação de Product Requirement Documents para novas funcionalidades",
    area: "Marketing",
    icon: Target,
    color: "hsl(280, 35%, 75%)"
  },
  {
    id: 9,
    nome: "Análise de Concorrentes",
    descricao: "Estudo comparativo de posicionamento e estratégias competitivas",
    area: "Marketing",
    icon: Megaphone,
    color: "hsl(280, 35%, 75%)"
  }
];

const areaColors: Record<string, string> = {
  "Jurídico": "hsl(142, 35%, 75%)",
  "Contábil": "hsl(207, 35%, 75%)",
  "Marketing": "hsl(280, 35%, 75%)"
};

export default function Ferramentas() {
  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/biblioteca" className="p-2 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5C6E3' }}>
                  <Wrench className="h-5 w-5 text-slate-700" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-800">Ferramentas IA</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar ferramentas..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              <Button 
                className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700 gap-2"
              >
                <Store className="h-4 w-4" />
                Marketplace
              </Button>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Total de Ferramentas</span>
                  <Wrench className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-3xl font-semibold text-slate-800">9</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Área Jurídica</span>
                  <Scale className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-3xl font-semibold text-slate-800">5</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Área Contábil</span>
                  <Calculator className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-3xl font-semibold text-slate-800">1</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm">Área Marketing</span>
                  <Megaphone className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-3xl font-semibold text-slate-800">3</p>
              </div>
            </div>

            {/* Tools List */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Todas as Ferramentas</h2>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-16">Ícone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Ferramenta</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">Área</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ferramentas.map((ferramenta) => {
                    const isResumoContratos = ferramenta.id === 2;
                    const RowContent = (
                      <>
                      <td className="px-6 py-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: ferramenta.color }}
                        >
                          <ferramenta.icon className="h-5 w-5 text-slate-700" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-800">
                          {ferramenta.nome}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">
                          {ferramenta.descricao}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          style={{ 
                            backgroundColor: areaColors[ferramenta.area],
                            color: 'hsl(215, 20%, 30%)'
                          }}
                          className="text-xs font-medium whitespace-nowrap"
                        >
                          {ferramenta.area}
                        </Badge>
                      </td>
                      </>
                    );

                    return isResumoContratos ? (
                      <tr key={ferramenta.id} className="hover:bg-slate-50 transition-colors">
                        <Link to="/resumo-contratos" className="contents">
                          {RowContent}
                        </Link>
                      </tr>
                    ) : (
                      <tr 
                        key={ferramenta.id}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        {RowContent}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
