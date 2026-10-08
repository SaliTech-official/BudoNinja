/**
 * Utility برای استخراج فقط فیلدهای تغییر یافته از react-hook-form
 * برای استفاده در PATCH requests
 */

import type { FieldValues } from "react-hook-form";

/**
 * فقط فیلدهایی که در dirtyFields مشخص شدن رو از values استخراج می‌کنه
 *
 * @example
 * const { formState: { dirtyFields } } = useForm();
 * const changed = getDirtyValues(dirtyFields, values);
 * // فقط فیلدهایی که کاربر واقعاً تغییر داده
 */
export function getDirtyValues<T extends FieldValues>(
  dirtyFields: Partial<Record<keyof T, boolean>>,
  allValues: T
): Partial<T> {
  const dirtyValues: Partial<T> = {};

  (Object.keys(dirtyFields) as Array<keyof T>).forEach((key) => {
    if (dirtyFields[key]) {
      dirtyValues[key] = allValues[key];
    }
  });

  return dirtyValues;
}

/**
 * تبدیل فیلدهای خالی به null (برای API که null قبول می‌کنه)
 * String خالی → null
 */
export function emptyStringsToNull<T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = value === "" ? null : value;
  }
  return result;
}
