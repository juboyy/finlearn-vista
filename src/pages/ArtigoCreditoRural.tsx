import { useEffect } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Share2, Bookmark, Bell, ThumbsUp, Heart, UserPlus, Eye, MessageCircle, MessageSquare, Clock, Bold, Italic, Link2 as LinkIcon, Image as ImageIcon, MoreHorizontal, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import creditoRuralImage from "@/assets/credito-rural-2025.png";

export default function ArtigoCreditoRural() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Plotly library for charts
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-3.1.1.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      renderCharts();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const renderCharts = () => {
    try {
      // @ts-ignore - Plotly is loaded externally
      if (typeof Plotly === 'undefined') return;

      // Credit Volume Chart
      // @ts-ignore
      const volumeData = [{
        x: ['2020', '2021', '2022', '2023', '2024E', '2025E'],
        y: [236.5, 251.2, 280.4, 308.7, 335.8, 365.2],
        type: 'bar',
        marker: { color: '#C5E8D4' },
        name: 'Volume (R$ bi)'
      }];

      // @ts-ignore
      const volumeLayout = {
        title: { text: 'Volume de Crédito Rural (R$ bilhões)', font: { size: 16 } },
        xaxis: { title: 'Ano' },
        yaxis: { title: 'Volume (R$ bilhões)' },
        margin: { t: 60, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f8fafc',
        paper_bgcolor: '#f8fafc'
      };

      // @ts-ignore
      Plotly.newPlot('credit-volume-chart', volumeData, volumeLayout, { responsive: true, displayModeBar: false });

      // Modality Chart
      // @ts-ignore
      const modalityData = [{
        values: [42, 28, 20, 10],
        labels: ['Custeio', 'Investimento', 'Comercialização', 'Industrialização'],
        type: 'pie',
        marker: {
          colors: ['#C5E8D4', '#B8D4E8', '#E8E0C5', '#E8C5D8']
        }
      }];

      // @ts-ignore
      const modalityLayout = {
        title: { text: 'Distribuição por Modalidade (2024)', font: { size: 16 } },
        margin: { t: 60, r: 20, b: 40, l: 20 },
        plot_bgcolor: '#f8fafc',
        paper_bgcolor: '#f8fafc'
      };

      // @ts-ignore
      Plotly.newPlot('modality-chart', modalityData, modalityLayout, { responsive: true, displayModeBar: false });

      // Risk Chart
      // @ts-ignore
      const riskData = [{
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Centro-Oeste',
        x: ['T1 2023', 'T2 2023', 'T3 2023', 'T4 2023', 'T1 2024', 'T2 2024'],
        y: [1.2, 1.3, 1.3, 1.4, 1.4, 1.5],
        line: { color: '#C5E8D4', width: 2 },
        marker: { size: 6 }
      }, {
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Sul',
        x: ['T1 2023', 'T2 2023', 'T3 2023', 'T4 2023', 'T1 2024', 'T2 2024'],
        y: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
        line: { color: '#E8E0C5', width: 2 },
        marker: { size: 6 }
      }, {
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Sudeste',
        x: ['T1 2023', 'T2 2023', 'T3 2023', 'T4 2023', 'T1 2024', 'T2 2024'],
        y: [2.8, 2.9, 3.0, 3.1, 3.1, 3.2],
        line: { color: '#B8D4E8', width: 2 },
        marker: { size: 6 }
      }, {
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Nordeste',
        x: ['T1 2023', 'T2 2023', 'T3 2023', 'T4 2023', 'T1 2024', 'T2 2024'],
        y: [3.9, 4.1, 4.3, 4.5, 4.6, 4.7],
        line: { color: '#E8C5D8', width: 2 },
        marker: { size: 6 }
      }];

      // @ts-ignore
      const riskLayout = {
        title: { text: 'Taxa de Inadimplência por Região (%)', font: { size: 16 } },
        xaxis: { title: 'Período' },
        yaxis: { title: 'Taxa de Inadimplência (%)' },
        margin: { t: 60, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f8fafc',
        paper_bgcolor: '#f8fafc',
        showlegend: true,
        legend: { x: 0, y: 1 }
      };

      // @ts-ignore
      Plotly.newPlot('risk-chart', riskData, riskLayout, { responsive: true, displayModeBar: false });
    } catch (e) {
      console.error('Error rendering charts:', e);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/comunidade')} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-slate-800">Artigo da Comunidade</h1>
                <p className="text-sm text-slate-500 mt-0.5">Publicado por Carlos Mendes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-8 py-8">
          <article className="bg-white rounded-xl border border-slate-200 mb-8">
            {/* Article Header */}
            <div className="p-8 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-pastel-green text-slate-700 rounded-full text-xs font-medium">Análise de Mercado</span>
                <span className="px-3 py-1 bg-pastel-yellow text-slate-700 rounded-full text-xs font-medium">Crédito Rural</span>
                <span className="text-slate-400">•</span>
                <span className="text-sm text-slate-500">15 min de leitura</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
                Análise Profunda do Crédito Rural: Tendências, Riscos e Oportunidades para 2025
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Uma análise detalhada sobre o mercado de crédito rural brasileiro, incluindo projeções macroeconômicas, evolução do PIB agro e estratégias de gestão de portfólio para instituições financeiras.
              </p>

              {/* Authors */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Author" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Co-author" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Co-author" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800">Carlos Mendes</p>
                      <span className="text-slate-400">•</span>
                      <p className="text-sm text-slate-600">Ana Rodrigues</p>
                      <span className="text-slate-400">•</span>
                      <p className="text-sm text-slate-600">Roberto Silva</p>
                    </div>
                    <p className="text-sm text-slate-500">Publicado em 15 de janeiro, 2025</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Convidar Co-autor
                </button>
              </div>
            </div>

            {/* Article Image */}
            <div className="w-full h-96 overflow-hidden">
              <img src={creditoRuralImage} alt="Crédito Rural" className="w-full h-full object-cover" />
            </div>

            {/* Article Content */}
            <div className="p-8 space-y-8">
              {/* Executive Summary */}
              <section>
                <div className="bg-pastel-blue/30 border-l-4 border-pastel-blue rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Sumário Executivo</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-pastel-blue">•</span>
                      <span>Volume de crédito rural deve atingir R$ 365 bilhões em 2025 (+8,7% vs 2024)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pastel-blue">•</span>
                      <span>Centro-Oeste mantém menor taxa de inadimplência (1,5%), enquanto Nordeste apresenta maior risco (4,7%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pastel-blue">•</span>
                      <span>Custeio representa 42% do portfólio, seguido por Investimento (28%) e Comercialização (20%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pastel-blue">•</span>
                      <span>PIB agro deve crescer 3,2% em 2025, impulsionado por safra recorde de grãos</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Main Content Sections */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Panorama Macroeconômico</h2>
                <p className="text-slate-700 mb-4">
                  O agronegócio brasileiro continua sendo um dos principais motores da economia nacional, representando aproximadamente 24% do PIB. Para 2025, projetamos um crescimento de <strong>3,2% no PIB agro</strong>, sustentado por:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
                  <li>Safra recorde de grãos estimada em 320 milhões de toneladas</li>
                  <li>Preços internacionais das commodities em patamares elevados</li>
                  <li>Aumento da produtividade via adoção de tecnologias (agricultura de precisão, biotecnologia)</li>
                  <li>Expansão de áreas cultivadas no MATOPIBA (Maranhão, Tocantins, Piauí e Bahia)</li>
                </ul>
              </section>

              {/* Credit Volume Chart */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Evolução do Volume de Crédito</h2>
                <div className="bg-slate-50 rounded-lg p-6 mb-4">
                  <div id="credit-volume-chart" className="h-96"></div>
                </div>
                <p className="text-slate-700 text-sm">
                  <strong>Análise:</strong> O volume total de crédito rural apresenta crescimento consistente, com CAGR de 9,1% entre 2020-2025E. O crescimento é impulsionado principalmente pelo aumento da demanda por financiamento de custeio e expansão de programas governamentais de apoio ao setor.
                </p>
              </section>

              {/* Distribution by Modality */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Distribuição por Modalidade</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-lg p-6">
                    <div id="modality-chart" className="h-80"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C5E8D4' }}></div>
                        <h4 className="font-semibold text-slate-800">Custeio</h4>
                        <span className="ml-auto text-2xl font-bold text-slate-800">42%</span>
                      </div>
                      <p className="text-sm text-slate-600">Financiamento de despesas do ciclo produtivo (insumos, defensivos, mão de obra)</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B8D4E8' }}></div>
                        <h4 className="font-semibold text-slate-800">Investimento</h4>
                        <span className="ml-auto text-2xl font-bold text-slate-800">28%</span>
                      </div>
                      <p className="text-sm text-slate-600">Aquisição de máquinas, equipamentos e melhorias de infraestrutura</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E8E0C5' }}></div>
                        <h4 className="font-semibold text-slate-800">Comercialização</h4>
                        <span className="ml-auto text-2xl font-bold text-slate-800">20%</span>
                      </div>
                      <p className="text-sm text-slate-600">Financiamento para estocagem e comercialização da produção</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E8C5D8' }}></div>
                        <h4 className="font-semibold text-slate-800">Industrialização</h4>
                        <span className="ml-auto text-2xl font-bold text-slate-800">10%</span>
                      </div>
                      <p className="text-sm text-slate-600">Financiamento para beneficiamento e transformação de produtos</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Risk Analysis */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Análise de Risco Regional</h2>
                <div className="bg-slate-50 rounded-lg p-6 mb-6">
                  <div id="risk-chart" className="h-96"></div>
                </div>
                
                {/* Risk Table */}
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Perfil de Risco Regional - Métricas Detalhadas</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left p-4 font-semibold text-slate-800 border border-slate-200" style={{ width: '42%' }}>Região</th>
                        <th className="text-left p-4 font-semibold text-slate-800 border border-slate-200" style={{ width: '28%' }}>Taxa de Inadimplência</th>
                        <th className="text-left p-4 font-semibold text-slate-800 border border-slate-200" style={{ width: '20%' }}>Volume (R$ bi)</th>
                        <th className="text-left p-4 font-semibold text-slate-800 border border-slate-200" style={{ width: '10%' }}>Participação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 text-slate-700 border border-slate-200">Centro-Oeste</td>
                        <td className="p-4 border border-slate-200">
                          <span className="px-2 py-1 bg-[#C5E8D4] text-slate-700 rounded text-sm font-medium">2,1%</span>
                        </td>
                        <td className="p-4 text-slate-700 border border-slate-200">R$ 186,4</td>
                        <td className="p-4 text-slate-700 border border-slate-200">45%</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-4 text-slate-700 border border-slate-200">Sul</td>
                        <td className="p-4 border border-slate-200">
                          <span className="px-2 py-1 bg-[#E8E0C5] text-slate-700 rounded text-sm font-medium">2,8%</span>
                        </td>
                        <td className="p-4 text-slate-700 border border-slate-200">R$ 123,6</td>
                        <td className="p-4 text-slate-700 border border-slate-200">30%</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-slate-700 border border-slate-200">Sudeste</td>
                        <td className="p-4 border border-slate-200">
                          <span className="px-2 py-1 bg-[#B8D4E8] text-slate-700 rounded text-sm font-medium">3,2%</span>
                        </td>
                        <td className="p-4 text-slate-700 border border-slate-200">R$ 61,8</td>
                        <td className="p-4 text-slate-700 border border-slate-200">15%</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-4 text-slate-700 border border-slate-200">Nordeste</td>
                        <td className="p-4 border border-slate-200">
                          <span className="px-2 py-1 bg-[#E8C5D8] text-slate-700 rounded text-sm font-medium">4,7%</span>
                        </td>
                        <td className="p-4 text-slate-700 border border-slate-200">R$ 32,9</td>
                        <td className="p-4 text-slate-700 border border-slate-200">8%</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-slate-700 border border-slate-200">Norte</td>
                        <td className="p-4 border border-slate-200">
                          <span className="px-2 py-1 bg-[#E8D4C5] text-slate-700 rounded text-sm font-medium">3,8%</span>
                        </td>
                        <td className="p-4 text-slate-700 border border-slate-200">R$ 8,2</td>
                        <td className="p-4 text-slate-700 border border-slate-200">2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-slate-700 leading-relaxed">
                  <strong>Insights:</strong> A dispersão regional da inadimplência reflete diferenças estruturais significativas. O Centro-Oeste beneficia-se de maior escala produtiva, tecnologia avançada e clima favorável. O Nordeste enfrenta desafios climáticos (secas) e menor acesso a tecnologia e infraestrutura.
                </p>
              </section>

              {/* Pricing Model */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Modelo de Precificação</h2>
                <div className="bg-slate-50 rounded-lg p-6">
                  <p className="font-semibold text-slate-800 mb-2">Exemplo de Cálculo:</p>
                  <p className="text-slate-700 text-sm mb-3">Operação de custeio no Centro-Oeste, perfil de baixo risco:</p>
                  <div className="space-y-1 text-sm text-slate-700 font-mono">
                    <p>Taxa<sub>base</sub> = 8,5%</p>
                    <p>Spread<sub>risco</sub> = 0,5% (baixo risco)</p>
                    <p>Spread<sub>regional</sub> = 0,2% (Centro-Oeste)</p>
                    <p>Spread<sub>modalidade</sub> = 0,3% (custeio)</p>
                    <p className="pt-2 border-t border-slate-300 font-bold">Taxa<sub>final</sub> = 9,5% a.a.</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Provisão Mínima</p>
                    <p className="text-2xl font-bold text-slate-800">1.2%</p>
                    <p className="text-xs text-slate-600 mt-1">do valor concedido</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">Capital Mínimo</p>
                    <p className="text-2xl font-bold text-slate-800">11%</p>
                    <p className="text-xs text-slate-600 mt-1">Basileia III</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-slate-500 mb-1">ROE Esperado</p>
                    <p className="text-2xl font-bold text-slate-800">18.5%</p>
                    <p className="text-xs text-slate-600 mt-1">pós-ajustes</p>
                  </div>
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Recomendações Estratégicas</h2>
                <div className="space-y-4">
                  <div className="bg-white border-l-4 border-pastel-green rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-700 text-lg">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Diversificação Regional</h3>
                        <p className="text-slate-700 text-sm">Aumentar exposição no Centro-Oeste (menor inadimplência) e reduzir gradualmente participação em regiões de alto risco, mantendo presença estratégica com pricing adequado.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-l-4 border-pastel-blue rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-700 text-lg">📈</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Tecnologia e Monitoramento</h3>
                        <p className="text-slate-700 text-sm">Implementar sistemas de monitoramento em tempo real utilizando dados climáticos, satelitais e de mercado para antecipação de riscos e ajuste dinâmico de garantias.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-l-4 border-pastel-purple rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-700 text-lg">🎯</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Segmentação de Clientes</h3>
                        <p className="text-slate-700 text-sm">Desenvolver ofertas diferenciadas por segmento (pequeno, médio e grande produtor), com produtos específicos e relacionamento personalizado para cada perfil.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Conclusão</h2>
                <p className="text-slate-700 mb-4">
                  O mercado de crédito rural brasileiro apresenta oportunidades significativas para instituições financeiras que adotarem abordagens sofisticadas de gestão de risco e precificação. A combinação de crescimento robusto do setor com disparidades regionais de inadimplência cria espaço para estratégias de alocação de capital inteligentes.
                </p>
                <p className="text-slate-700">
                  Para 2025, recomendamos foco em <strong>três pilares principais</strong>: (1) diversificação regional priorizando regiões de menor risco, (2) investimento em tecnologia para monitoramento proativo, e (3) desenvolvimento de produtos segmentados por perfil de produtor. A implementação dessas estratégias pode resultar em ROE superior a 18% com perfil de risco controlado.
                </p>
              </section>

              {/* Article Stats */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-slate-600 hover:text-pastel-blue transition">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-medium">42</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-600 hover:text-pastel-pink transition">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">28</span>
                  </button>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-medium">15 comentários</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Compartilhar
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Author Section */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Autores</h3>
            
            <div className="space-y-4">
              {/* Main Author */}
              <div className="bg-[#D4C5E8] bg-opacity-30 rounded-xl p-6 border border-[#D4C5E8]">
                <div className="flex items-start gap-6">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                    alt="Author" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-slate-800">Carlos Mendes</h3>
                        <span className="px-2 py-1 bg-[#B8D4E8] text-slate-700 rounded-full text-xs font-medium">Autor Principal</span>
                      </div>
                      <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        <UserPlus size={14} className="inline mr-2" />
                        Seguir
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Analista Sênior de Crédito com 12 anos de experiência no mercado financeiro. Especialista em crédito rural e análise de risco.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span><strong className="text-slate-700">47</strong> artigos</span>
                      <span><strong className="text-slate-700">2.3k</strong> seguidores</span>
                      <span><strong className="text-slate-700">342</strong> pontos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Co-author 1 */}
              <div className="bg-[#D4C5E8] bg-opacity-30 rounded-xl p-6 border border-[#D4C5E8]">
                <div className="flex items-start gap-6">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                    alt="Co-author" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-slate-800">Ana Rodrigues</h3>
                        <span className="px-2 py-1 bg-[#C5E8D4] text-slate-700 rounded-full text-xs font-medium">Co-autora</span>
                      </div>
                      <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        <UserPlus size={14} className="inline mr-2" />
                        Seguir
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Especialista em Commodities Agrícolas com foco em análise de mercado e estratégias de hedge. Consultora com 8 anos de experiência no agronegócio.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span><strong className="text-slate-700">32</strong> artigos</span>
                      <span><strong className="text-slate-700">1.8k</strong> seguidores</span>
                      <span><strong className="text-slate-700">278</strong> pontos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Co-author 2 */}
              <div className="bg-[#D4C5E8] bg-opacity-30 rounded-xl p-6 border border-[#D4C5E8]">
                <div className="flex items-start gap-6">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                    alt="Co-author" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-slate-800">Roberto Silva</h3>
                        <span className="px-2 py-1 bg-[#C5E8D4] text-slate-700 rounded-full text-xs font-medium">Co-autor</span>
                      </div>
                      <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        <UserPlus size={14} className="inline mr-2" />
                        Seguir
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Economista especializado em Mercado de Capitais e Financiamento Estruturado. Professor universitário e consultor com 15 anos de carreira.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span><strong className="text-slate-700">58</strong> artigos</span>
                      <span><strong className="text-slate-700">3.1k</strong> seguidores</span>
                      <span><strong className="text-slate-700">512</strong> pontos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* More from Author Section */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Mais artigos de Carlos Mendes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 hover:border-[#B8D4E8] hover:shadow-md transition cursor-pointer">
                <span className="px-2 py-1 bg-[#C5E8D4] text-slate-700 rounded text-xs font-medium mb-2 inline-block">Análise</span>
                <h4 className="font-medium text-slate-800 mb-2 hover:text-[#B8D4E8] transition">
                  Impactos da Taxa Selic no Agronegócio Brasileiro
                </h4>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  Análise detalhada sobre como as variações da taxa básica de juros afetam o financiamento agrícola e as estratégias de hedge.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span><Eye size={12} className="inline mr-1" />1.2k</span>
                  <span><MessageCircle size={12} className="inline mr-1" />28</span>
                  <span><Heart size={12} className="inline mr-1" />67</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 hover:border-[#C5E8D4] hover:shadow-md transition cursor-pointer">
                <span className="px-2 py-1 bg-[#E8E0C5] text-slate-700 rounded text-xs font-medium mb-2 inline-block">Mercado</span>
                <h4 className="font-medium text-slate-800 mb-2 hover:text-[#C5E8D4] transition">
                  Commodities Agrícolas: Projeções para 2025
                </h4>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  Previsões fundamentadas sobre o comportamento dos principais produtos agrícolas no mercado internacional.
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span><Eye size={12} className="inline mr-1" />987</span>
                  <span><MessageCircle size={12} className="inline mr-1" />34</span>
                  <span><Heart size={12} className="inline mr-1" />52</span>
                </div>
              </div>
            </div>
          </section>

          {/* Related Articles Section */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Artigos Relacionados</h3>
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-slate-200 hover:bg-slate-50 -mx-6 px-6 transition cursor-pointer">
                <div className="w-24 h-24 bg-[#B8D4E8] rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#C5E8D4] text-slate-700 rounded text-xs font-medium">Crédito Rural</span>
                    <span className="text-xs text-slate-500">por Ana Rodrigues</span>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1 hover:text-[#B8D4E8] transition">
                    Gestão de Garantias em Operações de Crédito Rural
                  </h4>
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                    Estratégias eficientes para estruturação e monitoramento de garantias em operações agrícolas de médio e longo prazo.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><Clock size={12} className="inline mr-1" />há 3 dias</span>
                    <span><Eye size={12} className="inline mr-1" />856</span>
                    <span><MessageCircle size={12} className="inline mr-1" />19</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pb-4 border-b border-slate-200 hover:bg-slate-50 -mx-6 px-6 transition cursor-pointer">
                <div className="w-24 h-24 bg-[#C5E8D4] rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#E8E0C5] text-slate-700 rounded text-xs font-medium">Análise</span>
                    <span className="text-xs text-slate-500">por Roberto Santos</span>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1 hover:text-[#C5E8D4] transition">
                    Tecnologia no Campo: Digitalização do Crédito Agrícola
                  </h4>
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                    Como fintechs e bancos digitais estão transformando o acesso ao crédito para pequenos e médios produtores rurais.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><Clock size={12} className="inline mr-1" />há 5 dias</span>
                    <span><Eye size={12} className="inline mr-1" />1.1k</span>
                    <span><MessageCircle size={12} className="inline mr-1" />45</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pb-4 hover:bg-slate-50 -mx-6 px-6 transition cursor-pointer">
                <div className="w-24 h-24 bg-[#D4C5E8] rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#E8C5D8] text-slate-700 rounded text-xs font-medium">Regulação</span>
                    <span className="text-xs text-slate-500">por Fernanda Lima</span>
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1 hover:text-[#D4C5E8] transition">
                    Novas Regras do Banco Central para Crédito Rural
                  </h4>
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                    Entenda as mudanças regulatórias recentes e seus impactos nas operações de crédito agrícola.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><Clock size={12} className="inline mr-1" />há 1 semana</span>
                    <span><Eye size={12} className="inline mr-1" />743</span>
                    <span><MessageCircle size={12} className="inline mr-1" />31</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Comentários (24)</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#B8D4E8] text-slate-700 rounded-lg text-sm font-medium">
                  Mais Recentes
                </button>
                <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">
                  Mais Relevantes
                </button>
              </div>
            </div>

            {/* Add Comment */}
            <div className="mb-6">
              <div className="flex gap-4">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea 
                    placeholder="Adicione um comentário..." 
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-[#B8D4E8] resize-none"
                  ></textarea>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                        <Bold size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                        <Italic size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                        <LinkIcon size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                        <ImageIcon size={16} />
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {/* Comment 1 */}
              <div className="flex gap-4">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">Maria Santos</span>
                        <span className="text-xs text-slate-500">há 2 horas</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm mb-3">
                      Excelente análise, Carlos! A tabela de risco regional é particularmente útil. Você considera que as tendências de alta inadimplência no Nordeste estão relacionadas principalmente a fatores climáticos ou há questões estruturais mais profundas?
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        <ThumbsUp size={14} />
                        <span>12</span>
                      </button>
                      <button className="text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        Responder
                      </button>
                    </div>
                  </div>

                  {/* Reply */}
                  <div className="ml-8 mt-4 flex gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                      alt="Author" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-800">Carlos Mendes</span>
                            <span className="px-2 py-0.5 bg-[#B8D4E8] text-slate-700 rounded text-xs font-medium">Autor</span>
                            <span className="text-xs text-slate-500">há 1 hora</span>
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm mb-3">
                          Ótima pergunta, Maria! É uma combinação de ambos. Os fatores climáticos certamente têm peso significativo, mas há questões estruturais importantes como menor escala produtiva, infraestrutura logística limitada e menor acesso a tecnologia. Estou preparando um artigo específico sobre isso.
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                            <ThumbsUp size={14} />
                            <span>8</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="flex gap-4">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">Pedro Oliveira</span>
                        <span className="text-xs text-slate-500">há 4 horas</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm mb-3">
                      O modelo de precificação proposto é muito interessante. Vocês têm dados sobre como as instituições financeiras estão reagindo aos novos spreads? Há evidências de que estão ajustando suas políticas?
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        <ThumbsUp size={14} />
                        <span>7</span>
                      </button>
                      <button className="text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment 3 */}
              <div className="flex gap-4">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">Julia Costa</span>
                        <span className="text-xs text-slate-500">há 6 horas</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm mb-3">
                      Trabalho em uma cooperativa de crédito rural e este artigo vai direto para nosso material de referência. Os gráficos de evolução histórica são especialmente valiosos. Parabéns pelo trabalho!
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        <ThumbsUp size={14} />
                        <span>15</span>
                      </button>
                      <button className="text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment 4 */}
              <div className="flex gap-4">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">Ricardo Almeida</span>
                        <span className="text-xs text-slate-500">há 8 horas</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm mb-3">
                      A análise sobre seguro rural está perfeita. Esse é realmente um ponto crítico que muitos produtores ainda negligenciam. Vocês consideram fazer um artigo focado exclusivamente nesse tema?
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        <ThumbsUp size={14} />
                        <span>9</span>
                      </button>
                      <button className="text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment 5 */}
              <div className="flex gap-4">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">Fernanda Lima</span>
                        <span className="text-xs text-slate-500">há 1 dia</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm mb-3">
                      Muito bom! Especialmente a parte sobre diversificação geográfica. Estamos implementando essa estratégia e os resultados preliminares são promissores. A correlação negativa entre regiões realmente ajuda a balancear o portfólio.
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        <ThumbsUp size={14} />
                        <span>11</span>
                      </button>
                      <button className="text-slate-600 hover:text-[#B8D4E8] transition text-sm">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-3 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition">
              Carregar mais comentários
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
