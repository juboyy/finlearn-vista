import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Eye, Save, Send, Smartphone, Monitor, CheckCircle, AlertTriangle, Search, Globe, Rocket, Users, Settings as SettingsIcon, Download, ArrowLeft, Lightbulb, ChartBar, SpellCheck, Info, History, Undo, Clock, CreditCard, Store, Shield, Twitter, Linkedin, Instagram, Youtube, Edit, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const AgendarPublicacaoRevisao = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const qualityItems = [
    { 
      label: "Linha de Assunto Otimizada", 
      status: "approved",
      icon: CheckCircle,
      color: "hsl(var(--pastel-green))",
      bgColor: "hsl(152 32% 79%)",
      description: "Taxa de abertura estimada: 28-32%",
      statusText: "Aprovado",
      hasButton: false
    },
    { 
      label: "Links Funcionais", 
      status: "approved",
      icon: CheckCircle,
      color: "hsl(var(--pastel-green))",
      bgColor: "hsl(152 32% 79%)",
      description: "Todos os 8 links foram verificados",
      statusText: "Aprovado",
      hasButton: false
    },
    { 
      label: "Compatibilidade Mobile", 
      status: "approved",
      icon: CheckCircle,
      color: "hsl(var(--pastel-green))",
      bgColor: "hsl(152 32% 79%)",
      description: "Design responsivo testado",
      statusText: "Aprovado",
      hasButton: false
    },
    { 
      label: "Palavras de Spam", 
      status: "warning",
      icon: AlertTriangle,
      color: "hsl(44 45% 56%)",
      bgColor: "hsl(44 78% 89%)",
      description: "1 palavra detectada: \"Grátis\"",
      statusText: "Revisar",
      hasButton: true
    },
    { 
      label: "Conformidade LGPD", 
      status: "approved",
      icon: CheckCircle,
      color: "hsl(var(--pastel-green))",
      bgColor: "hsl(152 32% 79%)",
      description: "Link de cancelamento incluído",
      statusText: "Aprovado",
      hasButton: false
    },
    { 
      label: "Otimização SEO", 
      status: "info",
      icon: Search,
      color: "hsl(var(--pastel-blue))",
      bgColor: "hsl(206 35% 79%)",
      description: "Meta tags e palavras-chave otimizadas",
      statusText: "Detalhes",
      hasButton: true
    },
    { 
      label: "Segmentação GEO", 
      status: "info",
      icon: Globe,
      color: "hsl(var(--pastel-green))",
      bgColor: "hsl(152 32% 79%)",
      description: "Brasil: 95% • Internacional: 5%",
      statusText: "Configurar",
      hasButton: true
    },
  ];
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">("desktop");
  const handlePublish = () => {
    if (confirm("Tem certeza que deseja publicar esta newsletter para 12.450 destinatários?")) {
      alert("Newsletter agendada com sucesso! Você receberá uma confirmação por e-mail.");
      navigate("/newsletter");
    }
  };
  return <div className="flex min-h-screen overflow-hidden bg-slate-50">
      <SidebarFix />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shrink-0">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm mb-1" style={{
              color: 'hsl(var(--muted-foreground))'
            }}>
                <a href="#" className="hover:text-slate-700">Studio de Criação</a>
                <span className="text-xs">›</span>
                <span className="font-medium" style={{
                color: 'hsl(var(--foreground))'
              }}>Revisão Final</span>
              </div>
              <h1 className="text-2xl font-semibold" style={{
              color: 'hsl(var(--foreground))'
            }}>
                Revisar e Publicar Newsletter
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 hover:opacity-90" style={{
              color: 'hsl(var(--pastel-gray-dark))'
            }}>
                <Save size={18} />
                Salvar Rascunho
              </button>
              <button className="px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 hover:opacity-90" style={{
              backgroundColor: 'hsl(var(--pastel-purple-btn))',
              color: 'hsl(var(--pastel-gray-dark))'
            }}>
                <Send size={18} />
                Enviar Teste
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Preview */}
              <div className="lg:col-span-2 space-y-6">
                {/* Preview Card */}
                <div className="bg-white rounded-2xl border border-slate-200">
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                      backgroundColor: 'hsl(var(--pastel-purple))'
                    }}>
                        <Eye style={{
                        color: 'hsl(var(--pastel-gray-dark))'
                      }} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold" style={{
                        color: 'hsl(var(--foreground))'
                      }}>
                          Preview da Newsletter
                        </h2>
                        <p className="text-sm" style={{
                        color: 'hsl(var(--muted-foreground))'
                      }}>
                          Como seus assinantes verão o conteúdo
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setActiveDevice("desktop")} className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${activeDevice === "desktop" ? "bg-slate-100" : ""}`} style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        <Monitor size={18} />
                      </button>
                      <button onClick={() => setActiveDevice("mobile")} className={`px-3 py-1.5 text-sm rounded-lg transition ${activeDevice === "mobile" ? "bg-slate-100" : ""}`} style={{
                      color: 'hsl(var(--muted-foreground))'
                    }}>
                        <Smartphone size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Newsletter Preview */}
                  <div className="p-8 bg-slate-50">
                    <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden border border-slate-200">
                      {/* Header Section */}
                      <div className="relative group">
                        <div className="px-8 py-12 text-center" style={{
                        backgroundColor: 'hsl(var(--pastel-purple))'
                      }}>
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-xs font-semibold mb-4" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <CreditCard size={14} />
                            EDIÇÃO ADQUIRÊNCIA
                          </div>
                          <h1 className="text-3xl font-bold mb-3" style={{
                          color: 'hsl(var(--foreground))'
                        }}>
                            Transformação Digital nos Pagamentos
                          </h1>
                          <p className="text-sm mb-6" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            Edição Semanal • 15 de Janeiro, 2024
                          </p>
                          <div className="flex items-center justify-center gap-6 text-xs" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <span>
                              <Clock size={14} className="inline mr-1" />
                              8 min de leitura
                            </span>
                            <span>
                              <ChartBar size={14} className="inline mr-1" />
                              5 insights
                            </span>
                            <span>
                              <Eye size={14} className="inline mr-1" />
                              1 vídeo
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition flex items-center justify-center">
                          <button className="px-4 py-2 bg-white rounded-lg border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition opacity-0 group-hover:opacity-100" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <Edit size={16} className="inline mr-2" />
                            Editar Cabeçalho
                          </button>
                        </div>
                      </div>

                      {/* Insight Section */}
                      <div className="relative group">
                        <div className="px-8 py-6 border-l-4" style={{
                        backgroundColor: 'hsl(44 45% 82%)',
                        borderColor: 'hsl(44 45% 56%)'
                      }}>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                            backgroundColor: 'hsl(44 45% 56%)'
                          }}>
                              <Lightbulb size={16} style={{
                              color: 'hsl(var(--pastel-gray-dark))'
                            }} />
                            </div>
                            <div>
                              <p className="text-sm font-bold mb-1" style={{
                              color: 'hsl(var(--foreground))'
                            }}>
                                Insight do Especialista em Adquirência
                              </p>
                              <p className="text-sm leading-relaxed" style={{
                              color: 'hsl(var(--pastel-gray-dark))'
                            }}>
                                O Pix ultrapassou 3 bilhões de transações mensais, consolidando-se como principal meio de
                                pagamento. Adquirentes que integraram Pix viram <strong>aumento de 45%</strong> no volume
                                transacionado.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition flex items-center justify-center">
                          <button className="px-4 py-2 bg-white rounded-lg border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition opacity-0 group-hover:opacity-100" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <Edit size={16} className="inline mr-2" />
                            Editar Insight
                          </button>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="relative group">
                        <div className="p-8">
                          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{
                          color: 'hsl(var(--foreground))'
                        }}>
                            <span className="w-1 h-6 rounded-full" style={{
                            backgroundColor: 'hsl(var(--pastel-purple))'
                          }}></span>
                            Principais Destaques da Semana
                          </h2>
                          <div className="space-y-4">
                            {[{
                            icon: <Smartphone size={24} />,
                            bgColor: 'hsl(var(--pastel-purple))',
                            badge: "CRESCIMENTO",
                            badgeBg: 'hsl(var(--pastel-green))',
                            title: "Pix atinge 3 bilhões de transações",
                            desc: "Maior volume mensal desde o lançamento, representando 35% de todas as transações digitais no Brasil..."
                          }, {
                            icon: <Store size={24} />,
                            bgColor: 'hsl(var(--pastel-blue))',
                            badge: "VAREJO",
                            badgeBg: 'hsl(var(--pastel-blue))',
                            title: "Tap to Pay revoluciona PDV",
                            desc: "Tecnologia NFC em smartphones elimina necessidade de maquininhas tradicionais, reduzindo custos..."
                          }, {
                            icon: <Shield size={24} />,
                            bgColor: 'hsl(var(--pastel-green))',
                            badge: "SEGURANÇA",
                            badgeBg: 'hsl(var(--pastel-purple))',
                            title: "Tokenização reduz fraudes em 67%",
                            desc: "Implementação de tokens criptográficos mostra resultados significativos na prevenção de fraudes..."
                          }].map((item, idx) => <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition cursor-pointer border border-slate-100">
                                <div className="w-20 h-20 rounded-lg shrink-0 flex items-center justify-center" style={{
                              backgroundColor: item.bgColor,
                              color: 'hsl(var(--pastel-gray-dark))'
                            }}>
                                  {item.icon}
                                </div>
                                <div className="flex-1">
                                  <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded mb-2" style={{
                                backgroundColor: item.badgeBg,
                                color: 'hsl(var(--pastel-gray-dark))'
                              }}>
                                    {item.badge}
                                  </span>
                                  <h3 className="font-bold mb-1" style={{
                                color: 'hsl(var(--foreground))'
                              }}>
                                    {item.title}
                                  </h3>
                                  <p className="text-sm line-clamp-2" style={{
                                color: 'hsl(var(--pastel-gray-dark))'
                              }}>
                                    {item.desc}
                                  </p>
                                </div>
                              </div>)}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition flex items-center justify-center">
                          <button className="px-4 py-2 bg-white rounded-lg border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition opacity-0 group-hover:opacity-100" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <Edit size={16} className="inline mr-2" />
                            Editar Destaques
                          </button>
                        </div>
                      </div>

                      {/* Analysis Section */}
                      <div className="relative group">
                        <div className="px-8 py-6" style={{
                        backgroundColor: 'hsl(var(--pastel-blue))'
                      }}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              <ChartBar style={{
                              color: 'hsl(var(--pastel-gray-dark))'
                            }} />
                            </div>
                            <h3 className="font-bold" style={{
                            color: 'hsl(var(--foreground))'
                          }}>
                              Análise de Mercado
                            </h3>
                          </div>
                          <div className="bg-white rounded-xl p-6 border border-slate-100">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">+45%</p>
                                <p className="text-xs mt-1" style={{
                                color: 'hsl(var(--muted-foreground))'
                              }}>
                                  Volume Pix (7d)
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">-12%</p>
                                <p className="text-xs mt-1" style={{
                                color: 'hsl(var(--muted-foreground))'
                              }}>
                                  Taxa Média (7d)
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">R$ 2.8T</p>
                                <p className="text-xs mt-1" style={{
                                color: 'hsl(var(--muted-foreground))'
                              }}>
                                  Volume Total
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition flex items-center justify-center">
                          <button className="px-4 py-2 bg-white rounded-lg border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition opacity-0 group-hover:opacity-100" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <Edit size={16} className="inline mr-2" />
                            Editar Análise
                          </button>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="relative group">
                        <div className="p-8 bg-slate-100 text-center border-t border-slate-200">
                          <h3 className="font-bold text-lg mb-3" style={{
                          color: 'hsl(var(--foreground))'
                        }}>
                            Continue Aprendendo
                          </h3>
                          <p className="text-sm mb-6" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            Acesse conteúdos exclusivos e aprofunde seu conhecimento
                          </p>
                          <button className="px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition" style={{
                          backgroundColor: 'hsl(var(--pastel-purple-btn))',
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            Acessar Plataforma
                          </button>
                          <div className="flex items-center justify-center gap-6 mt-8 text-sm" style={{
                          color: 'hsl(var(--muted-foreground))'
                        }}>
                            <a href="#" className="hover:opacity-70 transition">
                              <Twitter size={18} />
                            </a>
                            <a href="#" className="hover:opacity-70 transition">
                              <Linkedin size={18} />
                            </a>
                            <a href="#" className="hover:opacity-70 transition">
                              <Instagram size={18} />
                            </a>
                            <a href="#" className="hover:opacity-70 transition">
                              <Youtube size={18} />
                            </a>
                          </div>
                          <p className="text-xs mt-6" style={{
                          color: 'hsl(var(--muted-foreground))'
                        }}>
                            © 2024 FinLearn • Cancelar assinatura
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition flex items-center justify-center">
                          <button className="px-4 py-2 bg-white rounded-lg border border-slate-200 font-semibold text-sm hover:bg-slate-50 transition opacity-0 group-hover:opacity-100" style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>
                            <Edit size={16} className="inline mr-2" />
                            Editar Rodapé
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality Check Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{
                  color: 'hsl(var(--foreground))'
                }}>
                    <SpellCheck style={{
                    color: 'hsl(var(--pastel-gray-dark))'
                  }} />
                    Verificação de Qualidade
                  </h3>
                  <div className="space-y-3">
                    {[{
                    icon: <CheckCircle className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(152 32% 79%)',
                    title: "Linha de Assunto Otimizada",
                    desc: "Taxa de abertura estimada: 28-32%",
                    status: "Aprovado",
                    statusColor: "hsl(var(--pastel-gray-dark))"
                  }, {
                    icon: <CheckCircle className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(152 32% 79%)',
                    title: "Links Funcionais",
                    desc: "Todos os 8 links foram verificados",
                    status: "Aprovado",
                    statusColor: "hsl(var(--pastel-gray-dark))"
                  }, {
                    icon: <CheckCircle className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(152 32% 79%)',
                    title: "Compatibilidade Mobile",
                    desc: "Design responsivo testado",
                    status: "Aprovado",
                    statusColor: "hsl(var(--pastel-gray-dark))"
                  }, {
                    icon: <AlertTriangle className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(44 78% 89%)',
                    title: "Palavras de Spam",
                    desc: "1 palavra detectada: \"Grátis\"",
                    status: "Revisar",
                    statusColor: "hsl(var(--pastel-gray-dark))",
                    isButton: true
                  }, {
                    icon: <CheckCircle className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(152 32% 79%)',
                    title: "Conformidade LGPD",
                    desc: "Link de cancelamento incluído",
                    status: "Aprovado",
                    statusColor: "hsl(var(--pastel-gray-dark))"
                  }, {
                    icon: <Search className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(206 35% 79%)',
                    title: "Otimização SEO",
                    desc: "Meta tags e palavras-chave otimizadas",
                    status: "Detalhes",
                    statusColor: "hsl(var(--pastel-gray-dark))",
                    isButton: true
                  }, {
                    icon: <Globe className="text-xl" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />,
                    bg: 'hsl(152 32% 79%)',
                    title: "Segmentação GEO",
                    desc: "Brasil: 95% • Internacional: 5%",
                    status: "Configurar",
                    statusColor: "hsl(var(--pastel-gray-dark))",
                    isButton: true
                  }].map((item, idx) => <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-200" style={{
                    backgroundColor: item.bg
                  }}>
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <div>
                            <p className="font-medium text-sm" style={{
                          color: 'hsl(var(--foreground))'
                        }}>
                              {item.title}
                            </p>
                            <p className="text-xs" style={{
                          color: 'hsl(var(--muted-foreground))'
                        }}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        {item.isButton ? <button className="font-bold text-sm hover:underline" style={{
                      color: item.statusColor
                    }}>
                            {item.status}
                          </button> : <span className="font-bold text-sm" style={{
                      color: item.statusColor
                    }}>
                            {item.status}
                          </span>}
                      </div>)}
                  </div>
                </div>
              </div>

              {/* Right Column - Actions & Settings */}
              <div className="space-y-6">
                {/* Publish Card */}
                <div className="rounded-2xl p-6 border border-slate-200" style={{
                backgroundColor: 'hsl(var(--pastel-purple))'
              }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <Rocket size={24} style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{
                      color: 'hsl(var(--foreground))'
                    }}>
                        Pronto para Publicar!
                      </h3>
                      <p className="text-sm" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Sua newsletter está otimizada
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>Score de Qualidade</span>
                      <span className="font-bold" style={{
                      color: 'hsl(var(--foreground))'
                    }}>95/100</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 border border-slate-200">
                      <div className="h-2 rounded-full" style={{
                      width: '95%',
                      backgroundColor: 'hsl(var(--pastel-green))'
                    }}></div>
                    </div>
                  </div>
                  <button onClick={handlePublish} className="w-full py-4 bg-white rounded-xl font-bold text-lg hover:bg-slate-50 transition border border-slate-200 flex items-center justify-center gap-2" style={{
                  color: 'hsl(var(--pastel-gray-dark))'
                }}>
                    <Send size={20} />
                    Publicar Agora
                  </button>
                  <button className="w-full mt-3 py-3 bg-white rounded-xl font-semibold hover:bg-slate-50 transition border border-slate-200 flex items-center justify-center gap-2" style={{
                  color: 'hsl(var(--pastel-gray-dark))'
                }}>
                    <Clock size={18} />
                    Agendar Envio
                  </button>
                </div>

                {/* Quality Check Score Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                    backgroundColor: 'hsl(var(--pastel-purple))'
                  }}>
                      <SpellCheck style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />
                    </div>
                    <h3 className="font-bold text-lg" style={{
                    color: 'hsl(var(--foreground))'
                  }}>
                      Verificação de Qualidade
                    </h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Score Geral
                      </span>
                      <span className="text-3xl font-bold" style={{
                      color: 'hsl(var(--foreground))'
                    }}>
                        95<span className="text-lg" style={{
                        color: 'hsl(var(--muted-foreground))'
                      }}>/100</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all" style={{
                      width: '95%',
                      backgroundColor: 'hsl(var(--pastel-green))'
                    }}></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3 rounded-xl font-semibold hover:opacity-80 transition border border-slate-200 flex items-center justify-center gap-2" 
                    style={{
                      backgroundColor: 'hsl(var(--pastel-purple-btn))',
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                    <Info size={18} />
                    Gerar Verificação 
                  </button>
                </div>

                {/* Quality Check Modal */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-xl">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}
                        >
                          <SpellCheck style={{ color: 'hsl(var(--pastel-gray-dark))' }} />
                        </div>
                        Verificação de Qualidade
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-6">
                      {/* Score Section */}
                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>
                            Score Geral
                          </span>
                          <span className="text-4xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                            95<span className="text-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>/100</span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-500"
                            style={{ width: '95%', backgroundColor: 'hsl(var(--pastel-green))' }}
                          ></div>
                        </div>
                      </div>

                      {/* Quality Items */}
                      <div className="space-y-3">
                        {qualityItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 rounded-xl border transition-all duration-300"
                              style={{
                                backgroundColor: isLoading ? 'hsl(220 13% 95%)' : item.bgColor,
                                borderColor: isLoading ? 'hsl(220 13% 90%)' : 'hsl(var(--border))',
                                opacity: isLoading ? 0.6 : 1
                              }}
                            >
                              <div className="flex items-center gap-3">
                                {/* Icon/Loader on the left */}
                                <div className="shrink-0">
                                  {isLoading ? (
                                    <Loader2 
                                      size={20} 
                                      className="animate-spin" 
                                      style={{ color: 'hsl(220 13% 70%)' }}
                                    />
                                  ) : (
                                    <Icon size={20} style={{ color: 'hsl(var(--pastel-gray-dark))' }} />
                                  )}
                                </div>

                                {/* Content */}
                                <div>
                                  <p 
                                    className="font-medium text-sm mb-1"
                                    style={{ 
                                      color: isLoading ? 'hsl(220 13% 70%)' : 'hsl(var(--foreground))'
                                    }}
                                  >
                                    {item.label}
                                  </p>
                                  <p 
                                    className="text-xs"
                                    style={{ 
                                      color: isLoading ? 'hsl(220 13% 75%)' : 'hsl(var(--muted-foreground))'
                                    }}
                                  >
                                    {isLoading ? 'Verificando...' : item.description}
                                  </p>
                                </div>
                              </div>

                              {/* Status Text/Button */}
                              {!isLoading && (
                                item.hasButton ? (
                                  <button 
                                    className="font-bold text-sm hover:underline shrink-0"
                                    style={{ color: 'hsl(var(--pastel-gray-dark))' }}
                                  >
                                    {item.statusText}
                                  </button>
                                ) : (
                                  <span 
                                    className="font-bold text-sm shrink-0"
                                    style={{ color: 'hsl(var(--pastel-gray-dark))' }}
                                  >
                                    {item.statusText}
                                  </span>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Reach Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{
                  color: 'hsl(var(--foreground))'
                }}>
                    <Users style={{
                    color: 'hsl(var(--pastel-gray-dark))'
                  }} />
                    Alcance Estimado
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{
                        color: 'hsl(var(--pastel-gray-dark))'
                      }}>
                          Destinatários
                        </span>
                        <span className="text-2xl font-bold" style={{
                        color: 'hsl(var(--foreground))'
                      }}>
                          12,450
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{
                      color: 'hsl(var(--muted-foreground))'
                    }}>
                        <CheckCircle size={14} className="text-green-500" />
                        <span>Todos os assinantes ativos</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-sm mb-3" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Previsão de Engajamento
                      </p>
                      <div className="space-y-2">
                        {[{
                        label: "Taxa de Abertura",
                        value: "28-32%"
                      }, {
                        label: "Cliques Estimados",
                        value: "15-18%"
                      }, {
                        label: "Compartilhamentos",
                        value: "5-8%"
                      }].map((metric, idx) => <div key={idx} className="flex justify-between text-sm">
                            <span style={{
                          color: 'hsl(var(--pastel-gray-dark))'
                        }}>{metric.label}</span>
                            <span className="font-semibold" style={{
                          color: 'hsl(var(--foreground))'
                        }}>
                              {metric.value}
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2" style={{
                  color: 'hsl(var(--foreground))'
                }}>
                    <SettingsIcon style={{
                    color: 'hsl(var(--pastel-gray-dark))'
                  }} />
                    Configurações Finais
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Linha de Assunto
                      </label>
                      <input type="text" defaultValue="💳 Transformação Digital - Pix Ultrapassa 3 Bilhões!" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-offset-2" style={{
                      color: 'hsl(var(--foreground))',
                      outlineColor: 'hsl(var(--pastel-purple))'
                    }} />
                      <p className="text-xs mt-1" style={{
                      color: 'hsl(var(--muted-foreground))'
                    }}>
                        62 caracteres • Ótimo tamanho
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Pré-visualização
                      </label>
                      <textarea rows={2} defaultValue="Descubra como o Pix e novas tecnologias estão transformando a adquirência..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-offset-2" style={{
                      color: 'hsl(var(--foreground))',
                      outlineColor: 'hsl(var(--pastel-purple))'
                    }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Nome do Remetente
                      </label>
                      <input type="text" defaultValue="FinLearn - Educação Financeira" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-offset-2" style={{
                      color: 'hsl(var(--foreground))',
                      outlineColor: 'hsl(var(--pastel-purple))'
                    }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        E-mail de Resposta
                      </label>
                      <input type="email" defaultValue="contato@finlearn.com.br" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-offset-2" style={{
                      color: 'hsl(var(--foreground))',
                      outlineColor: 'hsl(var(--pastel-purple))'
                    }} />
                    </div>
                  </div>
                </div>

                {/* Expert Tip Card */}
                <div className="rounded-2xl p-6 border border-slate-200" style={{
                backgroundColor: 'hsl(var(--pastel-blue))'
              }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                      <Info style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2" style={{
                      color: 'hsl(var(--foreground))'
                    }}>
                        Dica do Especialista
                      </h4>
                      <p className="text-sm leading-relaxed" style={{
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Newsletters enviadas entre 9h-11h têm <strong>23% mais abertura</strong>. Considere agendar
                        para terça ou quinta-feira.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Version History Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold mb-4" style={{
                  color: 'hsl(var(--foreground))'
                }}>
                    Histórico de Versões
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{
                      backgroundColor: 'hsl(var(--pastel-purple))'
                    }}>
                        <Save size={14} style={{
                        color: 'hsl(var(--pastel-gray-dark))'
                      }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{
                        color: 'hsl(var(--foreground))'
                      }}>
                          Versão Atual
                        </p>
                        <p className="text-xs" style={{
                        color: 'hsl(var(--muted-foreground))'
                      }}>
                          Salvo há 2 minutos
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded" style={{
                      backgroundColor: 'hsl(var(--pastel-green))',
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                        Atual
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition border border-slate-100">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                        <History size={14} style={{
                        color: 'hsl(var(--pastel-gray-dark))'
                      }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{
                        color: 'hsl(var(--pastel-gray-dark))'
                      }}>
                          Rascunho v2
                        </p>
                        <p className="text-xs" style={{
                        color: 'hsl(var(--muted-foreground))'
                      }}>
                          Há 1 hora
                        </p>
                      </div>
                      <button style={{
                      color: 'hsl(var(--muted-foreground))'
                    }} className="hover:opacity-70">
                        <Undo size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-10 mt-8 border-t border-slate-200">
              <button onClick={() => navigate("/agendar-publicacao")} className="px-6 py-3 rounded-xl border border-slate-300 font-medium hover:bg-slate-50 transition flex items-center gap-2" style={{
              color: 'hsl(var(--pastel-gray-dark))'
            }}>
                <ArrowLeft size={18} />
                Voltar para Configuração
              </button>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-xl font-medium hover:bg-slate-100 transition flex items-center gap-2 border border-slate-200" style={{
                color: 'hsl(var(--pastel-gray-dark))'
              }}>
                  <Download size={18} />
                  Exportar HTML
                </button>
                <button onClick={handlePublish} className="px-8 py-3 rounded-xl font-bold hover:opacity-80 transition border border-slate-200 flex items-center gap-2" style={{
                backgroundColor: 'hsl(var(--pastel-purple-btn))',
                color: 'hsl(var(--pastel-gray-dark))'
              }}>
                  <Rocket size={18} />
                  Publicar Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default AgendarPublicacaoRevisao;