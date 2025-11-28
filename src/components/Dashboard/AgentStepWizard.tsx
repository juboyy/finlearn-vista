import { CheckCircle } from "lucide-react";

interface AgentStepWizardProps {
  currentStep: 1 | 2 | 3 | 4;
}

export function AgentStepWizard({ currentStep }: AgentStepWizardProps) {
  const steps = [
    { number: 1, label: "Informações Básicas" },
    { number: 2, label: "Especialização" },
    { number: 3, label: "Personalidade" },
    { number: 4, label: "Finalização" }
  ];

  return (
    <div className="px-8 py-6 border-b border-border bg-card">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors ${
                  currentStep >= step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle size={24} />
                ) : (
                  step.number
                )}
              </div>
              <span 
                className={`text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div 
                className={`flex-1 h-1 mx-4 mt-[-20px] transition-colors ${
                  currentStep > step.number 
                    ? 'bg-primary' 
                    : 'bg-border'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
