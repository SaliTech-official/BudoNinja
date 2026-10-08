/**
 * Context برای نگه‌داری state بین مرحله‌های ثبت‌نام
 *
 * Step1 → اطلاعات پایه (نام، کد ملی، موبایل، رمز)
 * Step2 → اطلاعات تکمیلی (تاریخ تولد، جنسیت، استان، شهر)
 * Step3 → تأیید OTP (در این مرحله از قبل register شده)
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ── Types ───────────────────────────────────
export interface RegisterStep1Data {
  full_name: string;
  national_code: string;
  phone_number: string;
  password: string;
}

export interface RegisterStep2Data {
  birthday: string; // YYYY-MM-DD (میلادی)
  gender: "male" | "female";
  province: number;
  city: number;
}

interface RegisterContextType {
  currentStep: number;
  step1Data: RegisterStep1Data | null;
  step2Data: RegisterStep2Data | null;

  goToStep: (step: number) => void;
  setStep1Data: (data: RegisterStep1Data) => void;
  setStep2Data: (data: RegisterStep2Data) => void;
  reset: () => void;

  // اطلاعات کامل برای ارسال به backend
  getRegisterPayload: () => (RegisterStep1Data & RegisterStep2Data) | null;
}

// ── Context ─────────────────────────────────
const RegisterContext = createContext<RegisterContextType | null>(null);

// ── Provider ────────────────────────────────
export function RegisterProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1DataState] = useState<RegisterStep1Data | null>(
    null
  );
  const [step2Data, setStep2DataState] = useState<RegisterStep2Data | null>(
    null
  );

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  }, []);

  const setStep1Data = useCallback((data: RegisterStep1Data) => {
    setStep1DataState(data);
  }, []);

  const setStep2Data = useCallback((data: RegisterStep2Data) => {
    setStep2DataState(data);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setStep1DataState(null);
    setStep2DataState(null);
  }, []);

  const getRegisterPayload = useCallback(() => {
    if (!step1Data || !step2Data) return null;
    return { ...step1Data, ...step2Data };
  }, [step1Data, step2Data]);

  const value: RegisterContextType = {
    currentStep,
    step1Data,
    step2Data,
    goToStep,
    setStep1Data,
    setStep2Data,
    reset,
    getRegisterPayload,
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
}

// ── Hook ────────────────────────────────────
export function useRegisterContext() {
  const ctx = useContext(RegisterContext);
  if (!ctx) {
    throw new Error(
      "useRegisterContext must be used within a RegisterProvider"
    );
  }
  return ctx;
}
