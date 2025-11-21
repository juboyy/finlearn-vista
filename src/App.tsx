import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Conteudo from "./pages/Conteudo";
import Artigo from "./pages/Artigo";
import ArtigoCompliance from "./pages/ArtigoCompliance";
import Agentes from "./pages/Agentes";
import MeusAgentes from "./pages/MeusAgentes";
import CriarAgente from "./pages/CriarAgente";
import { CriarAgentePersonalidade } from "./pages/CriarAgentePersonalidade";
import { CriarAgenteResumo } from "./pages/CriarAgenteResumo";
import { ConteudoFiltros } from "./pages/ConteudoFiltros";
import { Biblioteca } from "./pages/Biblioteca";
import Marketplace from "./pages/Marketplace";
import Aprendizado from "./pages/Aprendizado";
import Comunidade from "./pages/Comunidade";
import Rankings from "./pages/Rankings";
import Discussao from "./pages/Discussao";
import ArtigoCreditoRural from "./pages/ArtigoCreditoRural";
import Autores from "./pages/Autores";
import Estatisticas from "./pages/Estatisticas";
import PerfilAutor from "./pages/PerfilAutor";
import Seguidores from "./pages/Seguidores";
import DescobrirNovos from "./pages/DescobrirNovos";
import Checkout from "./pages/Checkout";
import CheckoutPayment from "./pages/CheckoutPayment";
import Podcasts from "./pages/Podcasts";
import Webinars from "./pages/Webinars";
import EbookDetalhes from "./pages/EbookDetalhes";
import MinhaConta from "./pages/MinhaConta";
import Assinaturas from "./pages/Assinaturas";
import Configuracoes from "./pages/Configuracoes";
import Notificacoes from "./pages/Notificacoes";
import NovaNotificacao from "./pages/NovaNotificacao";
import MinhasMetas from "./pages/MinhasMetas";
import MinhasMetasAreas from "./pages/MinhasMetasAreas";
import MinhasMetasNotificacoes from "./pages/MinhasMetasNotificacoes";
import MinhasMetasResumo from "./pages/MinhasMetasResumo";

import NotFound from "./pages/NotFound";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/conteudo" element={<Conteudo />} />
            <Route path="/artigo/:id" element={<Artigo />} />
            <Route path="/artigo/compliance" element={<ArtigoCompliance />} />
            <Route path="/agentes" element={<Agentes />} />
            <Route path="/meus-agentes" element={<MeusAgentes />} />
            <Route path="/criar-agente" element={<CriarAgente />} />
          <Route path="/criar-agente/personalidade" element={<CriarAgentePersonalidade />} />
          <Route path="/criar-agente/resumo" element={<CriarAgenteResumo />} />
          <Route path="/conteudo/filtros" element={<ConteudoFiltros />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/aprendizado" element={<Aprendizado />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/discussao/:id" element={<Discussao />} />
          <Route path="/artigo/credito-rural" element={<ArtigoCreditoRural />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/perfil-autor/:id" element={<PerfilAutor />} />
          <Route path="/seguidores" element={<Seguidores />} />
          <Route path="/descobrir-novos" element={<DescobrirNovos />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/payment" element={<CheckoutPayment />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/ebook/:id" element={<EbookDetalhes />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="/assinaturas" element={<Assinaturas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/nova-notificacao" element={<NovaNotificacao />} />
          <Route path="/minhas-metas" element={<MinhasMetas />} />
          <Route path="/minhas-metas/areas" element={<MinhasMetasAreas />} />
          <Route path="/minhas-metas/notificacoes" element={<MinhasMetasNotificacoes />} />
          <Route path="/minhas-metas/resumo" element={<MinhasMetasResumo />} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
