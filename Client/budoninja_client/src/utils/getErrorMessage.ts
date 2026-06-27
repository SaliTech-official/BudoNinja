interface DjangoErrorResponse {
    detail?: string;
    message?: string;
    non_field_errors?: string[];
    [key: string]: unknown;
  }
  
  export function getErrorMessage(error: unknown): string {
    if (!error || typeof error !== "object") {
      return "خطای نامشخصی رخ داده است";
    }
  
    const err = error as {
      response?: { data?: DjangoErrorResponse; status?: number };
      message?: string;
      code?: string;
    };
  
    // Network error
    if (err.code === "ERR_NETWORK") {
      return "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.";
    }
  
    // Timeout
    if (err.code === "ECONNABORTED") {
      return "زمان درخواست به پایان رسید. لطفاً دوباره تلاش کنید.";
    }
  
    const data = err.response?.data;
  
    if (!data) {
      return err.message || "خطای نامشخصی رخ داده است";
    }
  
    // detail field (common in DRF)
    if (typeof data.detail === "string") {
      return data.detail;
    }
  
    // message field
    if (typeof data.message === "string") {
      return data.message;
    }
  
    // non_field_errors
    if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
      return data.non_field_errors[0];
    }
  
    // Field-level errors - get the first one
    for (const key of Object.keys(data)) {
      const value = data[key];
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
        return value[0];
      }
      if (typeof value === "string") {
        return value;
      }
    }
  
    // Status code based
    const status = err.response?.status;
    switch (status) {
      case 400:
        return "اطلاعات ارسالی نامعتبر است";
      case 401:
        return "لطفاً وارد حساب کاربری خود شوید";
      case 403:
        return "شما دسترسی لازم را ندارید";
      case 404:
        return "مورد درخواستی یافت نشد";
      case 500:
        return "خطای سرور. لطفاً بعداً تلاش کنید";
      default:
        return "خطای نامشخصی رخ داده است";
    }
  }
  
  // برای خطاهای فیلدی فرم
  export function getFieldErrors(error: unknown): Record<string, string> {
    const fieldErrors: Record<string, string> = {};
  
    const err = error as {
      response?: { data?: Record<string, unknown> };
    };
  
    const data = err?.response?.data;
    if (!data || typeof data !== "object") return fieldErrors;
  
    for (const [key, value] of Object.entries(data)) {
      if (key === "detail" || key === "message" || key === "non_field_errors") continue;
  
      if (Array.isArray(value) && value.length > 0) {
        fieldErrors[key] = String(value[0]);
      } else if (typeof value === "string") {
        fieldErrors[key] = value;
      }
    }
  
    return fieldErrors;
  }