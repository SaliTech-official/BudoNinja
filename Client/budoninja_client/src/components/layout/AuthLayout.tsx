import React from 'react';
import coverImage from '../../assets/AuthPicture.png'; // 👈 یک عکس مناسب برای این بخش

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* ستون چپ: تصویر (در موبایل مخفی میشه) */}
      <div className="hidden lg:block relative">
        <img
          src={coverImage}
          alt="BudoNinja Authentication"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
            <h2 className="text-3xl font-bold">مسیر قهرمانی از اینجا شروع می‌شود.</h2>
            <p className="mt-4">به سامانه جامع BudoNinja خوش آمدید.</p>
        </div>
      </div>

      {/* ستون راست: فرم (در موبایل میاد بالا) */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>

    </div>
  );
}