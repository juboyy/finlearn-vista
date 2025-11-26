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
import Mentores from "./pages/Mentores";
import PerfilMentor from "./pages/PerfilMentor";
import Estatisticas from "./pages/Estatisticas";
import PerfilAutor from "./pages/PerfilAutor";
import Seguidores from "./pages/Seguidores";
import DescobrirNovos from "./pages/DescobrirNovos";
import Empresas from "./pages/Empresas";
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
import NewsletterDetalhes from "./pages/NewsletterDetalhes";
import MinhaAssinatura from "./pages/MinhaAssinatura";
import CriarNewsletter from "./pages/CriarNewsletter";
import NovaNewsletter from "./pages/NovaNewsletter";
import AgendarPublicacao from "./pages/AgendarPublicacao";
import AgendarPublicacaoRevisao from "./pages/AgendarPublicacaoRevisao";
import RecursosAdicionais from "./pages/RecursosAdicionais";
import Analytics from "./pages/Analytics";
import PerfilAnalytics from "./pages/PerfilAnalytics";
import UserPreferencesAnalytics from "./pages/UserPreferencesAnalytics";
import ConsumoAnalytics from "./pages/ConsumoAnalytics";
import PerformanceSEO from "./pages/PerformanceSEO";
import AgentesAnalytics from "./pages/AgentesAnalytics";
import ComprarCreditos from "./pages/ComprarCreditos";
import MinhasAssinaturas from "./pages/MinhasAssinaturas";
import Financeiro from "./pages/Financeiro";
import MetricasMRR from "./pages/MetricasMRR";
import Churn from "./pages/Churn";
import Retention from "./pages/Retention";
import Others from "./pages/Others";
import NovaAssinatura from "./pages/NovaAssinatura";
import NewsletterRevisao from "./pages/NewsletterRevisao";
import NewsletterPreview from "./pages/NewsletterPreview";
import CriarInfografico from "./pages/CriarInfografico";
import InfograficoRevisao from "./pages/InfograficoRevisao";
import EditarInfografico from "./pages/EditarInfografico";
import NovoArtigo from "./pages/NovoArtigo";
import CursoDetalhes from "./pages/CursoDetalhes";
import MeusCertificados from "./pages/MeusCertificados";
import ContaEmpresarial from "./pages/ContaEmpresarial";
import PerfilEmpresa from "./pages/PerfilEmpresa";
import PerfilEmpresaMateriais from "./pages/PerfilEmpresaMateriais";
import PerfilEmpresaEstatisticas from "./pages/PerfilEmpresaEstatisticas";
import PerfilEmpresaArtigos from "./pages/PerfilEmpresaArtigos";
import PodcastDetalhes from "./pages/PodcastDetalhes";
import Infograficos from "./pages/Infograficos";
import EditorSlides from "./pages/EditorSlides";
import Ferramentas from "./pages/Ferramentas";
import ResumoContratos from "./pages/ResumoContratos";
import HistoricoResumos from "./pages/HistoricoResumos";
import TransformarTabelas from "./pages/TransformarTabelas";
import NovoEbook from "./pages/NovoEbook";
import NovoEbookEtapa2 from "./pages/NovoEbookEtapa2";
import NovoEbookEtapa3 from "./pages/NovoEbookEtapa3";

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
          <Route path="/curso-detalhes" element={<CursoDetalhes />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/discussao/:id" element={<Discussao />} />
          <Route path="/artigo/credito-rural" element={<ArtigoCreditoRural />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/mentores" element={<Mentores />} />
          <Route path="/perfil-mentor" element={<PerfilMentor />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/perfil-autor/:id" element={<PerfilAutor />} />
          <Route path="/seguidores" element={<Seguidores />} />
          <Route path="/descobrir-novos" element={<DescobrirNovos />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/perfil-empresa/:id" element={<PerfilEmpresa />} />
          <Route path="/perfil-empresa/:id/materiais" element={<PerfilEmpresaMateriais />} />
          <Route path="/perfil-empresa/:id/estatisticas" element={<PerfilEmpresaEstatisticas />} />
          <Route path="/perfil-empresa/:id/artigos" element={<PerfilEmpresaArtigos />} />
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
          <Route path="/newsletter/:id" element={<NewsletterDetalhes />} />
          <Route path="/minha-assinatura" element={<MinhaAssinatura />} />
            <Route path="/newsletter-analytics" element={<NewsletterAnalytics />} />
            <Route path="/newsletter-settings" element={<NewsletterSettings />} />
            <Route path="/criar-newsletter" element={<CriarNewsletter />} />
            <Route path="/nova-newsletter" element={<NovaNewsletter />} />
            <Route path="/agendar-publicacao" element={<AgendarPublicacao />} />
            <Route path="/agendar-publicacao-revisao" element={<AgendarPublicacaoRevisao />} />
            <Route path="/recursos-adicionais" element={<RecursosAdicionais />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/perfil-analytics" element={<PerfilAnalytics />} />
            <Route path="/user-preferences-analytics" element={<UserPreferencesAnalytics />} />
            <Route path="/consumo-analytics" element={<ConsumoAnalytics />} />
          <Route path="/performance-seo" element={<PerformanceSEO />} />
          <Route path="/agentes-analytics" element={<AgentesAnalytics />} />
          <Route path="/comprar-creditos" element={<ComprarCreditos />} />
          <Route path="/minhas-assinaturas" element={<MinhasAssinaturas />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/metricas-mrr" element={<MetricasMRR />} />
          <Route path="/churn" element={<Churn />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/others" element={<Others />} />
          <Route path="/nova-assinatura" element={<NovaAssinatura />} />
          <Route path="/newsletter-revisao" element={<NewsletterRevisao />} />
          <Route path="/newsletter-preview" element={<NewsletterPreview />} />
          <Route path="/criar-infografico" element={<CriarInfografico />} />
          <Route path="/infografico-revisao" element={<InfograficoRevisao />} />
          <Route path="/editar-infografico" element={<EditarInfografico />} />
          <Route path="/novo-artigo" element={<NovoArtigo />} />
          <Route path="/meus-certificados" element={<MeusCertificados />} />
          <Route path="/conta-empresarial" element={<ContaEmpresarial />} />
          <Route path="/podcast/:id" element={<PodcastDetalhes />} />
          <Route path="/infograficos" element={<Infograficos />} />
          <Route path="/editor-slides" element={<EditorSlides />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/resumo-contratos" element={<ResumoContratos />} />
          <Route path="/historico-resumos" element={<HistoricoResumos />} />
          <Route path="/transformar-tabelas" element={<TransformarTabelas />} />
          <Route path="/novo-ebook" element={<NovoEbook />} />
          <Route path="/novo-ebook/etapa-2" element={<NovoEbookEtapa2 />} />
          <Route path="/novo-ebook/etapa-3" element={<NovoEbookEtapa3 />} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
