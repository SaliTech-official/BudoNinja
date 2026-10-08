/**
 * توابع کمکی برای Event
 */

import type {
  ChalengeItem,
  ChalengeGender,
  ChalengeType,
} from "../types/event";
import { formatJalaliDate } from "./date";

// تبدیل جنسیت به فارسی
export function genderLabel(gender: ChalengeGender): string {
  return gender === "male" ? "آقایان" : "بانوان";
}

// تبدیل نوع مسابقه به فارسی
export function typeLabel(type: ChalengeType): string {
  return type === "solo" ? "انفرادی" : "تیمی";
}

// استخراج ماه فارسی از تاریخ jalali (برای date box)
export function extractDayMonth(jalaliDate: string): {
  day: string;
  month: string;
} {
  if (!jalaliDate) return { day: "—", month: "" };

  try {
    const datePart = jalaliDate.split("T")[0].split(" ")[0];
    const [, month, day] = datePart.split("-").map(Number);

    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const toFa = (n: number) =>
      String(n).replace(/\d/g, (d) => persianDigits[Number(d)]);

    return {
      day: toFa(day),
      month: persianMonths[month - 1] ?? "",
    };
  } catch {
    return { day: "—", month: "" };
  }
}

// وضعیت ثبت‌نام برای نمایش
export function getEventStatus(
  event: ChalengeItem
): "open" | "closing" | "closed" {
  if (!event.is_open) return "closed";
  return "open";
}

// نمایش تگ‌های ایونت
export function getEventTags(event: ChalengeItem): string[] {
  const tags: string[] = [];
  if (event.gender) tags.push(genderLabel(event.gender));
  if (event.chalenge_type) tags.push(typeLabel(event.chalenge_type));
  return tags;
}

// فرمت قیمت با کاما
export function formatPrice(price: number | undefined | null): string {
  if (!price) return "رایگان";
  return `${price.toLocaleString("fa-IR")} تومان`;
}

// نمایش دلیل بسته بودن
export function getDeadlineLabel(event: ChalengeItem): {
  label: string;
  date: string;
} {
  return {
    label: "مهلت ثبت‌نام",
    date: formatJalaliDate(event.deadline),
  };
}
