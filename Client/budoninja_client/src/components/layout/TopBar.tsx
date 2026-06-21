import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { Button } from '../UI/Button';
import moment from 'jalali-moment';

const getPageTitle = (pathname: string): string => {
  const lastSegment = pathname.split('/').pop();

  switch (lastSegment) {
    case 'profile':
      return 'پروفایل کاربری';
    case 'documents':
      return 'مدارک و فایل‌ها';
    case 'security':
      return 'امنیت و رمز عبور';
    case 'certificates':
      return 'احکام و مدارک';
    case 'events':
      return 'مسابقات و رویدادها';
    case 'courses':
      return 'کلاس‌ها و دوره‌ها';
    case 'messages':
      return 'صندوق پیام';
    case 'dashboard':
    default:
      return 'پیشخوان';
  }
};

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const todayDate = moment().locale('fa').format('dddd، D MMMM YYYY');
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const relevantPathnames = pathnames.filter(p => p !== 'dashboard');
  
  const breadcrumbs = [
    { name: 'خانه', href: '/dashboard' },
    ...relevantPathnames.map((name, index) => {
      const href = `/dashboard/${relevantPathnames.slice(0, index + 1).join('/')}`;
      const displayName = getPageTitle(`/dashboard/${name}`);
      return { name: displayName, href };
    })
  ];


  return (
    <header className="flex h-20 flex-shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 md:px-8">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-neutral-700 hover:bg-neutral-600 active:bg-neutral-400"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
        >
          <Menu />
        </Button>
        
        <div>
          <h1 className="text-xl font-bold text-neutral-900">{pageTitle}</h1>
          <nav className="text-xs text-neutral-500 mt-1 hidden md:flex">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.name}>
                <Link to={crumb.href} className="hover:text-primary-600">{crumb.name}</Link>
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600">
          <span>{todayDate}</span>
        </div>
        <Button variant="ghost" size="icon" className="relative text-neutral-600 hover:text-neutral-500 hover:bg-transparent active:bg-transparent" aria-label="اعلان‌ها">
          <Bell />
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
          </span>
        </Button>
      </div>
    </header>
  );
}