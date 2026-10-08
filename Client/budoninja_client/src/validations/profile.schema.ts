/**
 * Zod schemas برای فرم‌های پروفایل
 */

import { z } from "zod";

const IRAN_LANDLINE_REGEX = /^0\d{10}$/;
const BIRTH_CERTIFICATE_REGEX = /^\d{1,6}$/;

// ── Personal Info Schema ────────────────
export const personalInfoSchema = z.object({
  father_name: z
    .string()
    .trim()
    .max(64, "نام پدر نمی‌تواند بیشتر از ۶۴ کاراکتر باشد")
    .optional()
    .or(z.literal("")),

  is_maried: z.boolean(),

  education: z
    .enum([
      "under_diploma",
      "diploma",
      "associate",
      "bachelor",
      "master",
      "phd",
    ])
    .optional()
    .or(z.literal("")),

  job: z
    .string()
    .trim()
    .max(258, "شغل نمی‌تواند بیشتر از ۲۵۸ کاراکتر باشد")
    .optional()
    .or(z.literal("")),

  birth_certificate_serial: z
    .string()
    .trim()
    .regex(
      BIRTH_CERTIFICATE_REGEX,
      "شماره شناسنامه باید عدد و حداکثر ۶ رقم باشد"
    )
    .optional()
    .or(z.literal("")),

  issue_place: z
    .string()
    .trim()
    .max(128, "محل صدور نمی‌تواند بیشتر از ۱۲۸ کاراکتر باشد")
    .optional()
    .or(z.literal("")),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

// ── Contact Info Schema ─────────────────
export const contactInfoSchema = z.object({
  email: z
    .string()
    .trim()
    .email("ایمیل نامعتبر است")
    .optional()
    .or(z.literal("")),

  landline_phone: z
    .string()
    .trim()
    .regex(
      IRAN_LANDLINE_REGEX,
      "تلفن ثابت باید ۱۱ رقم و با ۰ شروع شود (مثال: 02112345678)"
    )
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(500, "آدرس نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد")
    .optional()
    .or(z.literal("")),
});

export type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;
