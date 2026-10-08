/**
 * نگاشت اسم انگلیسی استان (که در SVG map هست) به اسم فارسی
 * که در backend استفاده می‌شه
 */

export const PROVINCE_NAME_EN_TO_FA: Record<string, string> = {
  Tehran: "تهران",
  Esfahan: "اصفهان",
  Alborz: "البرز",
  Fars: "فارس",
  Kerman: "کرمان",
  Yazd: "یزد",
  Qom: "قم",
  Qazvin: "قزوین",
  Semnan: "سمنان",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Golestan: "گلستان",
  Kordestan: "کردستان",
  Kermanshah: "کرمانشاه",
  Ilam: "ایلام",
  Lorestan: "لرستان",
  Hamadan: "همدان",
  Markazi: "مرکزی",
  Zanjan: "زنجان",
  Ardebil: "اردبیل",
  "East Azarbaijan": "آذربایجان شرقی",
  "West Azarbaijan": "آذربایجان غربی",
  Khuzestan: "خوزستان",
  Bushehr: "بوشهر",
  Hormozgan: "هرمزگان",
  "Sistan and Baluchestan": "سیستان و بلوچستان",
  "Chahar Mahall and Bakhtiari": "چهارمحال و بختیاری",
  "Kohgiluyeh and Buyer Ahmad": "کهگیلویه وبویراحمد",
  "Razavi Khorasan": "خراسان رضوی",
  "North Khorasan": "خراسان شمالی",
  "South Khorasan": "خراسان جنوبی",
};

/**
 * تبدیل اسم انگلیسی SVG به اسم فارسی
 */
export function getProvincePersianName(
  englishName: string | null | undefined
): string | null {
  if (!englishName) return null;
  return PROVINCE_NAME_EN_TO_FA[englishName] ?? englishName;
}
