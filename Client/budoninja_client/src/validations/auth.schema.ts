import { z } from "zod";

export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    phone_number: z
      .string()
      .min(1, "شماره موبایل الزامی است")
      .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    first_name: z.string().min(1, "نام الزامی است"),
    last_name: z.string().min(1, "نام خانوادگی الزامی است"),
    password: z
      .string()
      .min(1, "رمز عبور الزامی است")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    password_confirm: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["password_confirm"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  code: z
    .string()
    .min(1, "کد تأیید الزامی است")
    .length(6, "کد تأیید باید ۶ رقمی باشد"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "رمز عبور فعلی الزامی است"),
    new_password: z
      .string()
      .min(1, "رمز عبور جدید الزامی است")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    new_password_confirm: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.new_password === data.new_password_confirm, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["new_password_confirm"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;