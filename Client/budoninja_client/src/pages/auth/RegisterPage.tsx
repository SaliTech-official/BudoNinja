import { useState } from 'react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Step1Form } from '../../components/auth/Step1Form.tsx';
import { Step2Form } from '../../components/auth/Step2Form.tsx';
import { Step3Form } from '../../components/auth/Step3Form.tsx';
import RegisterHeader from '../../components/auth/RegisterHeader.tsx';
import { Stepper } from '../../components/UI/Stepper.tsx';

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const steps = ["اطلاعات پایه", "تکمیلی", "تایید"]

  return (
    <AuthLayout>
        <div className='flex flex-col gap-10'>
            <RegisterHeader />
            <Stepper currentStep={step}/>

            {step === 1 && <Step1Form onNext={() => setStep(2)} />}
            {step === 2 && <Step2Form onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3Form onBack={() => setStep(2)} mobileNumber='09020342552'/>}
        </div>
    </AuthLayout>
  );
}