/**
 * Zod schemas برای اعتبارسنجی فرم‌های احراز هویت
 *
 * این فایل تنها منبع حقیقت برای validation فرانت است.
 * هر فرم auth باید از یکی از این schemaها استفاده کند.
 */

import { z } from "zod";

// ── Regex Patterns ───────────────────────
const IRAN_MOBILE_REGEX = /^09\d{9}$/;
const NATIONAL_CODE_REGEX = /^\d{10}$/;
const PERSIAN_NAME_REGEX = /^[\u0600-\u06FF\s]+$/;

// ── National Code Validator ──────────────
/**
 * اعتبارسنجی کد ملی ایران با الگوریتم رسمی
 */
function isValidNationalCode(code: string): boolean {
  // باید دقیقاً 10 رقم باشه
  if (!/^\d{10}$/.test(code)) return false;

  // همه ارقام یکسان نباشن (مثل 1111111111)
  if (/^(\d)\1{9}$/.test(code)) return false;

  // محاسبه چک‌سام
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(code[i], 10) * (10 - i);
  }

  const remainder = sum % 11;
  const checkDigit = parseInt(code[9], 10);

  if (remainder < 2) {
    return checkDigit === remainder;
  } else {
    return checkDigit === 11 - remainder;
  }
}

// ── Login Schema ─────────────────────────
export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(IRAN_MOBILE_REGEX, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ── Register Schema ──────────────────────
export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .regex(PERSIAN_NAME_REGEX, "لطفاً نام را به فارسی وارد کنید"),

  national_code: z
    .string()
    .min(1, "کد ملی الزامی است")
    .regex(NATIONAL_CODE_REGEX, "کد ملی باید ۱۰ رقم باشد")
    .refine(isValidNationalCode, "کد ملی نامعتبر است"),

  phone_number: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(IRAN_MOBILE_REGEX, "شماره موبایل معتبر نیست (مثال: 09123456789)"),

  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

  birthday: z.string().min(1, "تاریخ تولد الزامی است"),

  gender: z.enum(["male", "female"]).refine((val) => !!val, {
    message: "لطفاً جنسیت را انتخاب کنید",
  }),

  province: z
    .number({ message: "لطفاً استان را انتخاب کنید" })
    .int()
    .positive("لطفاً استان را انتخاب کنید"),

  city: z
    .number({ message: "لطفاً شهر را انتخاب کنید" })
    .int()
    .positive("لطفاً شهر را انتخاب کنید"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ── OTP Schema ───────────────────────────
export const otpSchema = z.object({
  code: z
    .string()
    .min(1, "کد تأیید الزامی است")
    .length(6, "کد تأیید باید ۶ رقم باشد")
    .regex(/^\d+$/, "کد تأیید فقط می‌تواند عدد باشد"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

// ── Change Password Schema ───────────────
export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "رمز عبور فعلی الزامی است"),
    new_password: z
      .string()
      .min(1, "رمز عبور جدید الزامی است")
      .min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد"),
    new_password2: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.new_password === data.new_password2, {
    message: "تکرار رمز عبور با رمز عبور جدید مطابقت ندارد",
    path: ["new_password2"],
  })
  .refine((data) => data.new_password !== data.old_password, {
    message: "رمز عبور جدید نباید با رمز فعلی یکسان باشد",
    path: ["new_password"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// ── Reset Password Schemas ───────────────
export const resetPasswordRequestSchema = z.object({
  phone_number: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(IRAN_MOBILE_REGEX, "شماره موبایل معتبر نیست"),
});

export type ResetPasswordRequestFormValues = z.infer<
  typeof resetPasswordRequestSchema
>;

export const setNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "رمز عبور الزامی است")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirm_password: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "تکرار رمز عبور با رمز عبور مطابقت ندارد",
    path: ["confirm_password"],
  });

export type SetNewPasswordFormValues = z.infer<typeof setNewPasswordSchema>;

// ── Register Step Schemas ────────────────

// Step 1: فقط فیلدهای مرحله اول + password_confirm
export const registerStep1Schema = z
  .object({
    full_name: z
      .string()
      .min(1, "نام و نام خانوادگی الزامی است")
      .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد"),

    national_code: z
      .string()
      .min(1, "کد ملی الزامی است")
      .regex(NATIONAL_CODE_REGEX, "کد ملی باید ۱۰ رقم باشد")
      .refine(isValidNationalCode, "کد ملی نامعتبر است"),

    phone_number: z
      .string()
      .min(1, "شماره موبایل الزامی است")
      .regex(IRAN_MOBILE_REGEX, "شماره موبایل معتبر نیست (مثال: 09123456789)"),

    password: z
      .string()
      .min(1, "رمز عبور الزامی است")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

    password_confirm: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "تکرار رمز عبور با رمز عبور مطابقت ندارد",
    path: ["password_confirm"],
  });

export type RegisterStep1FormValues = z.infer<typeof registerStep1Schema>;

// Step 2: فیلدهای مرحله دوم
export const registerStep2Schema = z.object({
  birthday: z.string().min(1, "تاریخ تولد الزامی است"),

  gender: z.enum(["male", "female"]).refine((val) => !!val, {
    message: "لطفاً جنسیت را انتخاب کنید",
  }),

  province: z
    .number({ message: "لطفاً استان را انتخاب کنید" })
    .int()
    .positive("لطفاً استان را انتخاب کنید"),

  city: z
    .number({ message: "لطفاً شهر را انتخاب کنید" })
    .int()
    .positive("لطفاً شهر را انتخاب کنید"),
});

export type RegisterStep2FormValues = z.infer<typeof registerStep2Schema>;
