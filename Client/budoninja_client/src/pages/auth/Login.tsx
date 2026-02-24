import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/UI/CheckBox";

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full lg:w-100 flex flex-col gap-10">
        <div className="flex flex-col gap-8 items-center">
            <div className="w-20 h-20 rounded-full bg-gray-600"></div>
            <div className="flex flex-col gap-3">
                <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900">
                ورود به حساب کاربری
                </h2>
                <p className="text-center text-base text-neutral-500">
                لطفا اطلاعات ورود خود را وارد کنید
                </p>
            </div>
        </div>
        <form className="flex flex-col gap-8" action="#" method="POST">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1.5">
                                <p className="text-sm text-neutral-500">
                                    کدملی یا نام کاربری
                                </p>
                                <Input
                                    id="username"
                                    placeholder="مثلاً: 0012345678"
                                    autoComplete="username"
                                    required 
                                />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">
                                    رمز عبور
                                </p>
                                <Input
                                    id="password"
                                    placeholder="رمز عبور خود را وارد کنید"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>
                            <div className="text-sm flex justify-between w-full items-center">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember-me"/>
                                    <label className="text-neutral-600" htmlFor="remember-me">مرا به خاطر بسپار</label>
                                </div>
                                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                رمز عبور را فراموش کرده‌اید؟
                                </a>
                            </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                        ورود
                    </Button>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <span className="text-sm font-normal text-neutral-500">حساب کاربری ندارید؟</span>
                    <Link to="/register" className="text-sm text-primary-600 font-semibold">ثبت نام کنید</Link>
                </div>
            </div>
        </form>
      </div>
    </AuthLayout>
  );
}