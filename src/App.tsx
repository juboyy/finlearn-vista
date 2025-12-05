// Main App Component
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
import MinhaAgendaDia from "./pages/MinhaAgendaDia";
import AtividadesRealizadas from "./pages/AtividadesRealizadas";
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
import ConfigurarPaginaEmpresa from "./pages/ConfigurarPaginaEmpresa";
import GerenciarConteudosEmpresa from "./pages/GerenciarConteudosEmpresa";
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
import NovoPodcast from "./pages/NovoPodcast";
import CriarCurso from "./pages/CriarCurso";
import CriarCursoEtapa2 from "./pages/CriarCursoEtapa2";
import CriarCursoEtapa3 from "./pages/CriarCursoEtapa3";
import ResumoCursoCriado from "./pages/ResumoCursoCriado";
import NovoEbookEtapa3 from "./pages/NovoEbookEtapa3";
import ResumoEbook from "./pages/ResumoEbook";
import HistoricoPodcasts from "./pages/HistoricoPodcasts";
import LerEbook from "./pages/LerEbook";
import EditorMarkdown from "./pages/EditorMarkdown";
import ArtigoAnalytics from "./pages/ArtigoAnalytics";
import ConteudoAnalytics from "./pages/ConteudoAnalytics";
import ApresentacoesAnalytics from "./pages/ApresentacoesAnalytics";
import LiveAnalytics from "./pages/LiveAnalytics";
import EstudosAcademicosAnalytics from "./pages/EstudosAcademicosAnalytics";
import InfograficoAnalytics from "./pages/InfograficoAnalytics";
import EntrevistasAnalytics from "./pages/EntrevistasAnalytics";
import PlanilhasAnalytics from "./pages/PlanilhasAnalytics";
import WhitepaperAnalytics from "./pages/WhitepaperAnalytics";
import PodcastAnalytics from "./pages/PodcastAnalytics";
import CursosAnalytics from "./pages/CursosAnalytics";
import AvatarIAAnalytics from "./pages/AvatarIAAnalytics";
import EbooksAnalytics from "./pages/EbooksAnalytics";
import WebinarsAnalytics from "./pages/WebinarsAnalytics";
import ArtigosAnalytics from "./pages/ArtigosAnalytics";
import AnalisesAnalytics from "./pages/AnalisesAnalytics";
import RelatoriosAnalytics from "./pages/RelatoriosAnalytics";
import NewspaperAnalytics from "./pages/NewspaperAnalytics";
import Live from "./pages/Live";
import Entrevistas from "./pages/Entrevistas";
import WebinarDetalhes from "./pages/WebinarDetalhes";
import EventosPresenciais from "./pages/EventosPresenciais";
import MeusIngressos from "./pages/MeusIngressos";
import CheckoutIngresso from "./pages/CheckoutIngresso";
import HistoricoIngressos from "./pages/HistoricoIngressos";
import ProgramacaoEvento from "./pages/ProgramacaoEvento";
import ParticipantesConfirmados from "./pages/ParticipantesConfirmados";
import TodasComunidades from "./pages/TodasComunidades";
import CriarInsights from "./pages/CriarInsights";
import CriarGraficos from "./pages/CriarGraficos";
import ContaMentoria from "./pages/ContaMentoria";
import PerfilSocial from "./pages/PerfilSocial";
import HistoricoConversas from "./pages/HistoricoConversas";

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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/conteudo" element={<ProtectedRoute><Conteudo /></ProtectedRoute>} />
              <Route path="/artigo/:id" element={<ProtectedRoute><Artigo /></ProtectedRoute>} />
              <Route path="/artigo/compliance" element={<ProtectedRoute><ArtigoCompliance /></ProtectedRoute>} />
              <Route path="/agentes" element={<ProtectedRoute><Agentes /></ProtectedRoute>} />
              <Route path="/meus-agentes" element={<ProtectedRoute><MeusAgentes /></ProtectedRoute>} />
              <Route path="/historico-conversas" element={<ProtectedRoute><HistoricoConversas /></ProtectedRoute>} />
              <Route path="/criar-agente" element={<ProtectedRoute><CriarAgente /></ProtectedRoute>} />
              <Route path="/criar-agente/personalidade" element={<ProtectedRoute><CriarAgentePersonalidade /></ProtectedRoute>} />
              <Route path="/criar-agente/resumo" element={<ProtectedRoute><CriarAgenteResumo /></ProtectedRoute>} />
              <Route path="/conteudo/filtros" element={<ProtectedRoute><ConteudoFiltros /></ProtectedRoute>} />
              <Route path="/biblioteca" element={<ProtectedRoute><Biblioteca /></ProtectedRoute>} />
              <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
              <Route path="/aprendizado" element={<ProtectedRoute><Aprendizado /></ProtectedRoute>} />
              <Route path="/curso-detalhes" element={<ProtectedRoute><CursoDetalhes /></ProtectedRoute>} />
              <Route path="/comunidade" element={<ProtectedRoute><Comunidade /></ProtectedRoute>} />
              <Route path="/todas-comunidades" element={<ProtectedRoute><TodasComunidades /></ProtectedRoute>} />
              <Route path="/rankings" element={<ProtectedRoute><Rankings /></ProtectedRoute>} />
              <Route path="/discussao/:id" element={<ProtectedRoute><Discussao /></ProtectedRoute>} />
              <Route path="/discussao" element={<ProtectedRoute><Discussao /></ProtectedRoute>} />
              <Route path="/artigo/credito-rural" element={<ProtectedRoute><ArtigoCreditoRural /></ProtectedRoute>} />
              <Route path="/autores" element={<ProtectedRoute><Autores /></ProtectedRoute>} />
              <Route path="/mentores" element={<ProtectedRoute><Mentores /></ProtectedRoute>} />
              <Route path="/perfil-mentor" element={<ProtectedRoute><PerfilMentor /></ProtectedRoute>} />
              <Route path="/estatisticas" element={<ProtectedRoute><Estatisticas /></ProtectedRoute>} />
              <Route path="/perfil-autor/:id" element={<ProtectedRoute><PerfilAutor /></ProtectedRoute>} />
              <Route path="/seguidores" element={<ProtectedRoute><Seguidores /></ProtectedRoute>} />
              <Route path="/descobrir-novos" element={<ProtectedRoute><DescobrirNovos /></ProtectedRoute>} />
              <Route path="/empresas" element={<ProtectedRoute><Empresas /></ProtectedRoute>} />
              <Route path="/perfil-empresa/:id" element={<ProtectedRoute><PerfilEmpresa /></ProtectedRoute>} />
              <Route path="/perfil-empresa/:id/materiais" element={<ProtectedRoute><PerfilEmpresaMateriais /></ProtectedRoute>} />
              <Route path="/perfil-empresa/:id/estatisticas" element={<ProtectedRoute><PerfilEmpresaEstatisticas /></ProtectedRoute>} />
              <Route path="/perfil-empresa/:id/artigos" element={<ProtectedRoute><PerfilEmpresaArtigos /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/checkout/payment" element={<ProtectedRoute><CheckoutPayment /></ProtectedRoute>} />
              <Route path="/podcasts" element={<ProtectedRoute><Podcasts /></ProtectedRoute>} />
              <Route path="/webinars" element={<ProtectedRoute><Webinars /></ProtectedRoute>} />
              <Route path="/ebook/:id" element={<ProtectedRoute><EbookDetalhes /></ProtectedRoute>} />
              <Route path="/ler-ebook/:id" element={<ProtectedRoute><LerEbook /></ProtectedRoute>} />
              <Route path="/minha-conta" element={<ProtectedRoute><MinhaConta /></ProtectedRoute>} />
              <Route path="/perfil-social" element={<ProtectedRoute><PerfilSocial /></ProtectedRoute>} />
              <Route path="/assinaturas" element={<ProtectedRoute><Assinaturas /></ProtectedRoute>} />
              <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
              <Route path="/notificacoes" element={<ProtectedRoute><Notificacoes /></ProtectedRoute>} />
              <Route path="/nova-notificacao" element={<ProtectedRoute><NovaNotificacao /></ProtectedRoute>} />
              <Route path="/minhas-metas" element={<ProtectedRoute><MinhasMetas /></ProtectedRoute>} />
              <Route path="/minhas-metas/configuracao" element={<ProtectedRoute><MinhasMetasConfiguracao /></ProtectedRoute>} />
              <Route path="/minhas-metas/areas" element={<ProtectedRoute><MinhasMetasAreas /></ProtectedRoute>} />
              <Route path="/minhas-metas/notificacoes" element={<ProtectedRoute><MinhasMetasNotificacoes /></ProtectedRoute>} />
              <Route path="/minha-agenda/dia" element={<ProtectedRoute><MinhaAgendaDia /></ProtectedRoute>} />
              <Route path="/minha-agenda/atividades-realizadas" element={<ProtectedRoute><AtividadesRealizadas /></ProtectedRoute>} />
              <Route path="/estudos-academicos" element={<ProtectedRoute><EstudosAcademicos /></ProtectedRoute>} />
              <Route path="/criar-paper" element={<ProtectedRoute><CriarPaper /></ProtectedRoute>} />
              <Route path="/analises" element={<ProtectedRoute><Analises /></ProtectedRoute>} />
              <Route path="/meus-conteudos" element={<ProtectedRoute><MeusConteudos /></ProtectedRoute>} />
              <Route path="/criar-conteudo" element={<ProtectedRoute><CriarConteudo /></ProtectedRoute>} />
              <Route path="/criar-graficos" element={<ProtectedRoute><CriarGraficos /></ProtectedRoute>} />
              <Route path="/novo-documento" element={<ProtectedRoute><NovoDocumento /></ProtectedRoute>} />
              <Route path="/evolucao-cartao-credito" element={<ProtectedRoute><EvolucaoCartaoCredito /></ProtectedRoute>} />
              <Route path="/ler-depois" element={<ProtectedRoute><LerDepois /></ProtectedRoute>} />
              <Route path="/newsletter" element={<ProtectedRoute><Newsletter /></ProtectedRoute>} />
              <Route path="/newsletter/:id" element={<ProtectedRoute><NewsletterDetalhes /></ProtectedRoute>} />
              <Route path="/minha-assinatura" element={<ProtectedRoute><MinhaAssinatura /></ProtectedRoute>} />
              <Route path="/newsletter-analytics" element={<ProtectedRoute><NewsletterAnalytics /></ProtectedRoute>} />
              <Route path="/newsletter-settings" element={<ProtectedRoute><NewsletterSettings /></ProtectedRoute>} />
              <Route path="/criar-newsletter" element={<ProtectedRoute><CriarNewsletter /></ProtectedRoute>} />
              <Route path="/nova-newsletter" element={<ProtectedRoute><NovaNewsletter /></ProtectedRoute>} />
              <Route path="/agendar-publicacao" element={<ProtectedRoute><AgendarPublicacao /></ProtectedRoute>} />
              <Route path="/agendar-publicacao-revisao" element={<ProtectedRoute><AgendarPublicacaoRevisao /></ProtectedRoute>} />
              <Route path="/recursos-adicionais" element={<ProtectedRoute><RecursosAdicionais /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/perfil-analytics" element={<ProtectedRoute><PerfilAnalytics /></ProtectedRoute>} />
              <Route path="/user-preferences-analytics" element={<ProtectedRoute><UserPreferencesAnalytics /></ProtectedRoute>} />
              <Route path="/consumo-analytics" element={<ProtectedRoute><ConsumoAnalytics /></ProtectedRoute>} />
              <Route path="/performance-seo" element={<ProtectedRoute><PerformanceSEO /></ProtectedRoute>} />
              <Route path="/agentes-analytics" element={<ProtectedRoute><AgentesAnalytics /></ProtectedRoute>} />
              <Route path="/comprar-creditos" element={<ProtectedRoute><ComprarCreditos /></ProtectedRoute>} />
              <Route path="/minhas-assinaturas" element={<ProtectedRoute><MinhasAssinaturas /></ProtectedRoute>} />
              <Route path="/financeiro" element={<ProtectedRoute><Financeiro /></ProtectedRoute>} />
              <Route path="/metricas-mrr" element={<ProtectedRoute><MetricasMRR /></ProtectedRoute>} />
              <Route path="/churn" element={<ProtectedRoute><Churn /></ProtectedRoute>} />
              <Route path="/retention" element={<ProtectedRoute><Retention /></ProtectedRoute>} />
              <Route path="/others" element={<ProtectedRoute><Others /></ProtectedRoute>} />
              <Route path="/nova-assinatura" element={<ProtectedRoute><NovaAssinatura /></ProtectedRoute>} />
              <Route path="/newsletter-revisao" element={<ProtectedRoute><NewsletterRevisao /></ProtectedRoute>} />
              <Route path="/newsletter-preview" element={<ProtectedRoute><NewsletterPreview /></ProtectedRoute>} />
              <Route path="/criar-infografico" element={<ProtectedRoute><CriarInfografico /></ProtectedRoute>} />
              <Route path="/infografico-revisao" element={<ProtectedRoute><InfograficoRevisao /></ProtectedRoute>} />
              <Route path="/editar-infografico" element={<ProtectedRoute><EditarInfografico /></ProtectedRoute>} />
              <Route path="/novo-artigo" element={<ProtectedRoute><NovoArtigo /></ProtectedRoute>} />
              <Route path="/meus-certificados" element={<ProtectedRoute><MeusCertificados /></ProtectedRoute>} />
              <Route path="/conta-empresarial" element={<ProtectedRoute><ContaEmpresarial /></ProtectedRoute>} />
              <Route path="/configurar-pagina-empresa" element={<ProtectedRoute><ConfigurarPaginaEmpresa /></ProtectedRoute>} />
              <Route path="/gerenciar-conteudos-empresa" element={<ProtectedRoute><GerenciarConteudosEmpresa /></ProtectedRoute>} />
              <Route path="/podcast/:id" element={<ProtectedRoute><PodcastDetalhes /></ProtectedRoute>} />
              <Route path="/infograficos" element={<ProtectedRoute><Infograficos /></ProtectedRoute>} />
              <Route path="/editor-slides" element={<ProtectedRoute><EditorSlides /></ProtectedRoute>} />
              <Route path="/ferramentas" element={<ProtectedRoute><Ferramentas /></ProtectedRoute>} />
              <Route path="/resumo-contratos" element={<ProtectedRoute><ResumoContratos /></ProtectedRoute>} />
              <Route path="/historico-resumos" element={<ProtectedRoute><HistoricoResumos /></ProtectedRoute>} />
              <Route path="/transformar-tabelas" element={<ProtectedRoute><TransformarTabelas /></ProtectedRoute>} />
              <Route path="/novo-ebook" element={<ProtectedRoute><NovoEbook /></ProtectedRoute>} />
              <Route path="/novo-ebook/etapa-2" element={<ProtectedRoute><NovoEbookEtapa2 /></ProtectedRoute>} />
              <Route path="/novo-ebook/etapa-3" element={<ProtectedRoute><NovoEbookEtapa3 /></ProtectedRoute>} />
              <Route path="/criar-curso" element={<ProtectedRoute><CriarCurso /></ProtectedRoute>} />
              <Route path="/criar-curso/etapa-2" element={<ProtectedRoute><CriarCursoEtapa2 /></ProtectedRoute>} />
              <Route path="/criar-curso/etapa-3" element={<ProtectedRoute><CriarCursoEtapa3 /></ProtectedRoute>} />
              <Route path="/criar-curso/resumo" element={<ProtectedRoute><ResumoCursoCriado /></ProtectedRoute>} />
              <Route path="/resumo-ebook" element={<ProtectedRoute><ResumoEbook /></ProtectedRoute>} />
              <Route path="/historico-podcasts" element={<ProtectedRoute><HistoricoPodcasts /></ProtectedRoute>} />
              <Route path="/editor-markdown" element={<ProtectedRoute><EditorMarkdown /></ProtectedRoute>} />
              <Route path="/artigo-analytics" element={<ProtectedRoute><ArtigoAnalytics /></ProtectedRoute>} />
              <Route path="/conteudo-analytics" element={<ProtectedRoute><ConteudoAnalytics /></ProtectedRoute>} />
              <Route path="/apresentacoes-analytics" element={<ProtectedRoute><ApresentacoesAnalytics /></ProtectedRoute>} />
              <Route path="/live-analytics" element={<ProtectedRoute><LiveAnalytics /></ProtectedRoute>} />
              <Route path="/estudos-academicos-analytics" element={<ProtectedRoute><EstudosAcademicosAnalytics /></ProtectedRoute>} />
              <Route path="/infografico-analytics" element={<ProtectedRoute><InfograficoAnalytics /></ProtectedRoute>} />
              <Route path="/entrevistas-analytics" element={<ProtectedRoute><EntrevistasAnalytics /></ProtectedRoute>} />
              <Route path="/planilhas-analytics" element={<ProtectedRoute><PlanilhasAnalytics /></ProtectedRoute>} />
              <Route path="/whitepaper-analytics" element={<ProtectedRoute><WhitepaperAnalytics /></ProtectedRoute>} />
              <Route path="/podcast-analytics" element={<ProtectedRoute><PodcastAnalytics /></ProtectedRoute>} />
              <Route path="/cursos-analytics" element={<ProtectedRoute><CursosAnalytics /></ProtectedRoute>} />
              <Route path="/avatar-ia-analytics" element={<ProtectedRoute><AvatarIAAnalytics /></ProtectedRoute>} />
              <Route path="/ebooks-analytics" element={<ProtectedRoute><EbooksAnalytics /></ProtectedRoute>} />
              <Route path="/webinars-analytics" element={<ProtectedRoute><WebinarsAnalytics /></ProtectedRoute>} />
              <Route path="/artigos-analytics" element={<ProtectedRoute><ArtigosAnalytics /></ProtectedRoute>} />
              <Route path="/analises-analytics" element={<ProtectedRoute><AnalisesAnalytics /></ProtectedRoute>} />
              <Route path="/relatorios-analytics" element={<ProtectedRoute><RelatoriosAnalytics /></ProtectedRoute>} />
              <Route path="/newspaper-analytics" element={<ProtectedRoute><NewspaperAnalytics /></ProtectedRoute>} />
              <Route path="/live" element={<ProtectedRoute><Live /></ProtectedRoute>} />
              <Route path="/entrevistas" element={<ProtectedRoute><Entrevistas /></ProtectedRoute>} />
              <Route path="/webinar-detalhes" element={<ProtectedRoute><WebinarDetalhes /></ProtectedRoute>} />
              <Route path="/eventos-presenciais" element={<ProtectedRoute><EventosPresenciais /></ProtectedRoute>} />
              <Route path="/meus-ingressos" element={<ProtectedRoute><MeusIngressos /></ProtectedRoute>} />
              <Route path="/checkout-ingresso" element={<ProtectedRoute><CheckoutIngresso /></ProtectedRoute>} />
              <Route path="/historico-ingressos" element={<ProtectedRoute><HistoricoIngressos /></ProtectedRoute>} />
              <Route path="/programacao-evento" element={<ProtectedRoute><ProgramacaoEvento /></ProtectedRoute>} />
              <Route path="/participantes-confirmados" element={<ProtectedRoute><ParticipantesConfirmados /></ProtectedRoute>} />
              <Route path="/criar-insights" element={<ProtectedRoute><CriarInsights /></ProtectedRoute>} />
              <Route path="/conta-mentoria" element={<ProtectedRoute><ContaMentoria /></ProtectedRoute>} />
              <Route path="/novo-podcast" element={<ProtectedRoute><NovoPodcast /></ProtectedRoute>} />
             
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
