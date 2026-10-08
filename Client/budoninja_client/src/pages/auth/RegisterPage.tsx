import { AuthLayout } from "../../components/layout/AuthLayout";
import { Step1Form } from "../../components/auth/Step1Form";
import { Step2Form } from "../../components/auth/Step2Form";
import { Step3Form } from "../../components/auth/Step3Form";
import RegisterHeader from "../../components/auth/RegisterHeader";
import { Stepper } from "../../components/UI/Stepper";
import {
  RegisterProvider,
  useRegisterContext,
} from "../../context/RegisterContext";

function RegisterPageInner() {
  const { currentStep } = useRegisterContext();

  return (
    <AuthLayout>
      <div className="flex flex-col gap-10">
        <RegisterHeader />
        <Stepper
          currentStep={currentStep}
          steps={["اطلاعات پایه", "اطلاعات تکمیلی", "تایید نهایی"]}
        />

        {currentStep === 1 && <Step1Form />}
        {currentStep === 2 && <Step2Form />}
        {currentStep === 3 && <Step3Form />}
      </div>
    </AuthLayout>
  );
}

export function RegisterPage() {
  return (
    <RegisterProvider>
      <RegisterPageInner />
    </RegisterProvider>
  );
}
