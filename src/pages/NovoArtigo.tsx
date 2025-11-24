import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Eye, Share2, Save, ChevronDown, Bold, Italic, Underline, List, ListOrdered, CheckSquare, Link as LinkIcon, Code, BarChart3, Table, Plus, Search, MoreVertical, Heart, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Plot from 'react-plotly.js';

export default function NovoArtigo() {
  const [selectedAgent, setSelectedAgent] = useState({
    name: "Agente Analista",
    description: "Especialista em análise de mercado",
    color: "bg-pastel-blue",
    icon: "chart-line"
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const agents = [
    { name: "Agente Analista", description: "Especialista em análise de mercado", color: "bg-pastel-blue", icon: "chart-line" },
    { name: "Agente Compliance", description: "Especialista em conformidade regulatória", color: "bg-pastel-green", icon: "shield-alt" },
    { name: "Agente Estrategista", description: "Especialista em estratégia de investimentos", color: "bg-pastel-purple", icon: "lightbulb" },
    { name: "Agente Risco", description: "Especialista em gestão de riscos", color: "bg-pastel-yellow", icon: "exclamation-triangle" },
    { name: "Agente Escritor", description: "Especialista em redação financeira", color: "bg-pastel-pink", icon: "pen" }
  ];

  const documents = [
    {
      title: "Análise de Mercado Q4 2024",
      time: "Editado há 2 horas",
      charts: 3,
      tables: 2,
      active: true
    },
    {
      title: "Relatório de Compliance",
      time: "Editado ontem",
      tables: 5,
      active: false
    },
    {
      title: "Estratégia de Investimentos 2025",
      time: "Editado há 3 dias",
      charts: 6,
      active: false
    },
    {
      title: "Notas de Reunião - CVM",
      time: "Editado há 1 semana",
      active: false
    },
    {
      title: "Análise Técnica - IBOV",
      time: "Editado há 2 semanas",
      charts: 4,
      active: false
    }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#ai-agent-btn') && !target.closest('#ai-agent-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />

      {/* Documents Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Meus Documentos</h2>
            <button className="w-8 h-8 bg-pastel-blue text-slate-700 rounded-lg flex items-center justify-center hover:bg-opacity-80 transition">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full px-4 py-2 pl-10 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs">
            <button className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg font-medium">Todos</button>
            <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Recentes</button>
            <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Favoritos</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer ${
                doc.active
                  ? 'bg-pastel-blue border-slate-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              } transition`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">{doc.title}</h3>
                  <p className="text-xs text-slate-500">{doc.time}</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-3 h-3" />
                </button>
              </div>
              {(doc.charts || doc.tables) && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  {doc.charts && (
                    <>
                      <BarChart3 className="w-3 h-3" />
                      <span>{doc.charts} gráficos</span>
                    </>
                  )}
                  {doc.charts && doc.tables && <span>•</span>}
                  {doc.tables && (
                    <>
                      <Table className="w-3 h-3" />
                      <span>{doc.tables} tabelas</span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <input
                type="text"
                defaultValue="Análise de Mercado Q4 2024"
                className="text-2xl font-semibold text-slate-800 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Pré-visualizar
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
              <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>

          {/* Subheader - Agente IA */}
          <div className="px-8 py-3 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Assistido por:</span>
              <div className="relative">
                <button
                  id="ai-agent-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 rounded-lg font-medium transition text-sm flex items-center gap-3 border border-slate-200"
                >
                  <div className={`w-7 h-7 ${selectedAgent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas fa-${selectedAgent.icon} text-slate-700 text-xs`}></i>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-slate-800 font-medium">{selectedAgent.name}</span>
                    <span className="text-xs text-slate-500">{selectedAgent.description}</span>
                  </div>
                  <ChevronDown className="text-slate-400 w-4 h-4 ml-2" />
                </button>

                {dropdownOpen && (
                  <div id="ai-agent-dropdown" className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Escolher Agente de IA</div>
                      {agents.map((agent, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedAgent(agent);
                            setDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg transition flex items-start gap-3"
                        >
                          <div className={`w-8 h-8 ${agent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <i className={`fas fa-${agent.icon} text-slate-700 text-sm`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-800 text-sm">{agent.name}</div>
                            <div className="text-xs text-slate-500">{agent.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-8 py-3 border-t border-slate-200 flex items-center gap-2">
            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Negrito">
                <Bold className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Itálico">
                <Italic className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Sublinhado">
                <Underline className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Título 1">
                <span className="text-sm font-semibold">H1</span>
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Título 2">
                <span className="text-sm font-semibold">H2</span>
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Título 3">
                <span className="text-sm font-semibold">H3</span>
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Lista com marcadores">
                <List className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Lista numerada">
                <ListOrdered className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Checklist">
                <CheckSquare className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Adicionar link">
                <LinkIcon className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center" title="Adicionar código">
                <Code className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded flex items-center gap-2 text-sm font-medium" title="Adicionar gráfico">
                <BarChart3 className="w-4 h-4" />
                <span>Gráfico</span>
              </button>
              <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded flex items-center gap-2 text-sm font-medium" title="Adicionar tabela">
                <Table className="w-4 h-4" />
                <span>Tabela</span>
              </button>
            </div>
          </div>
        </header>

        {/* Document Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-slate max-w-none">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Análise de Mercado Q4 2024</h1>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>Última edição: 15 de novembro de 2024, 14:32</span>
                  <span>•</span>
                  <span>Por João Silva</span>
                </div>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Resumo Executivo</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  O quarto trimestre de 2024 apresentou um cenário de volatilidade moderada nos mercados financeiros globais, impulsionado principalmente por decisões de política monetária dos principais bancos centrais e tensões geopolíticas pontuais.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Neste relatório, analisamos os principais indicadores macroeconômicos, o desempenho dos ativos de renda variável e fixa, além de apresentar projeções para o primeiro trimestre de 2025.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Principais Indicadores</h2>
                
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Desempenho dos Índices Principais</h3>
                  <Plot
                    data={[
                      {
                        type: 'bar',
                        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
                        y: [115200, 117800, 119500, 121300, 118900, 122400, 124100, 123500, 125800, 126900, 127458],
                        name: 'IBOVESPA',
                        marker: { color: '#B8D4E8' }
                      },
                      {
                        type: 'bar',
                        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
                        y: [4100, 4150, 4220, 4280, 4190, 4310, 4380, 4420, 4490, 4540, 4589],
                        name: 'S&P 500',
                        marker: { color: '#C5E8D4' }
                      }
                    ]}
                    layout={{
                      xaxis: { title: 'Mês' },
                      yaxis: { title: 'Pontos' },
                      margin: { t: 40, r: 20, b: 60, l: 60 },
                      plot_bgcolor: '#ffffff',
                      paper_bgcolor: '#ffffff',
                      showlegend: true,
                      legend: { orientation: 'h', y: -0.2 },
                      barmode: 'group',
                      height: 400
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    className="w-full"
                  />
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Comparativo de Ativos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Ativo</th>
                          <th className="text-right py-3 px-4 font-semibold text-slate-700">Valor Atual</th>
                          <th className="text-right py-3 px-4 font-semibold text-slate-700">Variação Mensal</th>
                          <th className="text-right py-3 px-4 font-semibold text-slate-700">Variação Anual</th>
                          <th className="text-right py-3 px-4 font-semibold text-slate-700">Volume (Mi)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">IBOVESPA</td>
                          <td className="py-3 px-4 text-right text-slate-700">127.458</td>
                          <td className="py-3 px-4 text-right text-green-600">+3.2%</td>
                          <td className="py-3 px-4 text-right text-green-600">+12.5%</td>
                          <td className="py-3 px-4 text-right text-slate-700">R$ 18.542</td>
                        </tr>
                        <tr className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">S&P 500</td>
                          <td className="py-3 px-4 text-right text-slate-700">4.589</td>
                          <td className="py-3 px-4 text-right text-green-600">+2.8%</td>
                          <td className="py-3 px-4 text-right text-green-600">+18.3%</td>
                          <td className="py-3 px-4 text-right text-slate-700">$ 245.320</td>
                        </tr>
                        <tr className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">FTSE 100</td>
                          <td className="py-3 px-4 text-right text-slate-700">7.842</td>
                          <td className="py-3 px-4 text-right text-green-600">+1.5%</td>
                          <td className="py-3 px-4 text-right text-green-600">+8.7%</td>
                          <td className="py-3 px-4 text-right text-slate-700">£ 89.456</td>
                        </tr>
                        <tr className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">DAX</td>
                          <td className="py-3 px-4 text-right text-slate-700">16.254</td>
                          <td className="py-3 px-4 text-right text-red-600">-0.8%</td>
                          <td className="py-3 px-4 text-right text-green-600">+15.2%</td>
                          <td className="py-3 px-4 text-right text-slate-700">€ 124.789</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium text-slate-800">Nikkei 225</td>
                          <td className="py-3 px-4 text-right text-slate-700">32.145</td>
                          <td className="py-3 px-4 text-right text-green-600">+4.1%</td>
                          <td className="py-3 px-4 text-right text-green-600">+22.8%</td>
                          <td className="py-3 px-4 text-right text-slate-700">¥ 2.456.789</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Análise Setorial</h2>
                
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Desempenho por Setor</h3>
                  <Plot
                    data={[{
                      type: 'bar',
                      x: ['Tecnologia', 'Financeiro', 'Saúde', 'Energia', 'Consumo', 'Indústria'],
                      y: [18.5, 12.3, 8.7, 5.2, 9.8, 6.4],
                      marker: {
                        color: ['#B8D4E8', '#C5E8D4', '#D4C5E8', '#E8E0C5', '#E8C5D8', '#E8D4C5']
                      }
                    }]}
                    layout={{
                      xaxis: { title: 'Setor' },
                      yaxis: { title: 'Variação (%)' },
                      margin: { t: 40, r: 20, b: 80, l: 60 },
                      plot_bgcolor: '#ffffff',
                      paper_bgcolor: '#ffffff',
                      showlegend: false,
                      height: 400
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-pastel-blue rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Tecnologia</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      O setor de tecnologia manteve sua trajetória de crescimento, impulsionado pela adoção de soluções de IA e computação em nuvem. Destaque para empresas de software empresarial e cibersegurança.
                    </p>
                  </div>

                  <div className="bg-pastel-green rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Financeiro</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Bancos e instituições financeiras apresentaram resultados sólidos, beneficiados pela normalização das taxas de juros e expansão do crédito corporativo.
                    </p>
                  </div>

                  <div className="bg-pastel-yellow rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Energia</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Volatilidade moderada no setor energético, com destaque para empresas de energia renovável que continuam atraindo investimentos significativos.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Análise de Risco</h2>
                
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Matriz de Risco por Região</h3>
                  <Plot
                    data={[{
                      type: 'heatmap',
                      z: [[8, 6, 4, 7], [5, 9, 3, 6], [4, 5, 8, 5], [7, 4, 6, 9]],
                      x: ['América do Norte', 'Europa', 'Ásia-Pacífico', 'América Latina'],
                      y: ['Político', 'Econômico', 'Operacional', 'Regulatório'],
                      colorscale: [
                        [0, '#C5E8D4'],
                        [0.5, '#E8E0C5'],
                        [1, '#E8C5D8']
                      ],
                      showscale: true,
                      hovertemplate: '%{y}<br>%{x}<br>Risco: %{z}<extra></extra>'
                    }]}
                    layout={{
                      xaxis: { title: 'Região' },
                      yaxis: { title: 'Tipo de Risco' },
                      margin: { t: 40, r: 20, b: 80, l: 100 },
                      plot_bgcolor: '#ffffff',
                      paper_bgcolor: '#ffffff',
                      height: 400
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    className="w-full"
                  />
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mb-4">Principais Riscos Identificados</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-exclamation text-red-600 text-xs"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Risco Geopolítico</h4>
                      <p className="text-sm text-slate-700">Tensões comerciais entre grandes economias podem impactar cadeias de suprimento globais.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-exclamation text-yellow-600 text-xs"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Risco de Inflação</h4>
                      <p className="text-sm text-slate-700">Pressões inflacionárias persistentes podem levar a ajustes mais agressivos nas taxas de juros.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-info text-blue-600 text-xs"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Risco Tecnológico</h4>
                      <p className="text-sm text-slate-700">Vulnerabilidades cibernéticas e regulamentação de IA podem afetar empresas de tecnologia.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Recomendações</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-up text-slate-700"></i>
                      </div>
                      <h3 className="font-semibold text-slate-800">Compra</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>• Ações de tecnologia com foco em IA</li>
                      <li>• Títulos de renda fixa de longo prazo</li>
                      <li>• ETFs de energia renovável</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <i className="fas fa-minus text-slate-700"></i>
                      </div>
                      <h3 className="font-semibold text-slate-800">Manter</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>• Ações do setor financeiro</li>
                      <li>• Fundos imobiliários</li>
                      <li>• Commodities agrícolas</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Conclusão</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  O cenário para o primeiro trimestre de 2025 permanece construtivo, com oportunidades em setores específicos e necessidade de gestão ativa de riscos. A diversificação continua sendo fundamental para navegação em um ambiente de incertezas globais.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Recomendamos monitoramento contínuo dos indicadores macroeconômicos e ajustes táticos conforme necessário, mantendo uma visão de longo prazo alinhada aos objetivos estratégicos.
                </p>
              </section>

              <div className="border-t border-slate-200 pt-6 mt-8">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div>
                    <span className="font-medium">Tags:</span>
                    <span className="ml-2">Análise de Mercado, Q4 2024, Investimentos, Risco</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-slate-600 hover:text-slate-800 flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>Favoritar</span>
                    </button>
                    <button className="text-slate-600 hover:text-slate-800 flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>Exportar PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
