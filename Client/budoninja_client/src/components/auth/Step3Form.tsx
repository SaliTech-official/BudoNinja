import { useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { Link } from "react-router-dom";
import { OtpInput } from "../UI/OtpInput";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRegisterContext } from "../../context/RegisterContext";
import { useRegister } from "../../hooks/mutations/useRegister";
import { useVerifyOtp } from "../../hooks/mutations/useVerifyOtp";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 120;

export function Step3Form() {
  const { step1Data, step2Data, getRegisterPayload, goToStep } =
    useRegisterContext();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(RESEND_SECONDS);

  // برای resend OTP (نه register اولیه — اون قبلاً در Step 2 انجام شده)
  const resendMutation = useRegister({
    onSuccess: () => {
      setTimer(RESEND_SECONDS);
    },
  });

  const verifyMutation = useVerifyOtp({
    redirectTo: "/login",
  });

  // Timer ارسال مجدد
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // وقتی OTP کامل شد، خودکار verify بشه
  useEffect(() => {
    if (otp.length === OTP_LENGTH && !verifyMutation.isPending) {
      verifyMutation.mutate({ code: otp });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleResend = () => {
    if (timer > 0) return;
    const payload = getRegisterPayload();
    if (!payload) return;
    resendMutation.mutate(payload);
  };

  const handleManualVerify = () => {
    if (otp.length !== OTP_LENGTH) return;
    verifyMutation.mutate({ code: otp });
  };

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const mobileNumber = step1Data?.phone_number ?? "";

  // اگه به دلایلی به Step3 رسیدیم ولی Stepقبلی پر نشده
  if (!step1Data || !step2Data) {
    return (
      <div className="text-center text-neutral-600">
        <p>لطفاً ابتدا مراحل قبلی را تکمیل کنید.</p>
        <Button
          type="button"
          onClick={() => goToStep(1)}
          variant="outline"
          className="mt-4"
        >
          بازگشت به مرحله اول
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <p className="text-sm text-neutral-600">
            کد تایید {OTP_LENGTH} رقمی به شماره
            <span className="font-bold mx-1 dir-ltr inline-block">
              {mobileNumber}
            </span>
            ارسال شد.
          </p>

          <OtpInput length={OTP_LENGTH} onComplete={(code) => setOtp(code)} />
        </div>

        <div className="text-sm text-neutral-500">
          {timer > 0 ? (
            <>
              <span>{formatTimer(timer)}</span>
              <span className="mx-2">تا ارسال مجدد کد</span>
            </>
          ) : (
            <Button
              variant="link"
              type="button"
              className="text-sm"
              onClick={handleResend}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending ? "در حال ارسال..." : "ارسال مجدد کد"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
          <Button
            onClick={() => goToStep(1)}
            variant="outline"
            className="w-full gap-2 hover:bg-primary-50 hover:text-primary-700"
            type="button"
          >
            <ChevronRight />
            <span>ویرایش شماره</span>
          </Button>
          <Button
            type="button"
            className="w-full gap-2"
            onClick={handleManualVerify}
            disabled={otp.length !== OTP_LENGTH || verifyMutation.isPending}
          >
            <span>
              {verifyMutation.isPending ? "در حال تایید..." : "تایید و ادامه"}
            </span>
            <ChevronLeft />
          </Button>
        </div>
        <div className="flex gap-1 text-sm justify-center">
          <span className="font-400 text-neutral-500">حساب دارید؟</span>
          <Link className="font-semibold text-primary-600" to="/login">
            ورود
          </Link>
        </div>
      </div>
    </div>
  );
}
