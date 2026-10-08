import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  registerStep1Schema,
  type RegisterStep1FormValues,
} from "../../validations/auth.schema";
import { useRegisterContext } from "../../context/RegisterContext";

export function Step1Form() {
  const { step1Data, setStep1Data, goToStep } = useRegisterContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterStep1FormValues>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      full_name: step1Data?.full_name ?? "",
      national_code: step1Data?.national_code ?? "",
      phone_number: step1Data?.phone_number ?? "",
      password: step1Data?.password ?? "",
      password_confirm: step1Data?.password ?? "",
    },
  });

  const onSubmit = (values: RegisterStep1FormValues) => {
    // password_confirm رو از context حذف می‌کنیم چون backend نمی‌خواد
    setStep1Data({
      full_name: values.full_name,
      national_code: values.national_code,
      phone_number: values.phone_number,
      password: values.password,
    });
    goToStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-sm text-neutral-500 font-semibold">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="full_name">نام و نام خانوادگی:</label>
            <Input
              id="full_name"
              placeholder="مثلاً: محمد محمدی"
              aria-invalid={!!errors.full_name}
              {...register("full_name")}
            />
            {errors.full_name && (
              <p className="text-sm text-danger-500 font-normal">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* National Code */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="national_code">کد ملی:</label>
            <Input
              id="national_code"
              placeholder="مثلاً: 1286546372"
              inputMode="numeric"
              maxLength={10}
              aria-invalid={!!errors.national_code}
              {...register("national_code")}
            />
            {errors.national_code && (
              <p className="text-sm text-danger-500 font-normal">
                {errors.national_code.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone_number">شماره موبایل:</label>
            <Input
              id="phone_number"
              type="tel"
              placeholder="مثلاً: 09123334455"
              inputMode="numeric"
              maxLength={11}
              autoComplete="tel"
              aria-invalid={!!errors.phone_number}
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="text-sm text-danger-500 font-normal">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password">رمز عبور:</label>
            <Input
              id="password"
              type="password"
              placeholder="رمز عبور خود را وارد کنید"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-danger-500 font-normal">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Password Confirm */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password_confirm">تکرار رمز عبور:</label>
            <Input
              id="password_confirm"
              type="password"
              placeholder="رمز عبور خود را تکرار کنید"
              autoComplete="new-password"
              aria-invalid={!!errors.password_confirm}
              {...register("password_confirm")}
            />
            {errors.password_confirm && (
              <p className="text-sm text-danger-500 font-normal">
                {errors.password_confirm.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full gap-2" size="lg">
          <span>مرحله بعدی</span>
          <ChevronLeft className="h-6 w-6 text-neutral-50" />
        </Button>
      </div>

      <div className="flex justify-center gap-1 text-sm">
        <span className="text-neutral-500">حساب دارید؟</span>
        <Link to="/login" className="font-semibold text-primary-600">
          ورود
        </Link>
      </div>
    </form>
  );
}
