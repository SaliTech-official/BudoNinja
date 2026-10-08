import { useState } from "react";
import { useRegister } from "../../hooks/mutations/useRegister";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../UI/Button";
import { DatePickerModal, type DateValue } from "../modal/DatePickerModal";
import { SegmentedControl } from "../UI/SegmentedControl";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select";
import { Link } from "react-router-dom";
import {
  registerStep2Schema,
  type RegisterStep2FormValues,
} from "../../validations/auth.schema";
import { useRegisterContext } from "../../context/RegisterContext";
import { useProvinces } from "../../hooks/queries/useProvinces";
import { useCities } from "../../hooks/queries/useCities";
import { jalaliToGregorian } from "../../utils/date";
import type { Province, City } from "../../types/common";

const genderOptions = [
  { label: "آقا", value: "male" },
  { label: "خانم", value: "female" },
];

export function Step2Form() {
  const { step2Data, setStep2Data, goToStep } = useRegisterContext();
  const { step1Data } = useRegisterContext();

  const registerMutation = useRegister({
    onSuccess: () => {
      goToStep(3);
    },
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [birthDate, setBirthDate] = useState<DateValue>({
    day: 1,
    month: "فروردین",
    year: 1375,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterStep2FormValues>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      birthday: step2Data?.birthday ?? "",
      gender: step2Data?.gender ?? "male",
      province: step2Data?.province ?? 0,
      city: step2Data?.city ?? 0,
    },
  });

  // برای cascading select - وقتی province تغییر کرد، cityها reload بشن
  const selectedProvince = watch("province");

  const { data: provincesData, isLoading: provincesLoading } = useProvinces();
  const { data: citiesData, isLoading: citiesLoading } = useCities(
    selectedProvince > 0 ? selectedProvince : null
  );

  const provinces = provincesData ?? [];
  const cities = citiesData ?? [];

  // ثبت دستی برای فیلدهای غیر-standard
  register("birthday");
  register("province");
  register("city");

  const handleDateSave = (newDate: DateValue) => {
    setBirthDate(newDate);
    try {
      const gregorian = jalaliToGregorian(
        newDate.day,
        newDate.month,
        newDate.year
      );
      setValue("birthday", gregorian, { shouldValidate: true });
    } catch (err) {
      console.error("Date conversion failed:", err);
    }
  };

  const onSubmit = (values: RegisterStep2FormValues) => {
    if (!step1Data) {
      goToStep(1);
      return;
    }

    setStep2Data(values);

    const payload = {
      ...step1Data,
      ...values,
    };

    registerMutation.mutate(payload);
  };

  return (
    <>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {/* Birthday */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="birthdate-trigger"
                className="block text-sm font-medium text-neutral-500"
              >
                تاریخ تولد:
              </label>
              <button
                id="birthdate-trigger"
                type="button"
                onClick={() => setIsDatePickerOpen(true)}
                className="flex h-11 w-full items-center justify-between rounded-md border border-neutral-600 bg-bg-tertiary px-3 py-2 text-sm text-right text-neutral-400"
              >
                <span>{`${birthDate.day} / ${birthDate.month} / ${birthDate.year}`}</span>
                <Calendar className="h-4 w-4 text-neutral-500" />
              </button>
              {errors.birthday && (
                <p className="text-sm text-danger-500">
                  {errors.birthday.message}
                </p>
              )}
            </div>

            {/* Province */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="province"
                className="block text-sm font-medium text-neutral-500"
              >
                استان:
              </label>
              <Controller
                control={control}
                name="province"
                render={({ field }) => (
                  <Select
                    value={field.value > 0 ? String(field.value) : ""}
                    onValueChange={(val) => {
                      field.onChange(Number(val));
                      // وقتی استان عوض می‌شه، شهر هم باید reset بشه
                      setValue("city", 0);
                    }}
                  >
                    <SelectTrigger
                      id="province"
                      className="text-neutral-400 bg-bg-tertiary border border-neutral-600"
                    >
                      <SelectValue
                        placeholder={
                          provincesLoading
                            ? "در حال بارگذاری..."
                            : "استان مورد نظر خود را انتخاب کنید"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((p: Province, idx: number) => {
                        // اگه backend id برمی‌گردونه از اون استفاده کن،
                        // اگه نه از index+1 موقتاً استفاده می‌کنیم
                        const provinceId = p.id ?? idx + 1;
                        return (
                          <SelectItem
                            key={provinceId}
                            value={String(provinceId)}
                          >
                            {p.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.province && (
                <p className="text-sm text-danger-500">
                  {errors.province.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-neutral-500"
              >
                شهر:
              </label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    value={field.value > 0 ? String(field.value) : ""}
                    onValueChange={(val) => field.onChange(Number(val))}
                    disabled={!selectedProvince || selectedProvince <= 0}
                  >
                    <SelectTrigger
                      id="city"
                      className="text-neutral-400 bg-bg-tertiary border border-neutral-600"
                    >
                      <SelectValue
                        placeholder={
                          !selectedProvince || selectedProvince <= 0
                            ? "ابتدا استان را انتخاب کنید"
                            : citiesLoading
                            ? "در حال بارگذاری..."
                            : "شهر مورد نظر خود را انتخاب کنید"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c: City, idx: number) => {
                        const cityId = c.id ?? idx + 1;
                        return (
                          <SelectItem key={cityId} value={String(cityId)}>
                            {c.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className="text-sm text-danger-500">{errors.city.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-medium text-neutral-500">
                جنسیت:
              </label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <SegmentedControl
                    options={genderOptions}
                    value={field.value}
                    onValueChange={(val) =>
                      field.onChange(val as "male" | "female")
                    }
                  />
                )}
              />
              {errors.gender && (
                <p className="text-sm text-danger-500">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => goToStep(1)}
              variant="outline"
              className="w-full gap-2 hover:bg-primary-50 hover:text-primary-700"
            >
              <ChevronRight className="h-6 w-6 text-primary-600" />
              <span>مرحله قبل</span>
            </Button>
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={registerMutation.isPending}
            >
              <span>
                {registerMutation.isPending ? "در حال ثبت..." : "مرحله بعد"}
              </span>
              <ChevronLeft className="h-6 w-6 text-neutral-50" />
            </Button>
          </div>
        </div>
        <div className="flex gap-1 text-sm justify-center">
          <span className="font-400 text-neutral-500">حساب دارید؟</span>
          <Link className="font-semibold text-primary-600" to="/login">
            ورود
          </Link>
        </div>
      </form>

      {isDatePickerOpen && (
        <DatePickerModal
          initialDate={birthDate}
          onClose={() => setIsDatePickerOpen(false)}
          onSave={handleDateSave}
        />
      )}
    </>
  );
}
