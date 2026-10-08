import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/UI/InputField";
import { Button } from "../../components/UI/Button";
import { Calendar, Info } from "lucide-react";
import { SegmentedControl } from "../../components/UI/SegmentedControl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/UI/Select";
import { useProfile } from "../../hooks/queries/useProfile";
import { useUpdateProfile } from "../../hooks/mutations/useUpdateProfile";
import {
  personalInfoSchema,
  type PersonalInfoFormValues,
} from "../../validations/profile.schema";
import { getDirtyValues, emptyStringsToNull } from "../../utils/dirtyFields";
import type { UpdateProfilePayload } from "../../types/profile";

const READONLY_NOTICE = "برای ویرایش این فیلد با پشتیبانی تماس بگیرید";

const educationOptions = [
  { value: "under_diploma", label: "زیر دیپلم" },
  { value: "diploma", label: "دیپلم" },
  { value: "associate", label: "کاردانی" },
  { value: "bachelor", label: "کارشناسی" },
  { value: "master", label: "کارشناسی ارشد" },
  { value: "phd", label: "دکتری" },
];

const maritalOptions = [
  { label: "مجرد", value: "single" },
  { label: "متاهل", value: "married" },
];

const genderOptions = [
  { label: "آقا", value: "male" },
  { label: "خانم", value: "female" },
];

// تبدیل تاریخ به فارسی
function formatBirthday(date: string | null | undefined): string {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

// نمایش مقدار یا خط تیره
function displayValue(value: string | null | undefined): string {
  if (!value || value.trim() === "") return "—";
  return value;
}

export default function PersonalInfoForm() {
  const { data: profile, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      father_name: "",
      is_maried: false,
      education: "",
      job: "",
      birth_certificate_serial: "",
      issue_place: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        father_name: profile.father_name ?? "",
        is_maried: profile.is_maried ?? false,
        education: (profile.education ??
          "") as PersonalInfoFormValues["education"],
        job: profile.job ?? "",
        birth_certificate_serial: profile.birth_certificate_serial ?? "",
        issue_place: profile.issue_place ?? "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (values: PersonalInfoFormValues) => {
    const dirtyValues = getDirtyValues(dirtyFields, values);
    const payload = emptyStringsToNull(dirtyValues) as UpdateProfilePayload;
    if (Object.keys(payload).length === 0) return;
    updateMutation.mutate(payload);
  };

  const handleCancel = () => {
    if (profile) {
      reset({
        father_name: profile.father_name ?? "",
        is_maried: profile.is_maried ?? false,
        education: (profile.education ??
          "") as PersonalInfoFormValues["education"],
        job: profile.job ?? "",
        birth_certificate_serial: profile.birth_certificate_serial ?? "",
        issue_place: profile.issue_place ?? "",
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
            ویرایش اطلاعات فردی
          </h2>
          <div className="w-full h-px bg-neutral-200"></div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-primary-50 border border-primary-200 rounded-md text-sm text-primary-700">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <span>
            نام، کد ملی، تاریخ تولد و جنسیت قابل ویرایش نیستند. برای تغییر با
            پشتیبانی تماس بگیرید.
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {/* نام و کد ملی — read only */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <InputField
              label="نام و نام خانوادگی"
              value={displayValue(profile.full_name)}
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
            <InputField
              label="کد ملی"
              value={displayValue(profile.national_code)}
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
          </div>

          {/* موبایل و تاریخ تولد */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <InputField
              label="شماره موبایل"
              value={displayValue(profile.phone_number)}
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-base text-neutral-600 font-semibold">
                تاریخ تولد
              </label>
              <div
                className="flex h-11 w-full items-center justify-between rounded-md border-2 border-neutral-600 bg-bg-tertiary px-3 py-2 text-sm text-neutral-400 opacity-60 cursor-not-allowed"
                title={READONLY_NOTICE}
              >
                <span>{formatBirthday(profile.birthday)}</span>
                <Calendar className="h-4 w-4 text-neutral-500" />
              </div>
            </div>
          </div>

          {/* جنسیت (read-only text) و نام پدر */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <InputField
              label="جنسیت"
              value={
                profile.gender === "male"
                  ? "آقا"
                  : profile.gender === "female"
                  ? "خانم"
                  : "—"
              }
              disabled
              readOnly
              title={READONLY_NOTICE}
            />
            <InputField
              label="نام پدر"
              placeholder="مثلا: علی"
              errorMessage={errors.father_name?.message}
              {...register("father_name")}
            />
          </div>

          {/* شماره شناسنامه و محل صدور */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <InputField
              label="شماره شناسنامه"
              placeholder="مثلا: 123456"
              inputMode="numeric"
              maxLength={6}
              errorMessage={errors.birth_certificate_serial?.message}
              {...register("birth_certificate_serial")}
            />
            <InputField
              label="محل صدور"
              placeholder="مثلا: تهران"
              errorMessage={errors.issue_place?.message}
              {...register("issue_place")}
            />
          </div>

          {/* وضعیت تاهل و تحصیلات */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="block text-base text-neutral-600 font-semibold">
                وضعیت تاهل
              </label>
              <Controller
                control={control}
                name="is_maried"
                render={({ field }) => (
                  <SegmentedControl
                    options={maritalOptions}
                    value={field.value ? "married" : "single"}
                    onValueChange={(v) => field.onChange(v === "married")}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <label className="block text-base text-neutral-600 font-semibold">
                تحصیلات
              </label>
              <Controller
                control={control}
                name="education"
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={(v) => field.onChange(v)}
                  >
                    <SelectTrigger className="text-neutral-400 bg-bg-tertiary border border-neutral-600">
                      <SelectValue placeholder="سطح تحصیلات را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.education && (
                <p className="text-sm text-danger-500">
                  {errors.education.message}
                </p>
              )}
            </div>
          </div>

          {/* شغل */}
          <div className="flex flex-col gap-6">
            <InputField
              label="شغل"
              placeholder="مثلا: مهندس نرم‌افزار"
              errorMessage={errors.job?.message}
              {...register("job")}
            />
          </div>
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
