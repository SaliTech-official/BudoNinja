/**
 * Schema اعتبارسنجی فرم تماس با ما
 */

import { z } from "zod";

const IRAN_MOBILE_REGEX = /^09\d{9}$/;

export const contactFormSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "نام و نام خانوادگی الزامی است")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(128, "نام نمی‌تواند بیشتر از ۱۲۸ کاراکتر باشد"),

  phone_number: z
    .string()
    .trim()
    .min(1, "شماره تماس الزامی است")
    .regex(IRAN_MOBILE_REGEX, "شماره موبایل معتبر نیست (مثال: 09123456789)"),

  title: z
    .string()
    .trim()
    .min(1, "موضوع پیام الزامی است")
    .min(3, "موضوع باید حداقل ۳ کاراکتر باشد")
    .max(128, "موضوع نمی‌تواند بیشتر از ۱۲۸ کاراکتر باشد"),

  content: z
    .string()
    .trim()
    .min(1, "متن پیام الزامی است")
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(2000, "متن پیام نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
