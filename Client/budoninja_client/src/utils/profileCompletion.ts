/**
 * محاسبه درصد تکمیل پروفایل
 * بر اساس فیلدهایی که کاربر می‌تونه پر کنه
 */

import type { UserProfile } from "../types/profile";

// فیلدهایی که برای تکمیل پروفایل حساب می‌شن
const COMPLETABLE_FIELDS: Array<keyof UserProfile> = [
  // اطلاعات پایه
  "email",
  "father_name",
  "landline_phone",
  "address",

  // اطلاعات تکمیلی
  "education",
  "job",
  "birth_certificate_serial",
  "issue_place",

  // تصاویر
  "personal_photo",
  "id_card_image",
  "birth_certificate_image",
  "sport_insurance_image",
];

export interface ProfileCompletionResult {
  percentage: number;
  isComplete: boolean;
  filledCount: number;
  totalCount: number;
  missingFields: string[];
}

/**
 * محاسبه درصد تکمیل پروفایل
 */
export function calculateProfileCompletion(
  profile: UserProfile | null | undefined
): ProfileCompletionResult {
  if (!profile) {
    return {
      percentage: 0,
      isComplete: false,
      filledCount: 0,
      totalCount: COMPLETABLE_FIELDS.length,
      missingFields: [...COMPLETABLE_FIELDS] as string[],
    };
  }

  const missingFields: string[] = [];
  let filledCount = 0;

  for (const field of COMPLETABLE_FIELDS) {
    const value = profile[field];
    if (value !== null && value !== undefined && value !== "") {
      filledCount++;
    } else {
      missingFields.push(field as string);
    }
  }

  const totalCount = COMPLETABLE_FIELDS.length;
  const percentage = Math.round((filledCount / totalCount) * 100);
  const isComplete = filledCount === totalCount;

  return {
    percentage,
    isComplete,
    filledCount,
    totalCount,
    missingFields,
  };
}
