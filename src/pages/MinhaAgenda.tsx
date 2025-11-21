import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, GraduationCap, Video, Book, CalendarCheck, Clock, CheckCircle, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import Plotly from 'plotly.js-dist';

const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const events: Record<string, Array<{ title: string; time: string; category: string; color: string }>> = {
  '2024-11-01': [{ title: 'Reunião Semanal de Equipe', time: '09:00', category: 'meeting', color: '#7FA8C9' }],
  '2024-11-03': [{ title: 'Webinar: Regulação Financeira', time: '15:00', category: 'webinar', color: '#8CC99B' }],
  '2024-11-04': [
    { title: 'Estudo: Análise de Crédito', time: '10:30', category: 'study', color: '#C9B88C' },
    { title: 'Treinamento: Compliance', time: '14:00', category: 'training', color: '#A68CC9' }
  ],
  '2024-11-06': [{ title: 'Workshop: Gestão de Carteiras', time: '11:00', category: 'event', color: '#C99B8C' }],
  '2024-11-07': [{ title: 'Reunião com Diretoria', time: '16:00', category: 'meeting', color: '#7FA8C9' }],
  '2024-11-08': [{ title: 'Estudo: Mercado de Renda Fixa', time: '09:30', category: 'study', color: '#C9B88C' }],
  '2024-11-10': [{ title: 'Treinamento: KYC e AML', time: '13:00', category: 'training', color: '#A68CC9' }],
  '2024-11-11': [
    { title: 'Webinar: Tendências do Mercado', time: '10:00', category: 'webinar', color: '#8CC99B' },
    { title: 'Reunião de Planejamento', time: '15:30', category: 'meeting', color: '#7FA8C9' }
  ],
  '2024-11-13': [{ title: 'Estudo: Derivativos Financeiros', time: '08:00', category: 'study', color: '#C9B88C' }],
  '2024-11-14': [{ title: 'Evento: Fórum de Investimentos', time: '09:00', category: 'event', color: '#C99B8C' }],
  '2024-11-15': [{ title: 'Treinamento: Análise de Risco', time: '14:30', category: 'training', color: '#A68CC9' }],
  '2024-11-17': [
    { title: 'Reunião de Compliance', time: '14:00', category: 'meeting', color: '#7FA8C9' },
    { title: 'Análise de Portfólio', time: '16:30', category: 'study', color: '#C9B88C' }
  ],
  '2024-11-18': [{ title: 'Treinamento: Gestão de Riscos', time: '10:00', category: 'training', color: '#A68CC9' }],
  '2024-11-19': [{ title: 'Estudo: Fundos de Investimento', time: '11:00', category: 'study', color: '#C9B88C' }],
  '2024-11-20': [{ title: 'Webinar: Mercado de Capitais', time: '16:00', category: 'webinar', color: '#8CC99B' }],
  '2024-11-21': [{ title: 'Reunião: Revisão Trimestral', time: '09:30', category: 'meeting', color: '#7FA8C9' }],
  '2024-11-22': [
    { title: 'Estudo: Regulamentação Bancária', time: '09:00', category: 'study', color: '#C9B88C' },
    { title: 'Reunião com Equipe', time: '15:00', category: 'meeting', color: '#7FA8C9' }
  ],
  '2024-11-24': [{ title: 'Treinamento: Produtos Financeiros', time: '13:30', category: 'training', color: '#A68CC9' }],
  '2024-11-25': [{ title: 'Workshop: Gestão de Riscos', time: '13:00', category: 'event', color: '#C99B8C' }],
  '2024-11-26': [{ title: 'Webinar: Inovação em Pagamentos', time: '10:30', category: 'webinar', color: '#8CC99B' }],
  '2024-11-27': [
    { title: 'Estudo: Análise Técnica', time: '08:30', category: 'study', color: '#C9B88C' },
    { title: 'Reunião de Estratégia', time: '14:00', category: 'meeting', color: '#7FA8C9' }
  ],
  '2024-11-28': [{ title: 'Treinamento: Auditoria Interna', time: '11:00', category: 'training', color: '#A68CC9' }],
  '2024-11-29': [{ title: 'Evento: Congresso Financeiro', time: '09:00', category: 'event', color: '#C99B8C' }]
};

export default function MinhaAgenda() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 21)); // November 21, 2024
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Activity Chart
    const activityData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [8, 12, 6, 10, 14, 4, 2],
      type: 'bar',
      marker: {
        color: ['#7FA8C9', '#A68CC9', '#8CC99B', '#C9B88C', '#C99B8C', '#7FA8C9', '#A68CC9']
      },
      name: 'Atividades'
    }];

    const activityLayout = {
      title: { text: '', font: { size: 0 } },
      xaxis: { title: 'Dia da Semana' },
      yaxis: { title: 'Número de Atividades' },
      margin: { t: 20, r: 20, b: 60, l: 60 },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: false
    };

    const activityConfig = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false
    };

    Plotly.newPlot('activity-chart-container', activityData, activityLayout, activityConfig);

    // Category Pie Chart
    const categoryData = [{
      labels: ['Reuniões', 'Treinamentos', 'Webinars', 'Estudos', 'Eventos'],
      values: [12, 8, 5, 15, 3],
      type: 'pie',
      marker: {
        colors: ['#7FA8C9', '#A68CC9', '#8CC99B', '#C9B88C', '#C99B8C']
      },
      textinfo: 'label+percent',
      textposition: 'inside'
    }];

    const categoryLayout = {
      margin: { t: 20, r: 20, b: 20, l: 20 },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: false
    };

    const categoryConfig = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false
    };

    Plotly.newPlot('category-chart-container', categoryData, categoryLayout, categoryConfig);

    // Weekday Bar Chart
    const weekdayData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [8, 12, 6, 10, 14, 4, 2],
      type: 'bar',
      marker: {
        color: '#B8D4E8'
      }
    }];

    const weekdayLayout = {
      xaxis: { title: '' },
      yaxis: { title: 'Atividades' },
      margin: { t: 20, r: 20, b: 60, l: 60 },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: false
    };

    const weekdayConfig = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false
    };

    Plotly.newPlot('weekday-chart-container', weekdayData, weekdayLayout, weekdayConfig);

    // Progress Line Chart
    const progressData = [{
      x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      y: [8, 18, 32, 43],
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: '#7FA8C9',
        width: 3
      },
      marker: {
        size: 8,
        color: '#7FA8C9'
      },
      name: 'Atividades Acumuladas'
    }, {
      x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      y: [7, 16, 28, 38],
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: '#8CC99B',
        width: 3
      },
      marker: {
        size: 8,
        color: '#8CC99B'
      },
      name: 'Atividades Concluídas'
    }];

    const progressLayout = {
      xaxis: { title: 'Semana do Mês' },
      yaxis: { title: 'Total de Atividades' },
      margin: { t: 40, r: 20, b: 60, l: 60 },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: true,
      legend: {
        x: 0,
        y: 1.1,
        orientation: 'h'
      }
    };

    const progressConfig = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false
    };

    Plotly.newPlot('progress-chart-container', progressData, progressLayout, progressConfig);
  }, []);

  const renderMiniCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const days = [];

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      days.push(
        <div key={`prev-${dayNum}`} className="py-1 text-slate-400 text-xs cursor-pointer hover:bg-slate-100 rounded">
          {dayNum}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = day === 21 && month === 10;
      const hasEvent = events[dateStr];

      days.push(
        <div 
          key={`curr-${day}`} 
          className={`py-1 text-xs cursor-pointer hover:bg-slate-100 rounded relative ${
            isToday ? 'bg-pastel-blue text-slate-800 font-semibold' : 'text-slate-700'
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pastel-purple rounded-full"></div>
          )}
        </div>
      );
    }

    // Next month days
    const remainingCells = 42 - (startingDayOfWeek + totalDays);
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="py-1 text-slate-400 text-xs cursor-pointer hover:bg-slate-100 rounded">
          {i}
        </div>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2024, 10, 21));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Agenda</h1>
              <p className="text-sm text-slate-500 mt-1">Organize suas atividades e compromissos</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar eventos..." 
                  className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
              >
                <i className="fas fa-calendar-days mr-2"></i>
                Ver Calendário
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar esquerda */}
            <aside className="w-80 space-y-6">
              {/* Mini Calendar */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={prevMonth}
                      className="p-1 text-slate-600 hover:bg-slate-100 rounded transition"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={nextMonth}
                      className="p-1 text-slate-600 hover:bg-slate-100 rounded transition"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-600 mb-2">
                  <div className="py-1 font-medium">Dom</div>
                  <div className="py-1 font-medium">Seg</div>
                  <div className="py-1 font-medium">Ter</div>
                  <div className="py-1 font-medium">Qua</div>
                  <div className="py-1 font-medium">Qui</div>
                  <div className="py-1 font-medium">Sex</div>
                  <div className="py-1 font-medium">Sáb</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {renderMiniCalendar()}
                </div>
              </section>

              {/* Categories */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#7FA8C9'}}></div>
                    <span className="text-sm text-slate-700 flex-1">Reuniões</span>
                    <span className="text-xs text-slate-500">12</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#A68CC9'}}></div>
                    <span className="text-sm text-slate-700 flex-1">Treinamentos</span>
                    <span className="text-xs text-slate-500">8</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pastel-green focus:ring-pastel-green" />
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#8CC99B'}}></div>
                    <span className="text-sm text-slate-700 flex-1">Webinars</span>
                    <span className="text-xs text-slate-500">5</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pastel-yellow focus:ring-pastel-yellow" />
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#C9B88C'}}></div>
                    <span className="text-sm text-slate-700 flex-1">Estudos</span>
                    <span className="text-xs text-slate-500">15</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pastel-peach focus:ring-pastel-peach" />
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#C99B8C'}}></div>
                    <span className="text-sm text-slate-700 flex-1">Eventos</span>
                    <span className="text-xs text-slate-500">3</span>
                  </label>
                </div>
              </section>

              {/* Upcoming Events */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Próximos Eventos</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#7FA8C9'}}>
                      <Users size={16} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">Reunião de Compliance</p>
                      <p className="text-xs text-slate-500 mt-1">Hoje, 14:00 - 15:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#A68CC9'}}>
                      <GraduationCap size={16} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">Treinamento: Análise de Risco</p>
                      <p className="text-xs text-slate-500 mt-1">Amanhã, 10:00 - 12:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#8CC99B'}}>
                      <Video size={16} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">Webinar: Mercado de Capitais</p>
                      <p className="text-xs text-slate-500 mt-1">20 Nov, 16:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Stats */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <CalendarCheck size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Este Mês</span>
                    </div>
                    <span className="font-semibold text-slate-800">43</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                        <Clock size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Horas Totais</span>
                    </div>
                    <span className="font-semibold text-slate-800">86h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <CheckCircle size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Concluídos</span>
                    </div>
                    <span className="font-semibold text-slate-800">38</span>
                  </div>
                </div>
              </section>
            </aside>

            {/* Main Calendar Area */}
            <div className="flex-1 space-y-6">
              {/* Calendar Toolbar */}
              <section className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={goToToday}
                      className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition"
                    >
                      Hoje
                    </button>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={prevMonth}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={nextMonth}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium">
                      Mês
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition font-medium">
                      Semana
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition font-medium">
                      Dia
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition font-medium">
                      Agenda
                    </button>
                  </div>
                </div>
              </section>

              {/* Main Calendar with Stats */}
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Estatísticas de Atividades</h3>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">
                        Semana
                      </button>
                      <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition">
                        Mês
                      </button>
                      <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition">
                        Ano
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div id="activity-chart-container" style={{height: '400px'}}></div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                          <CalendarCheck size={24} className="text-slate-700" />
                        </div>
                        <span className="text-3xl font-bold text-slate-800">43</span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-600 mb-1">Total de Atividades</h4>
                      <p className="text-xs text-slate-500">Novembro 2024</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs text-green-600 font-medium">+12%</span>
                        <span className="text-xs text-slate-500">vs. mês anterior</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                          <Clock size={24} className="text-slate-700" />
                        </div>
                        <span className="text-3xl font-bold text-slate-800">86h</span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-600 mb-1">Horas Dedicadas</h4>
                      <p className="text-xs text-slate-500">Tempo total investido</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs text-green-600 font-medium">+8%</span>
                        <span className="text-xs text-slate-500">vs. mês anterior</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                          <Trophy size={24} className="text-slate-700" />
                        </div>
                        <span className="text-3xl font-bold text-slate-800">88%</span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-600 mb-1">Taxa de Conclusão</h4>
                      <p className="text-xs text-slate-500">38 de 43 atividades</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs text-green-600 font-medium">+5%</span>
                        <span className="text-xs text-slate-500">vs. mês anterior</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h4 className="text-base font-semibold text-slate-800 mb-4">Distribuição por Categoria</h4>
                      <div id="category-chart-container" style={{height: '300px'}}></div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h4 className="text-base font-semibold text-slate-800 mb-4">Atividades por Dia da Semana</h4>
                      <div id="weekday-chart-container" style={{height: '300px'}}></div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h4 className="text-base font-semibold text-slate-800 mb-4">Progresso ao Longo do Mês</h4>
                    <div id="progress-chart-container" style={{height: '350px'}}></div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h4 className="text-base font-semibold text-slate-800 mb-4">Detalhamento de Atividades</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#7FA8C9'}}>
                            <Users size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Reuniões</p>
                            <p className="text-xs text-slate-500">12 atividades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-800">24h</p>
                          <p className="text-xs text-slate-500">27.9% do total</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#A68CC9'}}>
                            <GraduationCap size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Treinamentos</p>
                            <p className="text-xs text-slate-500">8 atividades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-800">18h</p>
                          <p className="text-xs text-slate-500">20.9% do total</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#8CC99B'}}>
                            <Video size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Webinars</p>
                            <p className="text-xs text-slate-500">5 atividades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-800">10h</p>
                          <p className="text-xs text-slate-500">11.6% do total</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#C9B88C'}}>
                            <Book size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Estudos</p>
                            <p className="text-xs text-slate-500">15 atividades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-800">30h</p>
                          <p className="text-xs text-slate-500">34.9% do total</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#C99B8C'}}>
                            <CalendarIcon size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Eventos</p>
                            <p className="text-xs text-slate-500">3 atividades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-800">4h</p>
                          <p className="text-xs text-slate-500">4.7% do total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Novo Evento</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título do Evento</label>
                <input 
                  type="text" 
                  placeholder="Ex: Reunião de Compliance" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Data de Início</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Horário de Início</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Data de Término</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Horário de Término</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Reuniões</option>
                  <option>Treinamentos</option>
                  <option>Webinars</option>
                  <option>Estudos</option>
                  <option>Eventos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                <textarea 
                  rows={4} 
                  placeholder="Adicione detalhes sobre o evento..." 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Localização</label>
                <input 
                  type="text" 
                  placeholder="Ex: Sala de Reuniões 3 ou Link da videoconferência" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="reminder" 
                  className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue"
                />
                <label htmlFor="reminder" className="text-sm text-slate-700">Enviar lembrete 15 minutos antes</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Criar Evento
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
