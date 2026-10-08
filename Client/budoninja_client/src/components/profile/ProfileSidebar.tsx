import { cn } from "../../lib/utils";
import { NavLink } from "react-router-dom";
import {
  User,
  FileText,
  Shield,
  Camera,
  Phone,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../UI/Avatar";

const navItems = [
  {
    id: "personal",
    label: "اطلاعات فردی",
    icon: User,
    href: "/dashboard/profile",
    end: true,
  },
  {
    id: "documents",
    label: "مدارک و فایل‌ها",
    icon: FileText,
    href: "/dashboard/profile/documents",
    end: false,
  },
  {
    id: "contact",
    label: "اطلاعات تماس",
    icon: Phone,
    href: "/dashboard/profile/contact",
    end: false,
  },
  {
    id: "security",
    label: "امنیت و رمز عبور",
    icon: Shield,
    href: "/dashboard/profile/security",
    end: false,
  },
];

export function ProfileSidebar() {
  const { user } = useAuth();

  const userName = user?.full_name || "کاربر";
  const userRole = user?.level || "هنرجو";
  // ⚠️ فعلاً بر اساس وجود profile فرض می‌کنیم verified هست
  // (backend فیلد is_verified رو در profile response نمی‌ده)
  const isVerified = !!user;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8 min-w-[320px] h-fit">
      {/* Avatar Section */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {user?.personal_photo ? (
            <img
              src={user.personal_photo}
              alt={userName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <Avatar
              name={userName}
              size="lg"
              className="!w-24 !h-24 !text-2xl border-4 border-white shadow-md"
            />
          )}
          <button
            type="button"
            className="absolute bottom-0 left-0 bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="تغییر عکس پروفایل (به‌زودی)"
            disabled
          >
            <Camera size={16} />
            <span className="sr-only">تغییر عکس پروفایل</span>
          </button>
        </div>
        <h2 className="mt-4 text-xl font-bold text-neutral-900 text-center">
          {userName}
        </h2>
        <p className="text-sm text-neutral-500">{userRole}</p>
        <div className="mt-4">
          {isVerified ? (
            <span className="inline-flex items-center rounded-full bg-success-100 px-3 py-1 text-xs font-medium text-success-700">
              تایید هویت شده
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              در انتظار تایید
            </span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex justify-between rounded-md px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              )
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
            <ChevronLeft className="h-5 w-5" />
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
