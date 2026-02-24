import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Link } from "react-router-dom";

interface Step1FormProps {
  onNext: () => void;
}

export function Step1Form({ onNext }: Step1FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-sm text-neutral-500 font-semibold">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="full-name">نام و نام خانوادگی:</label>
                    <Input id="full-name" required placeholder="مثلاً: محمد محمدی"/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="national-code">کد ملی:</label>
                    <Input id="national-code" required placeholder="مثلاً: 1286546372"/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="mobile">شماره موبایل:</label>
                    <Input id="mobile" required placeholder="مثلاً: 09123334455"/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password">رمز عبور:</label>
                    <Input type="password" id="password" required placeholder="رمز عبور خود را وارد کنید"/>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="password-confirm">تکرار رمز عبور:</label>
                    <Input type="password" id="password-confirm" required placeholder="رمز عبور خود را تکرار کنید"/>
                </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
                مرحله بعدی
            </Button>
        </div>
        <div className="flex justify-center gap-1 text-sm">
            <span className="text-neutral-500">حساب دارید؟</span>
            <Link to="/login" className="font-semibold text-primary-600">ورود</Link>
        </div>
    </form>
  );
}