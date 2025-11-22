import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useNavigate } from "react-router-dom";

const AgentesAnalyticsTest = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/analytics')}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-slate-800">Analytics de Agentes IA - TESTE</h1>
                  <p className="text-sm text-slate-500 mt-1">Página de teste - navegação funcionando!</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Página de Teste Carregada com Sucesso!</h2>
            <p className="text-slate-600">Se você está vendo esta mensagem, a navegação está funcionando corretamente.</p>
            <p className="text-slate-600 mt-2">Agora vamos carregar o conteúdo completo...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentesAnalyticsTest;
