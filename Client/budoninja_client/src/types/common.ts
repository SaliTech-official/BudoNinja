/**
 * تایپ‌های عمومی و مشترک پروژه
 */

// ── Generic API Response ─────────────────
export interface ApiSuccessResponse<T = unknown> {
  message?: string;
  data?: T;
}

export interface ApiErrorResponse {
  detail?: string;
  error?: string;
  message?: string;
  non_field_errors?: string[];
  [key: string]: unknown;
}

// ── Pagination (اگر backend بعداً اضافه کنه) ──
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ── Province / City ──────────────────────
export interface Province {
  id?: number;
  name: string;
}

export interface City {
  id?: number;
  name: string;
}

// ── Common Enums ─────────────────────────
export type Gender = "male" | "female";
