import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/UI/Button";
import { InfoCard } from "../../components/cards/InfoCard";
import {
  Calendar,
  MapPin,
  Hourglass,
  Info,
  Loader2,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/UI/Select.tsx";
import { useState } from "react";
import { useEventDetail } from "../../hooks/queries/useEventDetail";
import { useAuth } from "../../context/AuthContext";
import { formatJalaliDate } from "../../utils/date";
import { formatPrice, genderLabel, typeLabel } from "../../utils/eventHelpers";
import { getMediaUrl } from "../../utils/mediaUrl";
import toast from "react-hot-toast";
import type { AgeCategory, WeightCategory } from "../../types/event.ts";

// ⚠️ فعلاً hardcode - وقتی backend اضافه شد، از event.age_categories میاد
const FALLBACK_AGE_CATEGORIES = [
  { id: "nonahal", name: "نونهالان" },
  { id: "nojavan", name: "نوجوانان" },
  { id: "bozorgsal", name: "بزرگسالان" },
];

const FALLBACK_WEIGHT_CATEGORIES = [
  { id: "50", name: "زیر ۵۰ کیلو" },
  { id: "60", name: "زیر ۶۰ کیلو" },
  { id: "70", name: "زیر ۷۰ کیلو" },
  { id: "80", name: "بالای ۸۰ کیلو" },
];

// قیمت default (تا backend اضافه بشه)
const DEFAULT_PRICE = 350000;

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { data: event, isLoading, isError } = useEventDetail(id);

  const [ageCategory, setAgeCategory] = useState<string>("");
  const [weightCategory, setWeightCategory] = useState<string>("");
  const [rulesAccepted, setRulesAccepted] = useState(false);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Error
  if (isError || !event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-neutral-600">این مسابقه یافت نشد</p>
        <Link
          to="/events"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          بازگشت به لیست مسابقات
        </Link>
      </div>
    );
  }

  // استخراج داده‌ها
  const imageUrl = getMediaUrl(event.image);
  const price = event.price ?? DEFAULT_PRICE;
  const ageCategories =
    event.age_categories && event.age_categories.length > 0
      ? event.age_categories
      : FALLBACK_AGE_CATEGORIES;
  const weightCategories =
    event.weight_categories && event.weight_categories.length > 0
      ? event.weight_categories
      : FALLBACK_WEIGHT_CATEGORIES;

  const handleRegister = () => {
    // چک login
    if (!isAuthenticated) {
      toast.error("برای ثبت‌نام باید وارد شوید");
      navigate("/login", { state: { from: { pathname: `/events/${id}` } } });
      return;
    }

    // چک ثبت‌نام باز بودن
    if (!event.is_open) {
      toast.error("ثبت‌نام این مسابقه بسته است");
      return;
    }

    // چک فیلدها
    if (!ageCategory) {
      toast.error("رده سنی را انتخاب کنید");
      return;
    }
    if (!weightCategory) {
      toast.error("رده وزنی را انتخاب کنید");
      return;
    }
    if (!rulesAccepted) {
      toast.error("پذیرش قوانین مسابقه الزامی است");
      return;
    }

    // ⏳ فعلاً backend endpoint ثبت‌نام نداره
    toast.success(
      "درخواست ثبت‌نام شما ثبت شد. به‌زودی به درگاه پرداخت هدایت می‌شوید."
    );
    // TODO: وقتی backend آماده شد:
    // registerMutation.mutate({ chalengeId: id, ageCategory, weightCategory });
    // بعد navigate('/payment/...') یا مستقیم به درگاه
  };

  return (
    <div className="bg-neutral-100 min-h-[60vh] p-6 md:p-8">
      <div className="flex gap-8 flex-wrap justify-center lg:flex-nowrap max-w-7xl mx-auto">
        {" "}
        {/* Right: Detail */}
        <div className="bg-neutral-50 rounded-2xl w-full p-10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={event.title}
                    className="h-75 w-full rounded-[16px] object-cover"
                  />
                ) : (
                  <div className="h-75 bg-[#D8D8D8] rounded-[16px] w-full flex items-center justify-center text-neutral-500">
                    بدون تصویر
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl text-neutral-900">{event.title}</h2>
                  <div className="flex gap-2 flex-wrap w-full">
                    {event.level && (
                      <p className="bg-secondary-200 text-secondary-600 px-2 py-1 rounded-base text-xs">
                        {event.level}
                      </p>
                    )}
                    <p className="bg-secondary-200 text-secondary-600 px-2 py-1 rounded-base text-xs">
                      {genderLabel(event.gender)}
                    </p>
                    <p className="bg-secondary-200 text-secondary-600 px-2 py-1 rounded-base text-xs">
                      {typeLabel(event.chalenge_type)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                  IconComponent={Calendar}
                  title="تاریخ برگزاری"
                  text={formatJalaliDate(event.date)}
                />
                <InfoCard
                  IconComponent={MapPin}
                  title="مکان برگزاری"
                  text={event.place}
                />
                <InfoCard
                  IconComponent={Hourglass}
                  title="مهلت ثبت نام"
                  text={formatJalaliDate(event.deadline)}
                />
                <InfoCard
                  IconComponent={Users}
                  title="نوع مسابقه"
                  text={typeLabel(event.chalenge_type)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xl text-neutral-900">
                توضیحات و قوانین مسابقه
              </h4>
              <div className="text-base text-neutral-700 whitespace-pre-line leading-relaxed">
                {event.explain}
              </div>
            </div>
          </div>
        </div>
        {/* Left: Registration Form */}
        <div className="bg-neutral-50 w-full lg:max-w-90 h-fit rounded-[16px] p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 items-center">
              <h6 className="text-sm text-neutral-500 font-semibold">
                هزینه ثبت نام
              </h6>
              <p className="text-primary-600 text-2xl font-bold">
                {formatPrice(price)}
              </p>
            </div>

            <div className="w-full h-px bg-neutral-200"></div>

            {!event.is_open && (
              <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-md text-sm text-neutral-600 text-center">
                ثبت‌نام این مسابقه بسته است
              </div>
            )}

            <div className="flex flex-col gap-4">
              {/* رده سنی */}
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="ageGrade"
                  className="block text-sm font-medium text-neutral-500"
                >
                  رده سنی
                </label>
                <Select
                  value={ageCategory}
                  onValueChange={setAgeCategory}
                  disabled={!event.is_open}
                >
                  <SelectTrigger
                    id="ageGrade"
                    className="text-neutral-400 bg-bg-tertiary border border-neutral-600"
                  >
                    <SelectValue placeholder="رده سنی خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageCategories.map((cat: AgeCategory) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* رده وزنی */}
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="weightGrade"
                  className="block text-sm font-medium text-neutral-500"
                >
                  رده وزنی
                </label>
                <Select
                  value={weightCategory}
                  onValueChange={setWeightCategory}
                  disabled={!event.is_open}
                >
                  <SelectTrigger
                    id="weightGrade"
                    className="text-neutral-400 bg-bg-tertiary border border-neutral-600"
                  >
                    <SelectValue placeholder="رده وزنی خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightCategories.map((cat: WeightCategory) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* قوانین */}
              <label className="flex gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rulesAccepted}
                  onChange={(e) => setRulesAccepted(e.target.checked)}
                  disabled={!event.is_open}
                  className="h-5 w-5 rounded-base border-[1.5px] border-neutral-400 cursor-pointer"
                />
                <p className="text-sm text-neutral-600 font-semibold">
                  قوانین مسابقه را می‌پذیرم
                </p>
              </label>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <Button
                size="lg"
                className="w-full"
                onClick={handleRegister}
                disabled={!event.is_open}
              >
                {isAuthenticated ? "پرداخت و نهایی کردن" : "ورود و ثبت‌نام"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
