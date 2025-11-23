// Main App Component
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
import MinhasMetasConfiguracao from "./pages/MinhasMetasConfiguracao";
import MinhasMetasAreas from "./pages/MinhasMetasAreas";
import MinhasMetasNotificacoes from "./pages/MinhasMetasNotificacoes";
import MinhaAgenda from "./pages/MinhaAgenda";
import MinhaAgendaDia from "./pages/MinhaAgendaDia";
import EstudosAcademicos from "./pages/EstudosAcademicos";
import CriarPaper from "./pages/CriarPaper";
import Analises from "./pages/Analises"; // Market analysis page
import MeusConteudos from "./pages/MeusConteudos";
import CriarConteudo from "./pages/CriarConteudo";
import NovoDocumento from "./pages/NovoDocumento";
import EvolucaoCartaoCredito from "./pages/EvolucaoCartaoCredito";
import LerDepois from "./pages/LerDepois";
import Newsletter from "./pages/Newsletter";
import NewsletterAnalytics from "./pages/NewsletterAnalytics";
import NewsletterSettings from "./pages/NewsletterSettings";
import CriarNewsletter from "./pages/CriarNewsletter";
import AgendarPublicacao from "./pages/AgendarPublicacao";
import RecursosAdicionais from "./pages/RecursosAdicionais";
import Analytics from "./pages/Analytics";
import PerfilAnalytics from "./pages/PerfilAnalytics";
import ConsumoAnalytics from "./pages/ConsumoAnalytics";
import PerformanceSEO from "./pages/PerformanceSEO";
import AgentesAnalytics from "./pages/AgentesAnalytics";
import ComprarCreditos from "./pages/ComprarCreditos";
import MinhasAssinaturas from "./pages/MinhasAssinaturas";
import Financeiro from "./pages/Financeiro";
import MetricasMRR from "./pages/MetricasMRR";

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
          <Route path="/minhas-metas/configuracao" element={<MinhasMetasConfiguracao />} />
          <Route path="/minhas-metas/areas" element={<MinhasMetasAreas />} />
          <Route path="/minhas-metas/notificacoes" element={<MinhasMetasNotificacoes />} />
          <Route path="/minha-agenda" element={<MinhaAgenda />} />
          <Route path="/minha-agenda/dia" element={<MinhaAgendaDia />} />
          <Route path="/estudos-academicos" element={<EstudosAcademicos />} />
          <Route path="/criar-paper" element={<CriarPaper />} />
           <Route path="/analises" element={<Analises />} />
            <Route path="/meus-conteudos" element={<MeusConteudos />} />
            <Route path="/criar-conteudo" element={<CriarConteudo />} />
            <Route path="/novo-documento" element={<NovoDocumento />} />
            <Route path="/evolucao-cartao-credito" element={<EvolucaoCartaoCredito />} />
            <Route path="/ler-depois" element={<LerDepois />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/newsletter-analytics" element={<NewsletterAnalytics />} />
            <Route path="/newsletter-settings" element={<NewsletterSettings />} />
            <Route path="/criar-newsletter" element={<CriarNewsletter />} />
            <Route path="/agendar-publicacao" element={<AgendarPublicacao />} />
            <Route path="/recursos-adicionais" element={<RecursosAdicionais />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/perfil-analytics" element={<PerfilAnalytics />} />
            <Route path="/consumo-analytics" element={<ConsumoAnalytics />} />
          <Route path="/performance-seo" element={<PerformanceSEO />} />
          <Route path="/agentes-analytics" element={<AgentesAnalytics />} />
          <Route path="/comprar-creditos" element={<ComprarCreditos />} />
          <Route path="/minhas-assinaturas" element={<MinhasAssinaturas />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/metricas-mrr" element={<MetricasMRR />} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
