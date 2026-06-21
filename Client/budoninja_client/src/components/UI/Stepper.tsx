import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: string[];
  variant?: "default" | "new";
}

export function Stepper({ currentStep, steps, variant = "default" }: StepperProps) {
  const isNew = variant === "new";

  return (
    <nav
      aria-label="Progress"
      className={cn(
        "flex items-center justify-center w-full",
        isNew && "h-20 rounded-[16px] bg-neutral-50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]"
      )}
    >
      <ol className="flex items-center justify-center">
        {steps.map((stepName, stepIdx) => {
          const stepNumber = stepIdx + 1;

          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          const isLastStep = stepIdx === steps.length - 1;

          return (
            <li key={stepName} className="flex items-center">
              
              <div className={cn(
                "flex items-center",
                isNew ? "flex-row gap-2" : "flex-col gap-2"
              )}>
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full font-bold",
                    isNew ? "text-base" : "text-sm",
                    (isCompleted || isActive)
                      ? "bg-primary-600 text-neutral-50"
                      : "bg-neutral-200 text-neutral-500"
                  )}
                >
                  {isCompleted && !isNew ? <Check size={16} /> : stepNumber}
                </span>

                <p
                  className={cn(
                    "font-medium",
                    isNew ? "text-base hidden md:block" : "text-xs",
                    isActive && isNew
                      ? "text-neutral-900"
                      : isCompleted && isNew
                      ? "text-primary-600"
                      : isActive && !isNew
                      ? "text-primary-600"
                      : "text-neutral-500"
                  )}
                >
                {stepName}
              </p>
              </div>

              {!isLastStep && (
                <div
                  className={cn(
                    isNew ? "h-[2px] w-[60px] mx-4" : "h-0.5 w-10 mx-2 mt-[-20px]",
                    isCompleted ? "bg-primary-600" : "bg-neutral-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
