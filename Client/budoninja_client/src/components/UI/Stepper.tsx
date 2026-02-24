import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

const steps = [
  "اطلاعات پایه",
  "اطلاعات تکمیلی",
  "تایید نهایی",
];

interface StepperProps {
  currentStep: number;
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex justify-center">
        {steps.map((stepName, stepIdx) => {
          const stepNumber = stepIdx + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          
          const isLastStep = stepIdx === steps.length - 1;

          return (
            <li key={stepName} className="flex">
              
              <div className="flex flex-col items-center gap-2">
                <span className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                  isCompleted ? "bg-primary-600 text-white" : "",
                  isActive ? "bg-primary-600 text-white" : "",
                  !isCompleted && !isActive ? "bg-neutral-200 text-neutral-500" : ""
                )}>
                  {isCompleted ? <Check size={16} /> : stepNumber}
                </span>
                <p className={cn(
                  "text-xs font-medium",
                  isActive ? "text-primary-600" : "text-neutral-500"
                )}>
                  {stepName}
                </p>
              </div>

              {!isLastStep && (
                <div className={cn(
                  "h-0.5 w-10 mx-2 mt-[15px]",
                  isCompleted ? "bg-primary-600" : "bg-neutral-200"
                )} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}