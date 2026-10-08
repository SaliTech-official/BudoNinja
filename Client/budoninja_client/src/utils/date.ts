/**
 * توابع کمکی برای تبدیل تاریخ جلالی به میلادی و برعکس
 */

import moment from "jalali-moment";

const PERSIAN_MONTHS = [
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

/**
 * تبدیل یک تاریخ جلالی (مثل { day: 15, month: 'فروردین', year: 1375 })
 * به فرمت YYYY-MM-DD میلادی (مثل "1996-04-03")
 */
export function jalaliToGregorian(
  day: number,
  monthName: string,
  year: number
): string {
  const monthIndex = PERSIAN_MONTHS.indexOf(monthName);
  if (monthIndex === -1) {
    throw new Error(`Invalid Persian month name: ${monthName}`);
  }
  const monthNumber = monthIndex + 1; // 1..12

  const jalaliString = `${year}/${String(monthNumber).padStart(
    2,
    "0"
  )}/${String(day).padStart(2, "0")}`;

  return moment.from(jalaliString, "fa", "YYYY/MM/DD").format("YYYY-MM-DD");
}
/**
 * فرمت زیبا برای نمایش تاریخ jalali که از backend میاد
 * مثال ورودی: "1403-08-20T14:30:00" یا "1403-08-20 14:30:00"
 * خروجی: "۲۰ آبان ۱۴۰۳"
 */
export function formatJalaliDate(
  jalaliDateStr: string | null | undefined
): string {
  if (!jalaliDateStr) return "";

  try {
    // فقط بخش تاریخ رو جدا کن (روز و ماه و سال)
    const datePart = jalaliDateStr.split("T")[0].split(" ")[0];
    const [year, month, day] = datePart.split("-").map(Number);

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

    if (!year || !month || !day || month < 1 || month > 12) {
      return jalaliDateStr;
    }

    // تبدیل اعداد به فارسی
    const toPersianDigits = (n: number) => {
      const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return String(n).replace(/\d/g, (d) => digits[Number(d)]);
    };

    return `${toPersianDigits(day)} ${
      persianMonths[month - 1]
    } ${toPersianDigits(year)}`;
  } catch {
    return jalaliDateStr;
  }
}
