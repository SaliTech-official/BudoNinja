/**
 * تایپ‌های مربوط به احراز هویت
 * مطابق با serializerهای backend در accounts/api/serializers.py
 */

import type { Gender } from "./common";

// ── Login ────────────────────────────────
export interface LoginPayload {
  phone_number: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

// ── Register ─────────────────────────────
export interface RegisterPayload {
  full_name: string;
  national_code: string;
  phone_number: string;
  password: string;
  birthday: string; // YYYY-MM-DD
  gender: Gender;
  province: number;
  city: number;
}

export interface RegisterResponse {
  message: string;
}

// ── Verify OTP ───────────────────────────
export interface VerifyOtpPayload {
  code: string;
}

export interface VerifyOtpResponse {
  message: string;
}

// ── Change Password ──────────────────────
export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password2: string;
}

// ── Reset Password ───────────────────────
export interface ResetPasswordPayload {
  phone_number: string;
}

export interface ResetPasswordConfirmPayload {
  code: string;
}

export interface SetNewPasswordPayload {
  password: string;
  confirm_password: string;
}

// ── Logout ───────────────────────────────
export interface LogoutPayload {
  refresh: string;
}

// ── Refresh Token ────────────────────────
export interface RefreshTokenPayload {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh?: string; // اگر ROTATE_REFRESH_TOKENS فعال باشه (که هست)
}
