/**
 * تایپ‌های مربوط به Events (Chalenge)
 */

export type ChalengeType = "solo" | "team";
export type ChalengeGender = "male" | "female";

// ⚠️ فعلاً از backend نمیاد - hardcode می‌کنیم
export interface AgeCategory {
  id: number | string;
  name: string;
}

export interface WeightCategory {
  id: number | string;
  name: string;
}

// یک ایونت (طبق serializer فعلی backend)
export interface ChalengeItem {
  id: number;
  title: string;
  explain: string;
  place: string;
  chalenge_type: ChalengeType;
  gender: ChalengeGender;
  is_open: boolean;
  date: string; // jalali date
  deadline: string; // jalali date

  // ⏳ این‌ها فعلاً از backend نمیان، وقتی اضافه شدن optional می‌ذاریم
  image?: string | null;
  price?: number;
  level?: string;
  age_categories?: AgeCategory[];
  weight_categories?: WeightCategory[];
}

// Response لیست (paginated)
export interface ChalengeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ChalengeItem[];
}

// پارامترهای query
export interface ChalengeListParams {
  page?: number;
  page_size?: number;
  open_only?: "yes" | "no";
}
