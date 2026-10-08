import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/UI/InputField";
import { Button } from "../../components/UI/Button";
import { useChangePassword } from "../../hooks/mutations/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../../validations/auth.schema";

export default function SecurityForm() {
  const changePasswordMutation = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password2: "",
    },
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(values);
  };

  const handleCancel = () => {
    reset();
  };

  const isLoading = changePasswordMutation.isPending || isSubmitting;

  return (
    <div className="bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col items-center gap-8"
      >
        <div className="flex flex-col gap-6 items-center w-full">
          <h2 className="text-xl text-neutral-900 leading-7">تغییر رمز عبور</h2>
          <div className="w-full h-px bg-neutral-200"></div>
        </div>

        <div className="flex flex-col items-center w-full max-w-md gap-8">
          <InputField
            label="رمز عبور فعلی"
            placeholder="رمز عبور فعلی خود را وارد کنید"
            type="password"
            autoComplete="current-password"
            errorMessage={errors.old_password?.message}
            {...register("old_password")}
          />
          <InputField
            label="رمز عبور جدید"
            placeholder="حداقل ۸ کاراکتر"
            type="password"
            autoComplete="new-password"
            errorMessage={errors.new_password?.message}
            {...register("new_password")}
          />
          <InputField
            label="تکرار رمز عبور جدید"
            placeholder="رمز عبور جدید را دوباره وارد کنید"
            type="password"
            autoComplete="new-password"
            errorMessage={errors.new_password2?.message}
            {...register("new_password2")}
          />
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full h-px bg-neutral-200"></div>
          <div className="flex justify-between w-full max-w-md">
            <Button
              type="button"
              size="lg"
              variant="ghost"
              className="hover:bg-primary-100 hover:text-primary-600"
              onClick={handleCancel}
              disabled={isLoading}
            >
              انصراف
            </Button>
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
