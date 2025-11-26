interface StepWizardProps {
  currentStep: 1 | 2 | 3;
  scrollProgress?: number;
}

export function StepWizard({ currentStep, scrollProgress = 0 }: StepWizardProps) {
  return (
    <div className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
      <div className="px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                currentStep === 1 ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <div>
                <h3 className={`font-semibold ${currentStep === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Informações Básicas
                </h3>
                <p className="text-sm text-muted-foreground">Dados essenciais do produto</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                currentStep === 2 ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <div>
                <h3 className={`font-medium ${currentStep === 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Conteúdo e Detalhes
                </h3>
                <p className="text-sm text-muted-foreground">Descrição completa</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                currentStep === 3 ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
              <div>
                <h3 className={`font-medium ${currentStep === 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Precificação e Arquivos
                </h3>
                <p className="text-sm text-muted-foreground">Finalização</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-foreground transition-all duration-300 ease-out" 
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
            <div className="absolute top-0 left-0 w-full flex justify-between -mt-1">
              <div className="w-4 h-4 bg-foreground rounded-full border-4 border-card"></div>
              <div className={`w-4 h-4 rounded-full border-4 border-card transition-all duration-300 ${scrollProgress >= 50 ? 'bg-foreground' : 'bg-muted'}`}></div>
              <div className={`w-4 h-4 rounded-full border-4 border-card transition-all duration-300 ${scrollProgress >= 90 ? 'bg-foreground' : 'bg-muted'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
