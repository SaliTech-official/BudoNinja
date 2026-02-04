import React from 'react';
import { Button } from '../UI/Button.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Home } from 'lucide-react';

const navLinks = [
  { name: 'صفحه اصلی', href: '#' },
  { name: 'اخبار و رویدادها', href: '#' },
  { name: 'مسابقات', href: '#' },
  { name: 'درباره ما', href: '#' },
  { name: 'تماس با ما', href: '#' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-700 bg-bg-secondary flex justify-center">
      <div className="container flex h-20 items-center justify-between px-6 md:px-16">
        
        {/* بخش راست: لوگو و منوها */}
        <div className="flex items-center">
          {/* لوگو */}
          <a href="#" className="flex items-center gap-2">
            {/* <Logo className="h-10 w-10 text-primary-500" /> */}
            <span className="text-xl font-bold text-neutral-50">BudoNinja</span>
          </a>
        </div>

          {/* لینک‌های منو - فقط برای دسکتاپ */}
        <div>
            <nav className="hidden lg:flex gap-8">
                {navLinks.map((link) => (
                <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-neutral-200 transition-colors hover:text-primary-600"
                >
                    {link.name}
                </Link>
                ))}
            </nav>
        </div>


        {/* بخش چپ: دکمه‌ها */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm" className='hidden md:block'>ورود به پنل کاربری</Button>
          
          {/* دکمه همبرگری - فقط برای موبایل */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        
          {/* پنل منوی موبایل */}
          {isMobileMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-bg-secondary md:hidden">
            <nav className="flex flex-col items-center gap-6 p-8">
                {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="...">
                    {link.name}
                </Link>
                ))}
            </nav>
          </div>
          )}
        </div>

      </div>
    </header>
  );
}