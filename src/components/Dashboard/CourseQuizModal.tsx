import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight, Target, BookOpen } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  videoId?: string;
  moduleId: string;
}

interface Module {
  id: string;
  title: string;
  videos: { id: string; title: string }[];
}

interface CourseQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const modules: Module[] = [
  {
    id: "mod1",
    title: "Módulo 1: Fundamentos do Mercado de Capitais",
    videos: [
      { id: "v1", title: "Introdução ao Mercado de Capitais" },
      { id: "v2", title: "Tipos de Investimentos" },
      { id: "v3", title: "Análise Fundamentalista" },
    ]
  },
  {
    id: "mod2",
    title: "Módulo 2: Análise Técnica Avançada",
    videos: [
      { id: "v4", title: "Padrões Gráficos" },
      { id: "v5", title: "Indicadores Técnicos" },
      { id: "v6", title: "Estratégias de Entrada e Saída" },
    ]
  },
  {
    id: "mod3",
    title: "Módulo 3: Gestão de Risco",
    videos: [
      { id: "v7", title: "Fundamentos de Risco" },
      { id: "v8", title: "Stop Loss e Take Profit" },
      { id: "v9", title: "Diversificação de Carteira" },
    ]
  },
  {
    id: "mod4",
    title: "Módulo 4: Mercado de Derivativos",
    videos: [
      { id: "v10", title: "Opções e Futuros" },
      { id: "v11", title: "Estratégias com Derivativos" },
    ]
  },
  {
    id: "mod5",
    title: "Módulo 5: Psicologia do Investidor",
    videos: [
      { id: "v12", title: "Vieses Cognitivos" },
      { id: "v13", title: "Controle Emocional" },
    ]
  },
];

const allQuestions: Question[] = [
  // Módulo 1
  { id: "q1", moduleId: "mod1", videoId: "v1", question: "Qual é a principal função do mercado de capitais?", options: ["Apenas guardar dinheiro", "Intermediar a compra e venda de valores mobiliários", "Emitir moeda", "Regular taxas de juros"], correctAnswer: 1 },
  { id: "q2", moduleId: "mod1", videoId: "v1", question: "O que são ações?", options: ["Títulos de dívida", "Frações do capital social de uma empresa", "Moedas virtuais", "Fundos de investimento"], correctAnswer: 1 },
  { id: "q3", moduleId: "mod1", videoId: "v2", question: "Qual investimento é considerado de renda fixa?", options: ["Ações", "Tesouro Direto", "Fundos de ações", "Criptomoedas"], correctAnswer: 1 },
  { id: "q4", moduleId: "mod1", videoId: "v3", question: "O que a análise fundamentalista avalia?", options: ["Gráficos de preços", "Fundamentos econômicos e financeiros da empresa", "Tendências de curto prazo", "Volume de negociação apenas"], correctAnswer: 1 },
  // Módulo 2
  { id: "q5", moduleId: "mod2", videoId: "v4", question: "O que é um padrão de 'cabeça e ombros'?", options: ["Indicador de volume", "Padrão gráfico de reversão", "Tipo de média móvel", "Oscilador de momento"], correctAnswer: 1 },
  { id: "q6", moduleId: "mod2", videoId: "v5", question: "Para que serve o RSI (Índice de Força Relativa)?", options: ["Calcular dividendos", "Identificar condições de sobrecompra ou sobrevenda", "Medir o PIB", "Determinar taxas de juros"], correctAnswer: 1 },
  { id: "q7", moduleId: "mod2", videoId: "v6", question: "O que é um 'breakout'?", options: ["Queda brusca do mercado", "Rompimento de um nível de suporte ou resistência", "Fechamento do mercado", "Tipo de ordem de compra"], correctAnswer: 1 },
  // Módulo 3
  { id: "q8", moduleId: "mod3", videoId: "v7", question: "O que é risco sistêmico?", options: ["Risco específico de uma empresa", "Risco que afeta todo o mercado financeiro", "Risco de fraude", "Risco de liquidez apenas"], correctAnswer: 1 },
  { id: "q9", moduleId: "mod3", videoId: "v8", question: "Qual a função do Stop Loss?", options: ["Maximizar lucros", "Limitar perdas em uma operação", "Aumentar alavancagem", "Calcular dividendos"], correctAnswer: 1 },
  { id: "q10", moduleId: "mod3", videoId: "v9", question: "Por que diversificar a carteira?", options: ["Aumentar o risco", "Reduzir o risco através da alocação em diferentes ativos", "Concentrar em um único ativo", "Evitar ganhos"], correctAnswer: 1 },
  // Módulo 4
  { id: "q11", moduleId: "mod4", videoId: "v10", question: "O que é uma opção de compra (call)?", options: ["Obrigação de vender", "Direito de comprar um ativo a um preço determinado", "Tipo de ação", "Fundo de investimento"], correctAnswer: 1 },
  { id: "q12", moduleId: "mod4", videoId: "v11", question: "O que é uma trava de alta?", options: ["Estratégia que lucra com queda", "Estratégia com opções que lucra com alta do ativo", "Tipo de stop loss", "Ordem de venda"], correctAnswer: 1 },
  // Módulo 5
  { id: "q13", moduleId: "mod5", videoId: "v12", question: "O que é viés de confirmação?", options: ["Tendência de buscar informações que confirmem nossas crenças", "Análise técnica", "Tipo de investimento", "Estratégia de trading"], correctAnswer: 0 },
  { id: "q14", moduleId: "mod5", videoId: "v13", question: "Como o medo afeta as decisões de investimento?", options: ["Não afeta", "Pode levar a vendas precipitadas em momentos de queda", "Sempre melhora as decisões", "Aumenta os lucros"], correctAnswer: 1 },
];

const CourseQuizModal: React.FC<CourseQuizModalProps> = ({ open, onOpenChange }) => {
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string>("all");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredQuestions = allQuestions.filter(q => {
    if (selectedModule !== "all" && q.moduleId !== selectedModule) return false;
    if (selectedVideo !== "all" && q.videoId !== selectedVideo) return false;
    return true;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = filteredQuestions.length > 0 ? ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 : 0;

  const availableVideos = selectedModule !== "all" 
    ? modules.find(m => m.id === selectedModule)?.videos || []
    : [];

  const handleStartQuiz = () => {
    if (filteredQuestions.length === 0) return;
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setWrongCount(0);
    setAnsweredQuestions([]);
    setQuizFinished(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, { questionId: currentQuestion.id, correct: isCorrect }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setWrongCount(0);
    setAnsweredQuestions([]);
    setQuizFinished(false);
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedVideo("all");
  };

  const getScorePercentage = () => {
    const total = correctCount + wrongCount;
    return total > 0 ? Math.round((correctCount / total) * 100) : 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Target className="h-5 w-5 text-pastel-blue" />
            Quiz do Curso
          </DialogTitle>
        </DialogHeader>

        {!quizStarted ? (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Selecionar Módulo</label>
                <Select value={selectedModule} onValueChange={handleModuleChange}>
                  <SelectTrigger className="bg-muted/30 border-border">
                    <SelectValue placeholder="Todos os módulos" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all">Todos os módulos</SelectItem>
                    {modules.map(mod => (
                      <SelectItem key={mod.id} value={mod.id}>{mod.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedModule !== "all" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Selecionar Vídeo</label>
                  <Select value={selectedVideo} onValueChange={setSelectedVideo}>
                    <SelectTrigger className="bg-muted/30 border-border">
                      <SelectValue placeholder="Todos os vídeos do módulo" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="all">Todos os vídeos do módulo</SelectItem>
                      {availableVideos.map(video => (
                        <SelectItem key={video.id} value={video.id}>{video.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="bg-muted/20 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-pastel-purple" />
                <div>
                  <p className="text-sm font-medium text-foreground">Perguntas disponíveis</p>
                  <p className="text-2xl font-bold text-pastel-blue">{filteredQuestions.length}</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleStartQuiz} 
              className="w-full bg-pastel-blue hover:bg-pastel-blue/80 text-slate-700"
              disabled={filteredQuestions.length === 0}
            >
              Iniciar Quiz
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ) : quizFinished ? (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[hsl(142,35%,45%)]/20">
                <Trophy className="h-10 w-10 text-[hsl(142,35%,40%)]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Quiz Finalizado</h3>
              <p className="text-muted-foreground">Confira seu desempenho</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[hsl(142,35%,45%)]/15 rounded-lg p-4 text-center border border-[hsl(142,35%,40%)]/40">
                <CheckCircle2 className="h-6 w-6 text-[hsl(142,35%,35%)] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[hsl(142,35%,35%)]">{correctCount}</p>
                <p className="text-xs text-slate-600">Acertos</p>
              </div>
              <div className="bg-[hsl(350,45%,55%)]/15 rounded-lg p-4 text-center border border-[hsl(350,45%,50%)]/40">
                <XCircle className="h-6 w-6 text-[hsl(350,45%,45%)] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[hsl(350,45%,45%)]">{wrongCount}</p>
                <p className="text-xs text-slate-600">Erros</p>
              </div>
              <div className="bg-[hsl(207,45%,55%)]/15 rounded-lg p-4 text-center border border-[hsl(207,45%,50%)]/40">
                <Target className="h-6 w-6 text-[hsl(207,45%,40%)] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[hsl(207,45%,40%)]">{getScorePercentage()}%</p>
                <p className="text-xs text-slate-600">Aproveitamento</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium text-foreground">{correctCount + wrongCount}/{filteredQuestions.length}</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleRestartQuiz} 
                variant="outline"
                className="flex-1 border-border"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Novo Quiz
              </Button>
              <Button 
                onClick={() => onOpenChange(false)} 
                className="flex-1 bg-pastel-blue hover:bg-pastel-blue/80 text-slate-700"
              >
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Progress and Score */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-pastel-green/10 text-pastel-green border-pastel-green/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {correctCount} Acertos
                  </Badge>
                  <Badge variant="outline" className="bg-pastel-pink/10 text-pastel-pink border-pastel-pink/30">
                    <XCircle className="h-3 w-3 mr-1" />
                    {wrongCount} Erros
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {currentQuestionIndex + 1} de {filteredQuestions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            {currentQuestion && (
              <div className="space-y-4">
                <div className="bg-muted/20 rounded-lg p-4 border border-border">
                  <p className="text-lg font-medium text-foreground">{currentQuestion.question}</p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={showResult}
                        className={cn(
                          "w-full p-4 rounded-lg border text-left transition-all",
                          "hover:border-pastel-blue/50",
                          isSelected && !showResult && "border-pastel-blue bg-pastel-blue/10",
                          showCorrect && "border-pastel-green bg-pastel-green/10",
                          showWrong && "border-pastel-pink bg-pastel-pink/10",
                          !isSelected && !showResult && "border-border bg-muted/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                            isSelected && !showResult && "bg-pastel-blue text-slate-700",
                            showCorrect && "bg-pastel-green text-slate-700",
                            showWrong && "bg-pastel-pink text-slate-700",
                            !isSelected && !showResult && "bg-muted/30 text-muted-foreground"
                          )}>
                            {showCorrect ? <CheckCircle2 className="h-4 w-4" /> : 
                             showWrong ? <XCircle className="h-4 w-4" /> : 
                             String.fromCharCode(65 + index)}
                          </div>
                          <span className={cn(
                            "text-sm",
                            showCorrect && "text-pastel-green font-medium",
                            showWrong && "text-pastel-pink",
                            !showResult && "text-foreground"
                          )}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {!showResult ? (
                    <Button 
                      onClick={handleConfirmAnswer} 
                      className="flex-1 bg-pastel-blue hover:bg-pastel-blue/80 text-slate-700"
                      disabled={selectedAnswer === null}
                    >
                      Confirmar Resposta
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion} 
                      className="flex-1 bg-pastel-blue hover:bg-pastel-blue/80 text-slate-700"
                    >
                      {currentQuestionIndex < filteredQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseQuizModal;
