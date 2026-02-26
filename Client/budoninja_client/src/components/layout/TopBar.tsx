import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, Search, Calendar } from 'lucide-react';
import { Button } from '../UI/Button';
import moment from 'jalali-moment';

const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith('/profile')) return 'پروفایل کاربری';
  if (pathname.startsWith('/certificates')) return 'احکام و مدارک';
  if (pathname.startsWith('/events')) return 'مسابقات و رویدادها';
  // ...
  return 'پیشخوان';
};

export function Topbar() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const todayDate = moment().locale('fa').format('dddd، D MMMM YYYY');

  // state برای منوی موبایل (این state باید از والد بیاد یا با context مدیریت بشه)
  // const { setIsMobileMenuOpen } = useSidebar(); 

  return (
    <header className="flex h-20 flex-shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 md:px-8">
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          // onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu />
        </Button>
        
        <div>
          <h1 className="text-xl font-bold text-neutral-900">{pageTitle}</h1>
          <nav className="text-xs text-neutral-500 mt-1">
            <Link to="/dashboard">خانه</Link> / <span>{pageTitle}</span>
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-neutral-500">
          <Calendar className='w-4 h-4 text-neutral-400'/>
          <span>{todayDate}</span>
        </div>

        <div className='w-px h-6 bg-neutral-200'></div>

        <Button variant="ghost" size="icon">
          <Bell className='w-6 h-6' />
        </Button>
      </div>

    </header>
  );
}