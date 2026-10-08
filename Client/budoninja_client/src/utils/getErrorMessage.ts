/**
 * نرمال‌سازی خطاهای backend به یک پیام فارسی قابل نمایش
 */

import { AxiosError } from "axios";

interface BackendErrorData {
  detail?: string;
  error?: string;
  message?: string;
  non_field_errors?: string[];
  [key: string]: unknown;
}

// نگاشت پیام‌های انگلیسی معمول به فارسی
const MESSAGE_TRANSLATIONS: Record<string, string> = {
  // Register / Duplicate errors
  "user already exists": "کاربری با این شماره موبایل قبلاً ثبت‌نام کرده است",
  "user with this phone number already exists.":
    "کاربری با این شماره موبایل قبلاً ثبت‌نام کرده است",
  "user with this phone number already exists":
    "کاربری با این شماره موبایل قبلاً ثبت‌نام کرده است",
  "user with this national code already exists.":
    "کاربری با این کد ملی قبلاً ثبت‌نام کرده است",
  "user with this national code already exists":
    "کاربری با این کد ملی قبلاً ثبت‌نام کرده است",
  "this field must be unique.": "این مقدار قبلاً ثبت شده است",

  // Login errors
  "user with this phone number not exists.":
    "کاربری با این شماره موبایل وجود ندارد",
  "user with this phone number not exists":
    "کاربری با این شماره موبایل وجود ندارد",
  "user credetials are invalid.": "شماره موبایل یا رمز عبور اشتباه است",
  "user credentials are invalid.": "شماره موبایل یا رمز عبور اشتباه است",
  "no active account found with the given credentials":
    "شماره موبایل یا رمز عبور اشتباه است",

  // OTP / Verify errors
  "invalid otp": "کد تأیید نامعتبر است",
  "invalid otp code": "کد تأیید نامعتبر است",
  "session expired": "نشست منقضی شده است. لطفاً دوباره ثبت‌نام کنید",
  "user with this credential not found.": "کاربر یافت نشد",

  // Logout / Token errors
  "no refresh token provided.": "توکن نامعتبر است",
  "invalid token or already loged out(token in blacklist)": "توکن نامعتبر است",
  "token is invalid or expired": "توکن منقضی شده است. لطفاً دوباره وارد شوید",

  // Password errors
  "password is invalid.": "رمز عبور فعلی اشتباه است",
  "new passwords most match together.": "رمز عبور جدید و تکرار آن یکسان نیستند",
  "password most match together.": "رمز عبور و تکرار آن یکسان نیستند",
  "user not verified for reset password.":
    "کاربر برای بازیابی رمز تأیید نشده است",
  "otp was inccorect. try again": "کد تأیید اشتباه است. دوباره تلاش کنید",
  "otp accepted. user can reset password.": "کد تأیید پذیرفته شد",
  "user password changed successfuly.": "رمز عبور با موفقیت تغییر کرد",

  // General
  "faild to send code.": "ارسال کد با خطا مواجه شد",
  "error in puting user old token in blacklist.":
    "خطا در باطل کردن توکن‌های قبلی",
  "this field is required.": "این فیلد الزامی است",
  "this field may not be blank.": "این فیلد نمی‌تواند خالی باشد",
  "a valid integer is required.": "مقدار عددی معتبر لازم است",
  "enter a valid email address.": "ایمیل معتبر وارد کنید",
  "not found.": "مورد درخواستی یافت نشد",
};

function translateMessage(message: string): string {
  const key = message.trim().toLowerCase();
  for (const [en, fa] of Object.entries(MESSAGE_TRANSLATIONS)) {
    if (en.toLowerCase() === key) return fa;
  }
  return message;
}

export function getErrorMessage(error: unknown): string {
  if (!error) return "خطای نامشخصی رخ داده است";

  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK") {
      return "ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.";
    }
    if (error.code === "ECONNABORTED") {
      return "زمان درخواست به پایان رسید. لطفاً دوباره تلاش کنید.";
    }

    const data = error.response?.data as BackendErrorData | undefined;
    const status = error.response?.status;

    if (data && typeof data === "object") {
      if (typeof data.detail === "string") return translateMessage(data.detail);
      if (typeof data.error === "string") return translateMessage(data.error);
      if (typeof data.message === "string")
        return translateMessage(data.message);

      if (
        Array.isArray(data.non_field_errors) &&
        data.non_field_errors.length > 0
      ) {
        return translateMessage(String(data.non_field_errors[0]));
      }

      const firstKey = Object.keys(data).find(
        (k) => k !== "detail" && k !== "error" && k !== "message"
      );
      if (firstKey) {
        const value = data[firstKey];
        if (Array.isArray(value) && value.length > 0) {
          return translateMessage(String(value[0]));
        }
        if (typeof value === "string") {
          return translateMessage(value);
        }
      }
    }

    switch (status) {
      case 400:
        return "اطلاعات ارسالی نامعتبر است";
      case 401:
        return "لطفاً وارد حساب کاربری خود شوید";
      case 403:
        return "شما دسترسی لازم را ندارید";
      case 404:
        return "مورد درخواستی یافت نشد";
      case 409:
        return "این اطلاعات قبلاً ثبت شده است";
      case 429:
        return "تعداد درخواست‌ها بیش از حد مجاز است";
      case 500:
      case 502:
      case 503:
        return "خطای سرور. لطفاً بعداً تلاش کنید";
    }
  }

  if (error instanceof Error) return error.message;

  return "خطای نامشخصی رخ داده است";
}

export function getFieldErrors(error: unknown): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  if (!(error instanceof AxiosError)) return fieldErrors;

  const data = error.response?.data as BackendErrorData | undefined;
  if (!data || typeof data !== "object") return fieldErrors;

  for (const [key, value] of Object.entries(data)) {
    if (["detail", "error", "message", "non_field_errors"].includes(key))
      continue;

    if (Array.isArray(value) && value.length > 0) {
      fieldErrors[key] = translateMessage(String(value[0]));
    } else if (typeof value === "string") {
      fieldErrors[key] = translateMessage(value);
    }
  }

  return fieldErrors;
}
