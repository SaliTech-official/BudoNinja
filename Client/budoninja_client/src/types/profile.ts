export type EducationLevel =
  | "under_diploma"
  | "diploma"
  | "associate"
  | "bachelor"
  | "master"
  | "phd";

// ── Profile (کامل) ────────────────────────
export interface UserProfile {
  id: number;
  user: number;

  // اطلاعات User (read-only از serializer)
  phone_number: string;
  full_name: string;
  birthday: string | null;
  gender: string;
  national_code: string;
  province: string | null;
  city: string | null;

  // اطلاعات پایه Profile
  email: string | null;
  father_name: string | null;
  level: string | null;
  is_maried: boolean;

  // اطلاعات تکمیلی
  education: EducationLevel | null;
  job: string | null;
  birth_certificate_serial: string | null;
  issue_place: string | null;
  landline_phone: string | null;
  address: string | null;

  // تصاویر
  personal_photo: string | null;
  id_card_image: string | null;
  birth_certificate_image: string | null;
  sport_insurance_image: string | null;

  // آمار (read-only از دید کاربر)
  technical_workshops: number;
  jurisprudence: number;
  chalenge_participated: number;
}

// ── Profile Update (تمام فیلدهایی که کاربر می‌تونه ویرایش کنه) ──
export interface UpdateProfilePayload {
  // اطلاعات پایه
  email?: string | null;
  father_name?: string | null;
  is_maried?: boolean;

  // اطلاعات تکمیلی
  education?: EducationLevel | null;
  job?: string | null;
  birth_certificate_serial?: string | null;
  issue_place?: string | null;
  landline_phone?: string | null;
  address?: string | null;
}

// ── Dashboard Info ────────────────────────
export interface DashboardInfo {
  technical_workshops: number;
  jurisprudence: number;
  chalenge_participated: number;
}

// ── Membership ────────────────────────────
export interface MembershipInfo {
  full_name: string;
  national_code: string;
  level: string | null;
  public_id: string;
  deadline: string;
  is_active: boolean;
}

// ── Check User Existence ──────────────────
export interface CheckUserPayload {
  phone_number: string;
}
