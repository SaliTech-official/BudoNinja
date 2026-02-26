import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Book,
  User,
  Award,
  Calendar,
  MessageCircle,
  LogOut,
  Home
} from 'lucide-react';

const sidebarLinks = [
  { name: 'پیشخوان', href: '/dashboard', icon: Home },
  { name: 'پروفایل من', href: '/profile', icon: User },
  { name: 'احکام و مدارک', href: '/certificates', icon: Award },
  { name: 'مسابقات و رویدادها', href: '/events', icon: Calendar },
  { name: 'کلاس‌ها و دوره‌ها', href: '/courses', icon: Book },
  { name: 'پیام ها و پشتیبانی', href: '/messages', icon: MessageCircle },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:flex-shrink-0">
      <div className="flex h-full flex-col bg-bg-primary text-neutral-200">
        
        <div className="flex h-20 items-center px-6 border-b border-neutral-800">
          <Link to="/" className="flex items-center gap-3">
            {/* <Logo /> */}
            <div className="w-10 h-10 rounded-full bg-gray-600"></div>
            <span className="text-xl font-bold text-white">پرتال جامع بودونینجا</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {sidebarLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
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

        <div className="mt-auto border-t border-neutral-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://placehold.co/40x40"
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold text-white">علی محمدی</p>
                <p className="text-xs text-neutral-400">هنرجو</p>
              </div>
            </div>
            <button className="text-neutral-400 hover:text-white">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}