import { useState } from "react";
import { Stepper } from "../../components/UI/Stepper";

import StepOne from "../../components/certificateRequest/StepOne";
import StepTwo from "../../components/certificateRequest/StepTwo";
import StepThree from "../../components/certificateRequest/StepThree";

export default function CertificateRequest() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "انتخاب نوع حکم",
    "اطلاعات ورزشکار",
    "تایید نهایی",
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <StepTwo
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <StepThree
            onBack={() => setCurrentStep(2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      
      {/* stepper */}
      <Stepper
        currentStep={currentStep}
        steps={steps}
        variant="new"
      />

      {/* محتوا */}
      <div className="mt-8">
        {renderStep()}
      </div>

    </div>
  );
}
