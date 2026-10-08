/**
 * Service لایه برای endpointهای احراز هویت
 *
 * این فایل فقط درخواست‌های HTTP را ارسال می‌کند.
 * منطق state management، توست، و navigation در hooks انجام می‌شود.
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ChangePasswordPayload,
  ResetPasswordPayload,
  ResetPasswordConfirmPayload,
  SetNewPasswordPayload,
  LogoutPayload,
} from "../types/auth";

export const authService = {
  // ── Login ────────────────────────────
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(
      ENDPOINTS.auth.login,
      payload
    );
    return data;
  },

  // ── Logout ───────────────────────────
  logout: async (payload: LogoutPayload): Promise<void> => {
    await api.post(ENDPOINTS.auth.logout, payload);
  },

  // ── Register ─────────────────────────
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>(
      ENDPOINTS.auth.register,
      payload
    );
    return data;
  },

  // ── Verify OTP ───────────────────────
  verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    const { data } = await api.post<VerifyOtpResponse>(
      ENDPOINTS.auth.verify,
      payload
    );
    return data;
  },

  // ── Change Password ──────────────────
  changePassword: async (
    payload: ChangePasswordPayload
  ): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(
      ENDPOINTS.auth.changePassword,
      payload
    );
    return data;
  },

  // ── Reset Password (Step 1: Request OTP) ──
  resetPassword: async (
    payload: ResetPasswordPayload
  ): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(
      ENDPOINTS.auth.resetPassword,
      payload
    );
    return data;
  },

  // ── Reset Password (Step 2: Verify OTP) ──
  resetPasswordConfirm: async (
    payload: ResetPasswordConfirmPayload
  ): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(
      ENDPOINTS.auth.resetPasswordConfirm,
      payload
    );
    return data;
  },

  // ── Reset Password (Step 3: Set New Password) ──
  setNewPassword: async (
    payload: SetNewPasswordPayload
  ): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(
      ENDPOINTS.auth.setNewPassword,
      payload
    );
    return data;
  },
};
