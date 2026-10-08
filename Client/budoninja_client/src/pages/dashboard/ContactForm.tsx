import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/UI/InputField";
import { Button } from "../../components/UI/Button";
import { Info } from "lucide-react";
import { useProfile } from "../../hooks/queries/useProfile";
import { useUpdateProfile } from "../../hooks/mutations/useUpdateProfile";
import {
  contactInfoSchema,
  type ContactInfoFormValues,
} from "../../validations/profile.schema";
import { getDirtyValues, emptyStringsToNull } from "../../utils/dirtyFields";
import type { UpdateProfilePayload } from "../../types/profile";

const READONLY_NOTICE = "برای ویرایش با پشتیبانی تماس بگیرید";

export default function ContactForm() {
  const { data: profile, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "",
      landline_phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email ?? "",
        landline_phone: profile.landline_phone ?? "",
        address: profile.address ?? "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (values: ContactInfoFormValues) => {
    const dirtyValues = getDirtyValues(dirtyFields, values);
    const payload = emptyStringsToNull(dirtyValues) as UpdateProfilePayload;
    if (Object.keys(payload).length === 0) return;
    updateMutation.mutate(payload);
  };

  const handleCancel = () => {
    if (profile) {
      reset({
        email: profile.email ?? "",
        landline_phone: profile.landline_phone ?? "",
        address: profile.address ?? "",
      });
    }
  };

  const isSubmitting = updateMutation.isPending;

  if (isLoading || !profile) {
    return (
      <div className="bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px] animate-pulse">
        <div className="h-96" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col gap-8"
      >
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-xl text-neutral-900 leading-7">
            ویرایش اطلاعات تماس
          </h2>
          <div className="w-full h-px bg-neutral-200"></div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-primary-50 border border-primary-200 rounded-md text-sm text-primary-700">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <span>شماره موبایل، استان و شهر فعلاً قابل ویرایش نیستند.</span>
        </div>

        <div className="flex flex-col gap-6">
          {/* موبایل (read-only) و تلفن ثابت */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <InputField
              label="موبایل"
              value={profile.phone_number || "—"}
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
            <InputField
              label="تلفن ثابت"
              placeholder="مثلا: 02112345678"
              inputMode="numeric"
              maxLength={11}
              errorMessage={errors.landline_phone?.message}
              {...register("landline_phone")}
            />
          </div>

          {/* استان و شهر — read-only text */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <InputField
              label="استان"
              value={profile.province || "—"}
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
            <InputField
              label="شهر"
              value={profile.city || "—"}
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
          </div>

          {/* ایمیل */}
          <div className="flex flex-col gap-6">
            <InputField
              label="ایمیل"
              placeholder="مثلا: test@gmail.com"
              type="email"
              autoComplete="email"
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* آدرس */}
          <InputField
            label="آدرس دقیق"
            placeholder="مثلا: اصفهان، خیابان تختی، ..."
            as="textarea"
            rows={4}
            errorMessage={errors.address?.message}
            {...register("address")}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="w-full h-px bg-neutral-200"></div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              size="lg"
              variant="ghost"
              className="hover:bg-primary-100 hover:text-primary-600"
              onClick={handleCancel}
              disabled={!isDirty || isSubmitting}
            >
              انصراف
            </Button>
            <Button type="submit" size="lg" disabled={!isDirty || isSubmitting}>
              {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
