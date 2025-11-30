import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Plus, Bell, UserPlus, Check, ThumbsUp, Share2, Bookmark, MoreHorizontal, Reply, MessageCircle, Eye, Clock, Users, Calendar, Mail } from "lucide-react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Discussao = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [sortBy, setSort] = useState("relevantes");

  const topics = [
    {
      id: 1,
      title: "Pix Automático: Impactos no Mercado",
      author: "Carlos Mendes",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      category: "Tendências",
      categoryColor: "bg-[hsl(142,35%,75%)]",
      excerpt: "Como vocês estão se preparando para a implementação do Pix Automático? Quais os principais desafios técnicos?",
      replies: 24,
      views: 312,
      time: "há 15 min",
      active: true
    },
    {
      id: 2,
      title: "Open Finance: Casos de Uso Reais",
      author: "Marina Silva",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      category: "Discussão",
      categoryColor: "bg-[hsl(44,40%,75%)]",
      excerpt: "Gostaria de conhecer cases práticos de implementação de Open Finance que geraram valor real para os clientes.",
      replies: 18,
      views: 198,
      time: "há 42 min",
      active: false
    },
    {
      id: 3,
      title: "Drex: Cronograma e Expectativas",
      author: "Pedro Santos",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      category: "Novidade",
      categoryColor: "bg-[hsl(338,35%,75%)]",
      excerpt: "Alguém tem informações atualizadas sobre o roadmap do Drex? Como as instituições estão se posicionando?",
      replies: 31,
      views: 445,
      time: "há 1h",
      active: false
    },
    {
      id: 4,
      title: "Segurança em Transações Instantâneas",
      author: "Juliana Costa",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      category: "Técnico",
      categoryColor: "bg-[hsl(22,35%,75%)]",
      excerpt: "Quais protocolos de segurança vocês implementam para prevenir fraudes em pagamentos instantâneos?",
      replies: 12,
      views: 156,
      time: "há 2h",
      active: false
    },
    {
      id: 5,
      title: "Integração com Fintechs",
      author: "Roberto Lima",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      category: "Parceria",
      categoryColor: "bg-[hsl(270,35%,75%)]",
      excerpt: "Experiências e desafios na integração de sistemas legados com soluções de fintechs parceiras.",
      replies: 9,
      views: 134,
      time: "há 3h",
      active: false
    },
    {
      id: 6,
      title: "Regulação de Pagamentos 2024",
      author: "Amanda Oliveira",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      category: "Regulatório",
      categoryColor: "bg-[hsl(207,35%,75%)]",
      excerpt: "Discussão sobre as novas diretrizes do Bacen para o setor de pagamentos previstas para 2024.",
      replies: 27,
      views: 367,
      time: "há 4h",
      active: false
    }
  ];

  const replies = [
    {
      id: 1,
      author: "Ricardo Almeida",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      badge: "Especialista",
      badgeColor: "bg-[hsl(270,35%,75%)]",
      time: "há 8 minutos",
      content: [
        "Excelente tópico, Carlos! Aqui no banco estamos trabalhando em três frentes principais: infraestrutura técnica, gestão de riscos e experiência do usuário. O maior desafio tem sido garantir a escalabilidade do sistema para suportar o volume esperado de transações.",
        "Implementamos uma arquitetura de microserviços que nos permite processar as autorizações de forma distribuída. Também estamos investindo pesado em machine learning para detecção de fraudes em tempo real."
      ],
      likes: 18,
      hasReplies: false
    },
    {
      id: 2,
      author: "Ana Paula Santos",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      badge: null,
      time: "há 12 minutos",
      content: [
        "Do ponto de vista de compliance, estamos revisando todos os nossos procedimentos de KYC e monitoramento de transações. O Pix Automático traz novos desafios regulatórios que precisam ser mapeados com cuidado.",
        "Uma preocupação importante é garantir que os clientes tenham controle total sobre as autorizações e possam cancelar facilmente quando necessário. A transparência será fundamental para ganhar a confiança dos usuários."
      ],
      likes: 25,
      hasReplies: true,
      nestedReply: {
        author: "Carlos Mendes",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
        badge: "Autor",
        badgeColor: "bg-[hsl(207,35%,75%)]",
        time: "há 5 minutos",
        content: "Concordo totalmente, Ana Paula! A experiência de gerenciamento das autorizações será crucial. Estamos desenvolvendo um painel intuitivo onde o cliente pode visualizar todas as autorizações ativas e gerenciá-las facilmente.",
        likes: 12
      }
    },
    {
      id: 3,
      author: "Fernando Costa",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      badge: null,
      time: "há 18 minutos",
      content: [
        "Pessoal, alguém já pensou nos casos de uso além dos pagamentos recorrentes tradicionais? Vejo potencial enorme para integração com IoT, por exemplo. Imaginem um carro que paga automaticamente o estacionamento ou pedágio.",
        "Também há oportunidades interessantes no B2B, especialmente para pagamentos de fornecedores e folha de pagamento. As possibilidades são infinitas!"
      ],
      likes: 31,
      hasReplies: false
    },
    {
      id: 4,
      author: "Juliana Rodrigues",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      badge: null,
      time: "há 22 minutos",
      content: [
        "Uma questão importante que não vi mencionada ainda: como vocês estão lidando com a educação financeira dos clientes? Muita gente ainda não entende completamente como funciona o Pix tradicional, imagina adicionar a camada de automação.",
        "Estamos desenvolvendo uma campanha de comunicação bem didática, com vídeos explicativos e simulações práticas no app. A adoção vai depender muito de quão bem conseguirmos explicar os benefícios e riscos."
      ],
      likes: 15,
      hasReplies: false
    }
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border flex-shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/todas-comunidades")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[hsl(207,35%,75%)] overflow-hidden flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7751f850a-69a10e658ef483c7546c.png" 
                    alt="community icon" 
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Inovação em Pagamentos</h1>
                  <p className="text-sm text-muted-foreground">12.5k membros • 150 online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="outline" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Convidar
              </Button>
              <Button className="gap-2 bg-[hsl(142,35%,75%)] bg-opacity-30 text-foreground hover:bg-opacity-100">
                <Check className="h-4 w-4" />
                Seguindo
              </Button>
            </div>
          </div>
          
          <div className="px-6 py-3 bg-muted/30 border-b border-border flex items-center gap-6 overflow-x-auto">
            <button className="text-sm font-medium text-foreground border-b-2 border-[hsl(207,50%,60%)] pb-3 -mb-3.5 whitespace-nowrap">Discussões</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap">Sobre</button>
            <button 
              onClick={() => navigate("/participantes-confirmados")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap"
            >
              Membros
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap">Eventos</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap">Recursos</button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Topics Sidebar */}
          <div className="w-80 bg-background border-r border-border flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar tópicos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="p-4 border-b border-border">
              <Button 
                onClick={() => setIsNewTopicModalOpen(true)}
                className="w-full bg-[hsl(270,35%,75%)] text-foreground hover:bg-opacity-80"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Tópico
              </Button>
            </div>

            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tópicos Recentes</span>
              <Select value={sortBy} onValueChange={setSort}>
                <SelectTrigger className="w-[120px] h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevantes">Todos</SelectItem>
                  <SelectItem value="sem-resposta">Sem resposta</SelectItem>
                  <SelectItem value="resolvidos">Resolvidos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-y-auto">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition ${
                    topic.active ? 'bg-[hsl(207,35%,75%)] bg-opacity-20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={topic.avatar} 
                      alt={topic.author} 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground line-clamp-1">{topic.title}</h3>
                        <span className={`${topic.categoryColor} text-foreground text-xs px-2 py-0.5 rounded font-medium flex-shrink-0`}>
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{topic.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {topic.replies} respostas
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {topic.views}
                        </span>
                        <span className="flex-1 text-right">{topic.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Discussion Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              {/* Topic Header */}
              <div className="bg-background rounded-xl border border-border p-6 mb-6">
                <div className="flex items-start gap-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                    alt="User" 
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">Pix Automático: Impactos no Mercado</h2>
                      <span className="bg-[hsl(142,35%,75%)] text-foreground text-xs px-3 py-1 rounded-full font-medium">Tendências</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="font-medium text-foreground">Carlos Mendes</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        há 15 minutos
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        312 visualizações
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Olá pessoal! Com a aproximação do lançamento do Pix Automático, gostaria de abrir uma discussão sobre como vocês estão se preparando nas suas instituições. Quais são os principais desafios técnicos que vocês identificaram? Como estão estruturando as equipes e os processos internos?
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Do ponto de vista de negócio, vejo uma oportunidade enorme para simplificar pagamentos recorrentes e melhorar a experiência do cliente. Mas também há questões importantes de segurança e compliance que precisam ser endereçadas.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Compartilhem suas experiências e insights!
                    </p>
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>42</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Compartilhar
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Bookmark className="h-4 w-4" />
                        Salvar
                      </Button>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">24 Respostas</h3>
                <Select defaultValue="relevantes">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevantes">Mais Relevantes</SelectItem>
                    <SelectItem value="recentes">Mais Recentes</SelectItem>
                    <SelectItem value="antigas">Mais Antigas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Replies List */}
              <div className="space-y-4">
                {replies.map((reply) => (
                  <div key={reply.id} className="bg-background rounded-xl border border-border p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={reply.avatar} 
                        alt={reply.author} 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-foreground">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">{reply.time}</span>
                          {reply.badge && (
                            <span className={`${reply.badgeColor} text-foreground text-xs px-2 py-0.5 rounded font-medium`}>
                              {reply.badge}
                            </span>
                          )}
                        </div>
                        {reply.content.map((paragraph, idx) => (
                          <p key={idx} className="text-muted-foreground leading-relaxed mb-3">
                            {paragraph}
                          </p>
                        ))}
                        <div className="flex items-center gap-4 mt-4">
                          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(207,50%,60%)] transition">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(207,50%,60%)] transition">
                            <Reply className="h-4 w-4" />
                            Responder
                          </button>
                          <button className="ml-auto text-sm text-muted-foreground hover:text-foreground transition">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Nested Reply */}
                    {reply.hasReplies && reply.nestedReply && (
                      <div className="ml-16 mt-4 pl-6 border-l-2 border-border">
                        <div className="flex items-start gap-4">
                          <img 
                            src={reply.nestedReply.avatar} 
                            alt={reply.nestedReply.author} 
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-foreground">{reply.nestedReply.author}</span>
                              <span className="text-xs text-muted-foreground">{reply.nestedReply.time}</span>
                              {reply.nestedReply.badge && (
                                <span className={`${reply.nestedReply.badgeColor} text-foreground text-xs px-2 py-0.5 rounded font-medium`}>
                                  {reply.nestedReply.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {reply.nestedReply.content}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(207,50%,60%)] transition">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{reply.nestedReply.likes}</span>
                              </button>
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(207,50%,60%)] transition">
                                <Reply className="h-4 w-4" />
                                Responder
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="mt-6 bg-background rounded-xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <Textarea
                      placeholder="Adicione sua resposta..."
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex items-center justify-end gap-3 mt-4">
                      <Button className="bg-[hsl(270,35%,75%)] text-foreground hover:bg-opacity-80">
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Community Info Sidebar */}
          <aside className="w-80 bg-background border-l border-border flex-shrink-0 overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Sobre a Comunidade</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Discussões sobre o futuro dos meios de pagamento, Pix Automático, Drex e Open Finance no Brasil. Compartilhe experiências e aprenda com especialistas do mercado.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-[hsl(207,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">12.5k</p>
                    <p className="text-xs text-muted-foreground">Membros</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-[hsl(142,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">1.2k</p>
                    <p className="text-xs text-muted-foreground">Tópicos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-[hsl(270,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Criada em</p>
                    <p className="text-xs text-muted-foreground">Janeiro 2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Moderadores</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                    alt="Moderator" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Ricardo Almeida</p>
                    <p className="text-xs text-muted-foreground">Especialista</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                    alt="Moderator" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Ana Paula Santos</p>
                    <p className="text-xs text-muted-foreground">Moderadora</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Regras da Comunidade</h3>
              <div className="space-y-3">
                {[
                  "Seja respeitoso e profissional",
                  "Compartilhe conhecimento relevante",
                  "Evite spam e autopromoção excessiva",
                  "Mantenha discussões construtivas"
                ].map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[hsl(142,35%,75%)] bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4">Tags Populares</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Pix", color: "bg-[hsl(207,35%,75%)]" },
                  { name: "Open Finance", color: "bg-[hsl(142,35%,75%)]" },
                  { name: "Drex", color: "bg-[hsl(270,35%,75%)]" },
                  { name: "Regulação", color: "bg-[hsl(44,40%,75%)]" },
                  { name: "Segurança", color: "bg-[hsl(338,35%,75%)]" },
                  { name: "API", color: "bg-[hsl(22,35%,75%)]" }
                ].map((tag) => (
                  <span 
                    key={tag.name}
                    className={`px-3 py-1 ${tag.color} bg-opacity-30 text-foreground text-xs rounded-full font-medium`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Membros Ativos</h3>
              <div className="space-y-3">
                {[
                  { name: "Carlos Mendes", posts: 124, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" },
                  { name: "Ana Paula Santos", posts: 98, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" },
                  { name: "Ricardo Almeida", posts: 87, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" },
                  { name: "Fernando Costa", posts: 76, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" }
                ].map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* New Topic Modal */}
      <Dialog open={isNewTopicModalOpen} onOpenChange={setIsNewTopicModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Tópico</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Título do Tópico</label>
              <Input type="text" placeholder="Ex: Dúvida sobre integração com API do Bacen" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tendencias">Tendências</SelectItem>
                  <SelectItem value="discussao">Discussão</SelectItem>
                  <SelectItem value="novidade">Novidade</SelectItem>
                  <SelectItem value="tecnico">Técnico</SelectItem>
                  <SelectItem value="regulatorio">Regulatório</SelectItem>
                  <SelectItem value="duvida">Dúvida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
              <Textarea 
                rows={6} 
                placeholder="Descreva sua dúvida ou compartilhe suas ideias..." 
                className="resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
              <Input type="text" placeholder="Ex: pix, open-finance, api" />
              <p className="text-xs text-muted-foreground mt-1">Separe as tags com vírgulas</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button className="flex-1 bg-[hsl(270,35%,75%)] text-foreground hover:bg-opacity-80">
                Publicar Tópico
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsNewTopicModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discussao;
