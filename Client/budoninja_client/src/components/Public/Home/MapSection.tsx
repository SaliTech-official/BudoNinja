import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../UI/Select";
import { IranMap } from "../../map/IranMap";
import { InstructorCard } from "../../cards/InstructorCard";
import { Users, Loader2 } from "lucide-react";
import { useTeachers } from "../../../hooks/queries/useTeachers";
import { useProvinceIdByName } from "../../../hooks/useProvinceIdByName";
import {
  getProvincePersianName,
  PROVINCE_NAME_EN_TO_FA,
} from "../../../utils/provinceMapping";
import { getMediaUrl } from "../../../utils/mediaUrl";
import type { Teacher } from "../../../types/teacher";

// همه اسم‌های انگلیسی که در SVG هستن (برای dropdown mobile)
const PROVINCE_NAMES_EN = Object.keys(PROVINCE_NAME_EN_TO_FA);

export function MapSection() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // تبدیل اسم انگلیسی → فارسی → id
  const provincePersian = getProvincePersianName(selectedProvince);
  const { id: provinceId, isLoading: provinceIdLoading } =
    useProvinceIdByName(provincePersian);

  const {
    data: teachers,
    isLoading: teachersLoading,
    isError,
  } = useTeachers(provinceId);

  // تفکیک senior از normal
  const { senior, others } = useMemo(() => {
    if (!teachers || teachers.length === 0) {
      return { senior: null as Teacher | null, others: [] as Teacher[] };
    }
    const seniorList = teachers.filter((t: Teacher) => t.is_senior);
    const normalList = teachers.filter((t: Teacher) => !t.is_senior);
    return {
      senior: seniorList[0] ?? null,
      others: normalList,
    };
  }, [teachers]);

  const handleProvinceClick = (provinceName: string) => {
    setSelectedProvince((prev) =>
      prev === provinceName ? null : provinceName
    );
  };

  // تبدیل Teacher به props InstructorCard
  const teacherToProps = (t: Teacher) => ({
    name: t.full_name,
    rank: t.level,
    city: t.city ?? t.province ?? "",
    phone: t.phone_number || undefined,
    avatarUrl: getMediaUrl(t.image) ?? undefined,
  });

  const isLoading = provinceIdLoading || teachersLoading;

  return (
    <section
      className="py-16 px-6 lg:py-24 lg:px-20"
      style={{ backgroundColor: "var(--color-neutral-100)" }}
    >
      <div className="container mx-auto flex flex-wrap-reverse lg:flex-nowrap gap-12 items-start">
        {/* Right panel — Instructors */}
        <div className="rounded-2xl bg-white p-10 shadow-lg lg:w-[480px] w-full flex flex-col justify-center">
          {!selectedProvince ? (
            <div className="text-center text-neutral-500">
              <Users size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold">استانی انتخاب نشده است</h3>
              <p className="text-sm mt-2">
                برای مشاهده مربیان، روی استان مورد نظر کلیک کنید.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : isError ? (
            <div className="text-center text-neutral-500 py-8">
              خطا در بارگذاری مربیان
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl text-primary-600">
                استان <span>{provincePersian ?? selectedProvince}</span>
              </h2>

              {/* Senior */}
              <div>
                <label className="text-sm font-medium text-neutral-500 mb-3 block">
                  نماینده ارشد سبک
                </label>
                {senior ? (
                  <InstructorCard {...teacherToProps(senior)} />
                ) : (
                  <p className="text-neutral-500 text-sm text-center py-4">
                    نماینده ارشدی برای این استان ثبت نشده است
                  </p>
                )}
              </div>

              {/* Others (scrollable) */}
              <div>
                <label className="text-sm font-medium text-neutral-500 mb-3 block">
                  مربیان فعال
                </label>

                <div className="max-h-[400px] overflow-y-auto pr-1 flex flex-col gap-4 custom-scrollbar">
                  {others.length ? (
                    others.map((t: Teacher) => (
                      <InstructorCard key={t.id} {...teacherToProps(t)} />
                    ))
                  ) : (
                    <p className="text-neutral-500 text-lg text-center mt-4">
                      مربی فعالی در استان انتخابی شما وجود ندارد!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Left: Map */}
        <div className="rounded-2xl bg-neutral-800 shadow-lg w-full max-w-[760px] px-6 py-8 lg:px-16 lg:py-24 h-fit">
          <IranMap
            hoveredProvince={hoveredProvince}
            selectedProvince={selectedProvince}
            onProvinceHover={setHoveredProvince}
            onProvinceClick={handleProvinceClick}
          />

          {/* Mobile: Select */}
          <div className="mt-8 lg:hidden">
            <Select
              value={selectedProvince || undefined}
              onValueChange={(value) => setSelectedProvince(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="استانی را انتخاب کنید..." />
              </SelectTrigger>
              <SelectContent>
                {PROVINCE_NAMES_EN.map((nameEn) => (
                  <SelectItem key={nameEn} value={nameEn}>
                    {PROVINCE_NAME_EN_TO_FA[nameEn]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
