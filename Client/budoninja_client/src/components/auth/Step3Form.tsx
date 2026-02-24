import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Link } from "react-router-dom";

interface Step3FormProps {
  onBack: () => void;
  mobileNumber: string; // شماره موبایل از مرحله قبل میاد
}

export function Step3Form({ onBack, mobileNumber }: Step3FormProps) {
  // بعداً اینجا منطق تایمر رو اضافه می‌کنیم
  // const [timer, setTimer] = useState(120);

  return (
    <form className="space-y-6 text-center">
      
      {/* متن راهنما */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-neutral-800">تایید شماره موبایل</h3>
        <p className="mt-2 text-sm text-neutral-600">
          کد تایید ۶ رقمی به شماره 
          <span className="font-bold mx-1">{mobileNumber}</span>
          ارسال شد.
        </p>
      </div>
      
      {/* فیلد OTP */}
      <Input
        id="otp-code"
        placeholder="- - - - - -"
        className="text-center text-2xl tracking-[1rem]" // 👈 برای فاصله بین اعداد
        maxLength={6}
      />
      
      {/* تایمر و ارسال مجدد */}
      <div className="text-sm text-neutral-500">
        <span>01:59</span>
        <Button variant="link" className="mx-2">
          ارسال مجدد کد
        </Button>
      </div>

      {/* دکمه‌های ناوبری */}
      <div className="flex gap-4 pt-4">
        <Button onClick={onBack} variant="outline" className="w-full">
          مرحله قبل
        </Button>
        <Button type="submit" className="w-full">
          تایید و ساخت حساب
        </Button>
      </div>

    </form>
  );
}