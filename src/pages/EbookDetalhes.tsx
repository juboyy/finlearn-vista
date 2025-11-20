import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bell, Share2, Heart, ShoppingCart, Download, Check, ThumbsUp, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EbookDetalhes = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-pastel-blue">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-muted-foreground hover:bg-slate-100 rounded-lg transition"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Detalhes do Produto</h1>
                  <p className="text-sm text-muted-foreground mt-1">Guia Completo dos Cartões de Crédito</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-muted-foreground hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-muted-foreground hover:bg-slate-100 rounded-lg transition">
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Product Images - Sidebar */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl border border-border overflow-hidden sticky top-24">
                <div className="h-96 overflow-hidden bg-pastel-green flex items-center justify-center p-8">
                  <img 
                    className="w-full h-full object-contain" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c9b1195fa2-c3970b93abb109d59ff9.png" 
                    alt="Credit cards illustration" 
                  />
                </div>
                <div className="p-6 space-y-3">
                  <button className="w-full px-6 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition text-lg">
                    <ShoppingCart className="inline-block mr-2" size={20} />
                    Comprar Agora - R$ 89
                  </button>
                  <button className="w-full px-6 py-3 border-2 border-slate-800 text-slate-800 rounded-lg font-semibold hover:bg-slate-50 transition">
                    <Download className="inline-block mr-2" size={20} />
                    Prévia Grátis
                  </button>
                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Formato:</span>
                      <span className="font-medium text-foreground">PDF, EPUB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Páginas:</span>
                      <span className="font-medium text-foreground">312 páginas</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Idioma:</span>
                      <span className="font-medium text-foreground">Português</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Atualização:</span>
                      <span className="font-medium text-foreground">Janeiro 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-span-2 space-y-6">
              {/* Header Section */}
              <div className="bg-white rounded-xl border border-border p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-pastel-green text-foreground text-sm font-medium rounded-full mb-3">eBook</span>
                    <h2 className="text-3xl font-bold text-foreground mb-3">Guia Completo dos Cartões de Crédito</h2>
                    <p className="text-lg text-muted-foreground">
                      Entenda o ecossistema de pagamentos, bandeiras, adquirência e todos os aspectos operacionais e regulatórios dos cartões de crédito no Brasil
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                      className="w-12 h-12 rounded-full object-cover" 
                      alt="Author" 
                    />
                    <div>
                      <p className="font-semibold text-foreground">Ricardo Almeida</p>
                      <p className="text-sm text-muted-foreground">Especialista em Meios de Pagamento, 18 anos</p>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-border"></div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-500"></i>
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">4.9</span>
                    <span className="text-muted-foreground">(243 avaliações)</span>
                  </div>
                  <div className="h-10 w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">1.247</p>
                    <p className="text-sm text-muted-foreground">vendas</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-pastel-blue text-foreground text-sm rounded-full">Meios de Pagamento</span>
                  <span className="px-3 py-1 bg-pastel-blue text-foreground text-sm rounded-full">Adquirência</span>
                  <span className="px-3 py-1 bg-pastel-blue text-foreground text-sm rounded-full">Bandeiras</span>
                  <span className="px-3 py-1 bg-pastel-blue text-foreground text-sm rounded-full">Regulação Bacen</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Sobre este eBook</h3>
                <div className="prose prose-slate max-w-none space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Este guia abrangente foi desenvolvido para profissionais do mercado financeiro e de meios de pagamento que desejam dominar todos os aspectos do ecossistema de cartões de crédito no Brasil. Com 312 páginas de conteúdo técnico e prático, você terá acesso a informações detalhadas sobre bandeiras, adquirentes, emissores, modelos de negócio e regulação.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    O material cobre desde a história e evolução dos cartões de crédito até as tecnologias mais recentes como tokenização, pagamentos contactless e Open Banking. Aborda também aspectos operacionais como processamento de transações, liquidação, chargeback, antifraude e compliance com as normas do Banco Central e demais reguladores.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Ideal para profissionais de bancos, fintechs, adquirentes, bandeiras, subadquirentes, varejistas e todos que trabalham ou desejam trabalhar com meios de pagamento. Inclui casos reais do mercado brasileiro, análise de modelos de precificação (MDR, interchange) e tendências do setor.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">O que você vai aprender</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: "Ecossistema de Pagamentos",
                      description: "Entenda todos os players: bandeiras, emissores, adquirentes, subadquirentes"
                    },
                    {
                      title: "Fluxo de Transações",
                      description: "Processamento completo desde autorização até liquidação financeira"
                    },
                    {
                      title: "Modelos de Precificação",
                      description: "MDR, interchange, taxas e estrutura de custos do setor"
                    },
                    {
                      title: "Regulação e Compliance",
                      description: "Normas do Bacen, PCI-DSS, LGPD e outras regulamentações"
                    },
                    {
                      title: "Gestão de Risco e Fraude",
                      description: "Estratégias de prevenção, detecção e mitigação de fraudes"
                    },
                    {
                      title: "Inovações Tecnológicas",
                      description: "Tokenização, NFC, QR Code, wallets digitais e tendências"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="text-foreground" size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contents */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Índice do Conteúdo</h3>
                <div className="space-y-3">
                  {[
                    { title: "História e Evolução dos Cartões", subtitle: "Do surgimento às tecnologias atuais", pages: "38 páginas" },
                    { title: "Ecossistema e Players do Mercado", subtitle: "Bandeiras, emissores, adquirentes e subadquirentes", pages: "56 páginas" },
                    { title: "Processamento de Transações", subtitle: "Fluxo completo e aspectos técnicos", pages: "64 páginas" },
                    { title: "Modelos Econômicos e Precificação", subtitle: "MDR, interchange e estrutura de custos", pages: "48 páginas" },
                    { title: "Regulação e Compliance", subtitle: "Normas Bacen, PCI-DSS e LGPD", pages: "52 páginas" },
                    { title: "Gestão de Risco e Antifraude", subtitle: "Estratégias e tecnologias de proteção", pages: "54 páginas" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                          <span className="text-sm font-semibold text-foreground">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.pages}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Sobre o Autor</h3>
                <div className="flex items-start gap-6">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                    className="w-24 h-24 rounded-xl object-cover" 
                    alt="Author" 
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-2">Ricardo Almeida</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Especialista em meios de pagamento com 18 anos de experiência no setor. Atuou em grandes adquirentes, bandeiras e fintechs, liderando projetos de inovação e regulação. Palestrante frequente em eventos do setor e consultor para empresas que desejam entrar no mercado de pagamentos.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-book text-pastel-purple"></i>
                        <span>8 publicações</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-users text-pastel-purple"></i>
                        <span>4.8k seguidores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span>4.9 avaliação média</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 border-2 border-slate-800 text-slate-800 rounded-lg font-medium hover:bg-slate-50 transition">
                    Seguir
                  </button>
                </div>
              </div>

              {/* Ratings */}
              <div className="bg-white rounded-xl border border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Avaliações</h3>
                  <button className="px-4 py-2 bg-pastel-blue text-foreground rounded-lg font-medium hover:bg-opacity-80 transition">
                    Escrever Avaliação
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-8 mb-8 pb-8 border-b border-border">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-2">4.9</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-500"></i>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">243 avaliações</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    {[
                      { stars: 5, percentage: 85, count: 207 },
                      { stars: 4, percentage: 12, count: 28 },
                      { stars: 3, percentage: 2, count: 5 },
                      { stars: 2, percentage: 1, count: 2 },
                      { stars: 1, percentage: 0, count: 1 }
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-12">
                          {item.stars} <i className="fas fa-star text-yellow-500 text-xs"></i>
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: "Marcos Pereira",
                      time: "há 3 dias",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
                      title: "Referência essencial para profissionais do setor",
                      review: "Trabalho em uma fintech de pagamentos e este guia se tornou minha bíblia. Cobre todos os aspectos do ecossistema de forma profunda e atualizada. A parte sobre regulação Bacen está impecável. Recomendo fortemente para quem atua ou quer atuar no setor.",
                      helpful: 42
                    },
                    {
                      name: "Ana Carolina",
                      time: "há 1 semana",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
                      title: "Conteúdo técnico e muito bem explicado",
                      review: "Excelente material! Consegui entender todo o fluxo de processamento e os modelos de precificação. Como gerente de produto em uma adquirente, esse guia me ajudou muito a compreender melhor nosso negócio. Os diagramas e exemplos práticos são ótimos.",
                      helpful: 35
                    },
                    {
                      name: "Lucas Rodrigues",
                      time: "há 2 semanas",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
                      title: "Perfeito para quem está entrando no mercado",
                      review: "Recém contratado por uma bandeira e precisava entender rapidamente o mercado. Este guia foi fundamental! Linguagem clara, conteúdo completo e muito atualizado com as mudanças recentes do Bacen. Investimento que se paga rapidamente.",
                      helpful: 28
                    }
                  ].map((review, index) => (
                    <div key={index} className={`pb-6 ${index < 2 ? 'border-b border-border' : ''}`}>
                      <div className="flex items-start gap-4">
                        <img src={review.avatar} className="w-12 h-12 rounded-full object-cover" alt="Reviewer" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{review.name}</h4>
                              <p className="text-sm text-muted-foreground">Compra verificada • {review.time}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-500 text-sm"></i>
                              ))}
                            </div>
                          </div>
                          <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
                          <p className="text-muted-foreground leading-relaxed mb-3">{review.review}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="hover:text-foreground transition">
                              <ThumbsUp className="inline-block mr-1" size={14} />
                              Útil ({review.helpful})
                            </button>
                            <button className="hover:text-foreground transition">
                              <MessageCircle className="inline-block mr-1" size={14} />
                              Responder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-slate-50 transition">
                  Ver Todas as Avaliações
                </button>
              </div>

              {/* Related Products */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Produtos Relacionados</h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      title: "Guia Completo do PIX",
                      price: "R$ 69",
                      rating: 4.8,
                      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/25b971e736-37de3b2eb9a9f5ba6c37.png",
                      bg: "bg-pastel-yellow"
                    },
                    {
                      title: "Open Banking na Prática",
                      price: "R$ 99",
                      rating: 4.9,
                      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fad4bb77ae-23c2023bb461b92365b0.png",
                      bg: "bg-pastel-peach"
                    },
                    {
                      title: "Antifraude e Segurança",
                      price: "R$ 119",
                      rating: 4.7,
                      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b6e33c4a92-3ac8887220faf5e40ca1.png",
                      bg: "bg-pastel-pink"
                    }
                  ].map((product, index) => (
                    <div key={index} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition group">
                      <div className={`h-40 overflow-hidden ${product.bg}`}>
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          src={product.image} 
                          alt={product.title} 
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{product.title}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-foreground">{product.price}</span>
                          <div className="flex items-center gap-1 text-xs">
                            <i className="fas fa-star text-yellow-500"></i>
                            <span className="font-medium text-foreground">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Perguntas Frequentes</h3>
                <div className="space-y-4">
                  {[
                    {
                      question: "Em que formato recebo o eBook?",
                      answer: "Você receberá o eBook nos formatos PDF e EPUB, compatíveis com todos os dispositivos e leitores digitais."
                    },
                    {
                      question: "O conteúdo está atualizado com as normas do Bacen?",
                      answer: "Sim, o material foi atualizado em janeiro de 2025 e inclui todas as regulamentações mais recentes do Banco Central."
                    },
                    {
                      question: "Recebo atualizações do conteúdo?",
                      answer: "Sim, todas as atualizações futuras são gratuitas e você será notificado automaticamente quando houver novas versões."
                    },
                    {
                      question: "É adequado para iniciantes no setor?",
                      answer: "Sim, o guia começa do básico e evolui gradualmente para tópicos mais avançados, sendo ideal tanto para iniciantes quanto profissionais experientes."
                    },
                    {
                      question: "Há garantia de reembolso?",
                      answer: "Sim, oferecemos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do valor investido."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-5">
                      <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-border mt-12">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">© 2025 FinLearn. Todos os direitos reservados.</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition">Termos de Uso</a>
                <a href="#" className="hover:text-foreground transition">Política de Privacidade</a>
                <a href="#" className="hover:text-foreground transition">Suporte</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default EbookDetalhes;
