import { ArrowLeft, Calendar, Clock, Users, CheckCircle, Star, TrendingUp, FileText, Podcast, Video, Mail, CreditCard, Sparkles, Award, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NewsletterPreview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">Preview da Página de Assinatura</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          <div 
            className="h-64 relative flex items-center justify-center px-8"
            style={{ backgroundColor: '#D4C5E8' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
            <div className="relative text-center space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white/90 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Fintechs & Inovação
              </div>
              <h1 className="text-5xl font-bold text-[hsl(var(--pastel-gray-dark))]">Revolução dos Pagamentos</h1>
              <p className="text-lg text-slate-700 max-w-2xl mx-auto">Análise profunda sobre as transformações no mercado de pagamentos digitais e seu impacto no ecossistema financeiro.</p>
              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Diária</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Calendar className="w-4 h-4" />
                  <span>Seg a Sex às 07:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Users className="w-4 h-4" />
                  <span>2.8K assinantes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#B8D4E8' }}>
              <FileText className="w-7 h-7 text-slate-700" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">150+</div>
            <div className="text-sm text-slate-600">Artigos Publicados</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#D4C5E8' }}>
              <Star className="w-7 h-7 text-slate-700" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">4.9/5</div>
            <div className="text-sm text-slate-600">Avaliação Média</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#C5E8D4' }}>
              <TrendingUp className="w-7 h-7 text-slate-700" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">94%</div>
            <div className="text-sm text-slate-600">Taxa de Abertura</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#E8D4C5' }}>
              <Users className="w-7 h-7 text-slate-700" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">2.8K</div>
            <div className="text-sm text-slate-600">Assinantes Ativos</div>
          </div>
        </section>

        {/* Content Overview */}
        <section className="bg-white rounded-3xl border border-slate-200 p-10 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">O que você vai receber</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Conteúdo exclusivo e de alta qualidade sobre o mercado de pagamentos</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#B8D4E8' }}>
                <FileText className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Artigos Diários</h3>
              <p className="text-sm text-slate-600">Análises profundas sobre tendências, regulamentação e inovações no mercado</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D4C5E8' }}>
                <Podcast className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Podcasts Semanais</h3>
              <p className="text-sm text-slate-600">Entrevistas com especialistas e líderes do mercado de pagamentos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#C5E8D4' }}>
                <Video className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Webinars Mensais</h3>
              <p className="text-sm text-slate-600">Sessões ao vivo com discussões sobre temas relevantes do setor</p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Escolha seu plano</h2>
            <p className="text-slate-600">Acesso completo a todo conteúdo premium</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 flex flex-col">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-slate-700 mb-4" style={{ backgroundColor: '#E8E0C5' }}>
                  Básico
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-slate-800">Gratuito</span>
                </div>
                <p className="text-sm text-slate-600">Perfeito para começar</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>3 artigos por semana</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Newsletter semanal por email</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Acesso ao arquivo público</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Começar Grátis
              </Button>
            </div>

            {/* Premium Monthly Plan */}
            <div className="bg-white rounded-2xl border-2 p-8 flex flex-col relative shadow-xl" style={{ borderColor: '#D4C5E8' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-slate-700" style={{ backgroundColor: '#C5E8D4' }}>
                <Award className="w-3 h-3 inline mr-1" />
                Mais Popular
              </div>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-slate-700 mb-4" style={{ backgroundColor: '#D4C5E8' }}>
                  Premium
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-slate-800">R$ 49</span>
                  <span className="text-slate-600">/mês</span>
                </div>
                <p className="text-sm text-slate-600">Acesso completo ao conteúdo</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Artigos ilimitados</strong> diários</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Podcasts exclusivos semanais</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Webinars mensais ao vivo</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Relatórios Deep Dive trimestrais</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Comunidade exclusiva de membros</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full text-white" style={{ backgroundColor: '#8b5cf6' }}>
                <CreditCard className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </div>

            {/* Premium Annual Plan */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 flex flex-col">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-slate-700 mb-4" style={{ backgroundColor: '#C5E8D4' }}>
                  Anual
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-slate-800">R$ 39</span>
                  <span className="text-slate-600">/mês</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-green-600 font-bold">Economize 20%</span>
                  <span className="text-xs text-slate-500 line-through">R$ 588/ano</span>
                </div>
                <p className="text-sm text-slate-600">Cobrança anual de R$ 468</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Tudo do plano Premium</strong></span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>20% de desconto no valor mensal</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>E-books exclusivos trimestrais</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Consultoria 1:1 semestral</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Assinar Plano Anual
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-3xl border border-slate-200 p-10 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Por que assinar?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Benefícios exclusivos para assinantes premium</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#B8D4E8' }}>
                <Target className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Conteúdo Curado</h3>
                <p className="text-sm text-slate-600">Apenas as informações mais relevantes e impactantes do mercado</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#D4C5E8' }}>
                <Zap className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Em Primeira Mão</h3>
                <p className="text-sm text-slate-600">Seja o primeiro a saber sobre mudanças e tendências do setor</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#C5E8D4' }}>
                <Award className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Especialistas</h3>
                <p className="text-sm text-slate-600">Conteúdo criado por profissionais experientes do mercado financeiro</p>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Channels */}
        <section className="bg-white rounded-3xl border border-slate-200 p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Receba onde preferir</h2>
            <p className="text-slate-600">Escolha seus canais de preferência para receber o conteúdo</p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { name: 'Email', icon: Mail, color: '#B8D4E8' },
              { name: 'WhatsApp', icon: Users, color: '#C5E8D4' },
              { name: 'Telegram', icon: Target, color: '#D4C5E8' },
              { name: 'Slack', icon: Zap, color: '#E8D4C5' },
            ].map((channel) => (
              <div
                key={channel.name}
                className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-xl border-2"
                style={{ borderColor: channel.color, backgroundColor: channel.color }}
              >
                <channel.icon className="w-8 h-8 text-slate-700" />
                <span className="text-sm font-bold text-slate-800">{channel.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center bg-white rounded-3xl border border-slate-200 p-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Pronto para começar?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">Junte-se a milhares de profissionais que já transformaram sua carreira com nosso conteúdo</p>
          <Button size="lg" className="text-white px-8" style={{ backgroundColor: '#8b5cf6' }}>
            <Sparkles className="w-5 h-5 mr-2" />
            Começar Agora
          </Button>
        </div>
      </main>
    </div>
  );
}
