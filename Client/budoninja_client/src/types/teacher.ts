/**
 * تایپ‌های مربی‌ها (agents/teachers)
 */

export interface Teacher {
  id: number;
  full_name: string;
  level: string; // مثل "دان ۷"
  branch: string; // شعبه
  is_senior: boolean; // ✅ نماینده ارشد یا مربی عادی
  phone_number: string;
  image: string | null; // مسیر عکس یا null
  province: string | null; // CustomRelationalField → name string
  city: string | null; // CustomRelationalField → name string
}

// پارامترهای query
export interface TeacherListParams {
  province?: number | string; // ID استان
  senior?: "true" | "false";
}
