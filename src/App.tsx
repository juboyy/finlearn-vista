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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
