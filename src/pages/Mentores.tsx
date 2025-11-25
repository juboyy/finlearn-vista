import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Briefcase, Calendar } from "lucide-react";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live';

const Mentores = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("todos");

  const mentores = [
    {
      id: 1,
      name: "Dr. Carlos Silva",
      specialty: "Especialista em Pagamentos Digitais",
      rating: 4.9,
      reviews: 127,
      location: "São Paulo, SP",
      experience: "15 anos",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      price: "R$ 350",
      availability: "Disponível esta semana"
    },
    {
      id: 2,
      name: "Ana Rodrigues",
      specialty: "Consultora em Open Banking",
      rating: 4.8,
      reviews: 89,
      location: "Rio de Janeiro, RJ",
      experience: "12 anos",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      price: "R$ 400",
      availability: "Próxima semana"
    },
    {
      id: 3,
      name: "Prof. João Santos",
      specialty: "Expert em Compliance Financeiro",
      rating: 5.0,
      reviews: 203,
      location: "Brasília, DF",
      experience: "20 anos",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      price: "R$ 500",
      availability: "Disponível hoje"
    },
    {
      id: 4,
      name: "Mariana Costa",
      specialty: "Mentora em Fintechs e Inovação",
      rating: 4.7,
      reviews: 156,
      location: "Belo Horizonte, MG",
      experience: "10 anos",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
      price: "R$ 320",
      availability: "Disponível esta semana"
    },
    {
      id: 5,
      name: "Ricardo Oliveira",
      specialty: "Consultor em Meios de Pagamento",
      rating: 4.9,
      reviews: 178,
      location: "Curitiba, PR",
      experience: "18 anos",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      price: "R$ 450",
      availability: "Próxima semana"
    },
    {
      id: 6,
      name: "Juliana Ferreira",
      specialty: "Especialista em Criptomoedas",
      rating: 4.8,
      reviews: 92,
      location: "Florianópolis, SC",
      experience: "8 anos",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      price: "R$ 380",
      availability: "Disponível esta semana"
    }
  ];

  const filteredMentores = mentores.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
      <SidebarFix />
      
      <div className="pl-64">
        <MenutabbarFix activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Mentores</h1>
            <p className="text-slate-600">Conecte-se com especialistas do mercado financeiro</p>
          </div>

          {/* Menu de navegação */}
          <div className="flex gap-3 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/autores")}
              className="bg-blue-200 hover:bg-pink-200 text-slate-700 border-2 border-slate-400"
            >
              Creators
            </Button>
            <Button
              variant="outline"
              className="bg-pink-200 text-slate-700 border-2 border-slate-400"
            >
              Mentores
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/rankings")}
              className="bg-blue-200 hover:bg-pink-200 text-slate-700 border-2 border-slate-400"
            >
              Rankings
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/seguidores")}
              className="bg-blue-200 hover:bg-pink-200 text-slate-700 border-2 border-slate-400"
            >
              Seguidores
            </Button>
          </div>

          {/* Barra de busca */}
          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar mentores por nome ou especialidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2 border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Grid de mentores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentores.map((mentor) => (
              <div
                key={mentor.id}
                onClick={() => navigate("/perfil-mentor")}
                className="bg-white rounded-xl border-2 border-slate-300 p-6 cursor-pointer hover:border-pink-300 hover:shadow-lg transition-all duration-200"
              >
                {/* Avatar e Info */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-300"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg mb-1">{mentor.name}</h3>
                    <p className="text-slate-600 text-sm mb-2">{mentor.specialty}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-slate-700">{mentor.rating}</span>
                      <span className="text-slate-500 text-sm">({mentor.reviews} avaliações)</span>
                    </div>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Briefcase className="w-4 h-4" />
                    <span>{mentor.experience} de experiência</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{mentor.availability}</span>
                  </div>
                </div>

                {/* Preço e botão */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
                  <div>
                    <p className="text-slate-500 text-xs">A partir de</p>
                    <p className="font-bold text-slate-800 text-lg">{mentor.price}/hora</p>
                  </div>
                  <Button className="bg-blue-200 hover:bg-pink-200 text-slate-700 border-2 border-slate-400">
                    Ver Perfil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mentores;
