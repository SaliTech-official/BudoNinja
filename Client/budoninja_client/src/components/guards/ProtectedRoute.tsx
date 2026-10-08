/**
 * Guard برای routeهایی که نیاز به احراز هویت دارند.
 * اگر کاربر login نباشد، به /login redirect می‌شود.
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // در حال بارگذاری اولیه auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
          <p className="text-sm text-neutral-400">در حال بررسی...</p>
        </div>
      </div>
    );
  }

  // اگر login نیست، به /login می‌فرستیم
  // مسیر فعلی را در state ذخیره می‌کنیم تا بعد از login برگردیم
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
