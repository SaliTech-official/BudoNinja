import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
// import { Logo } from '@/assets/logo.svg';

export function Footer() {
  return (
    <footer className="bg-bg-primary border-t-4 border-primary-600 text-neutral-300 w-full">
      <div className="px-6 md:px-20 py-16">
        
        {/* --- گرید اصلی فوتر --- */}
        {/* در دسکتاپ grid با ۴ ستون، در موبایل flex عمودی */}
        <div className="flex flex-wrap gap-12 justify-center sm:justify-between">

          {/* ستون ۱: درباره ما */}
          <div className="flex flex-col items-center gap-4 max-w-70 sm:items-start">
            <Link to="/" className="flex items-center gap-2">
              {/* <Logo className="h-10 w-10" /> */}
              <span className="text-xl font-bold text-neutral-50">BudoNinja</span>
            </Link>
            <p className="text-sm text-neutral-400 text-center sm:text-start">
              سامانه جامع سبک نینجوتسو ایران، مرجع رسمی برای ثبت نام، صدور احکام و اطلاع‌رسانی رویدادها.
            </p>
          </div>

          {/* ستون ۲: دسترسی سریع */}
          <div className='min-w-70 lg:min-w-25'>
            <h3 className="text-base font-semibold text-neutral-50 mb-4 text-center sm:text-start">دسترسی سریع</h3>
            <nav className="flex flex-col gap-3 items-center sm:items-start">
              <Link to="/news" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">اخبار</Link>
              <Link to="/events" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">مسابقات</Link>
              <Link to="/about" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">درباره ما</Link>
            </nav>
          </div>

          {/* ستون ۳: خدمات اعضا */}
          <div className='min-w-70 lg:min-w-25'>
            <h3 className="text-base font-semibold text-neutral-50 mb-4 text-center sm:text-start">خدمات اعضا</h3>
            <nav className="flex flex-col gap-3 text-center sm:text-start">
              <Link to="/login" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">ورود به پنل</Link>
              <Link to="/profile/certificates" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">استعلام حکم</Link>
              <Link to="/membership/renew" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors">تمدید عضویت</Link>
            </nav>
          </div>

          {/* ستون ۴: تماس با ما */}
          <div className='min-w-70 lg:min-w-25'>
            <h3 className="text-base font-semibold text-neutral-50 mb-4 text-center sm:text-start">تماس با ما</h3>
            <div className="flex flex-col gap-3 text-sm text-center sm:text-start">
              <a className='flex justify-center sm:justify-start items-center gap-2 transition-colors ease-out text-neutral-400 cursor-pointer hover:text-primary-500'>
                <Phone size={20} />
                <p className='text-sm'>۰۳۱۳۲۲۲۴۴۵۵</p>
              </a>
              <a className='flex justify-center sm:justify-start itmes-center gap-2 transition-colors ease-out text-neutral-400 cursor-pointer hover:text-primary-500'>
                <Mail size={20} />
                <p className='text-sm'>fakemail@gmail.com</p>
              </a>
              <div></div>
            </div>
            {/* اینجا میتونی نماد اعتماد رو هم بذاری */}
          </div>

        </div>
      </div>

      {/* --- نوار کپی‌رایت --- */}
      <div className="border-t border-neutral-800 py-6">
        <p className="text-center text-xs text-neutral-500">
          تمامی حقوق برای BudoNinja محفوظ است © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}