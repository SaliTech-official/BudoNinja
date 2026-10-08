import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { Checkbox } from "../../components/UI/CheckBox";
import { useLogin } from "../../hooks/mutations/useLogin";
import {
  loginSchema,
  type LoginFormValues,
} from "../../validations/auth.schema";

export function LoginPage() {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const isLoading = loginMutation.isPending || isSubmitting;

  return (
    <AuthLayout>
      <div className="w-full lg:w-100 flex flex-col gap-10">
        {/* ── Header ─────────────────────── */}
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

        {/* ── Form ───────────────────────── */}
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone_number"
                      className="text-sm text-neutral-500"
                    >
                      شماره موبایل
                    </label>
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="مثلاً: 09123456789"
                      autoComplete="username"
                      inputMode="numeric"
                      maxLength={11}
                      aria-invalid={!!errors.phone_number}
                      {...register("phone_number")}
                    />
                    {errors.phone_number && (
                      <p className="text-sm text-danger-500 mt-1">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="password"
                      className="text-sm text-neutral-500"
                    >
                      رمز عبور
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-danger-500 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Remember me + Forgot password */}
                <div className="text-sm flex justify-between w-full items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" />
                    <label className="text-neutral-600" htmlFor="remember-me">
                      مرا به خاطر بسپار
                    </label>
                  </div>
                  <Link
                    to="/reset-password"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>
            </div>

            {/* Register link */}
            <div className="flex justify-center items-center gap-1">
              <span className="text-sm font-normal text-neutral-500">
                حساب کاربری ندارید؟
              </span>
              <Link
                to="/register"
                className="text-sm text-primary-600 font-semibold"
              >
                ثبت نام کنید
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
