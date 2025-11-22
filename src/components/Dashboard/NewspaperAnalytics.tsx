export const NewspaperAnalytics = () => {
  console.log('NewspaperAnalytics component rendered');
  
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Analytics de Newspaper</h1>
            <p className="text-sm text-slate-500 mt-1">Análise completa do seu consumo de notícias e artigos do mercado financeiro</p>
          </div>
        </div>
      </header>

      <div className="p-8">
        <section className="grid grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-newspaper text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+8</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">47</h3>
            <p className="text-sm text-slate-500">Artigos Hoje</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">32</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-week text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+42</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">284</h3>
            <p className="text-sm text-slate-500">Artigos Semana</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">198</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-alt text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">+156</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">1,247</h3>
            <p className="text-sm text-slate-500">Artigos Mês</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">892</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                <i className="fas fa-clock text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+1.2h</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">8.4h</h3>
            <p className="text-sm text-slate-500">Tempo Semana</p>
            <p className="text-xs text-slate-600 mt-2">Média: <span className="font-semibold">1.2h/dia</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                <i className="fas fa-hourglass-half text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+4.8h</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">32.6h</h3>
            <p className="text-sm text-slate-500">Tempo Mês</p>
            <p className="text-xs text-slate-600 mt-2">Média: <span className="font-semibold">1.1h/dia</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                <i className="fas fa-check-circle text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+6%</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">71%</h3>
            <p className="text-sm text-slate-500">Taxa Conclusão</p>
            <p className="text-xs text-slate-600 mt-2">Média mensal</p>
          </div>
        </section>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Tela de Analytics</h2>
          <p className="text-slate-600">
            A tela completa de analytics com gráficos será implementada em breve.
            Por enquanto, você pode ver os principais KPIs acima.
          </p>
        </div>
      </div>
    </div>
  );
};
