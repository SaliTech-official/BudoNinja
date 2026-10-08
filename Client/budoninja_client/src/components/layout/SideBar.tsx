import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Home,
  User,
  Award,
  Calendar,
  Book,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/mutations/useLogout";
import { Avatar } from "../UI/Avatar";
import { ConfirmModal } from "../UI/ConfirmModal";

const sidebarLinks = [
  { name: "پیشخوان", href: "/dashboard", icon: Home, end: true },
  { name: "پروفایل من", href: "/dashboard/profile", icon: User, end: false },
  {
    name: "احکام و مدارک",
    href: "/dashboard/certificates",
    icon: Award,
    end: false,
  },
  {
    name: "مسابقات و رویدادها",
    href: "/dashboard/events",
    icon: Calendar,
    end: false,
  },
  {
    name: "کلاس‌ها و دوره‌ها",
    href: "/dashboard/courses",
    icon: Book,
    end: false,
  },
  {
    name: "پیام ها و پشتیبانی",
    href: "/dashboard/messages",
    icon: MessageCircle,
    end: false,
  },
];

// تبدیل level (که string هست) به یه عنوان قشنگ
function getUserRoleLabel(level: string | null | undefined): string {
  if (!level) return "هنرجو";
  // در صورت نیاز، می‌تونی mapping اضافه کنی
  return level;
}

export function Sidebar() {
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        setIsConfirmOpen(false);
      },
    });
  };

  const userName = user?.full_name || "کاربر";
  const userRole = getUserRoleLabel(user?.level);

  return (
    <>
      <aside className="w-72 h-full flex-shrink-0">
        <div className="flex h-full flex-col justify-between bg-bg-primary text-neutral-200">
          {/* Header */}
          <div>
            <div className="flex h-20 items-center px-6 border-b border-neutral-800">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                <span className="text-xl font-bold text-white">
                  پرتال جامع بودونینجا
                </span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {sidebarLinks.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary-600 text-neutral-50"
                            : "text-neutral-300 hover:bg-neutral-800"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer - User Info & Logout */}
          <div className="mt-auto border-t border-neutral-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Avatar name={userName} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">
                    {userRole}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogoutClick}
                disabled={logoutMutation.isPending}
                className="text-neutral-400 hover:text-white p-2 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="خروج از حساب"
                title="خروج از حساب"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmLogout}
        title="خروج از حساب کاربری"
        description="آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟"
        confirmText="بله، خروج"
        cancelText="انصراف"
        variant="danger"
        isLoading={logoutMutation.isPending}
      />
    </>
  );
}
