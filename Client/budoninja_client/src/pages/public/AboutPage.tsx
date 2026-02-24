import React from 'react';
import { Target, Eye } from 'lucide-react';
import { InfoCard } from '../../components/cards/InfoCard';
import NewsCardImage from '../assets/NewsCard.png';

export function AboutPage() {
  return (
    <div className="bg-neutral-50 md:bg-neutral-100 md:py-16">
      <div className="flex flex-col items-center">

        <div className="max-w-200 flex flex-col items-center gap-20 md:gap-12 px-6 py-16 md:px-16 md:py-12 rounded-2xl md:bg-neutral-50 md:shadow-lg overflow-hidden">
          
          <div className="text-center">
            <img
              src={NewsCardImage}
              alt="بنیانگذار سبک"
              className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-primary-600 shadow-md"
            />
            <h1 className="mt-6 text-xl text-neutral-900">استاد اکبر فرجی</h1>
            <p className="mt-2 text-base  text-neutral-600">بنیانگذار و رئیس سبک</p>
          </div>

          <div className="">
            <div className="article-content max-w-none text-right leading-relaxed">
              <h3 className='mt-2'>تاریخچه</h3>
              <p className='mb-2'>
                هنر رزمی نینجوتسو برای اولین بار در سال ۱۳۶۹ توسط استاد اکبر فرجی وارد ایران شد. ایشان پس از سال‌ها تحقیق و سفر به کشورهای مختلف، تصمیم به بنیان‌گذاری این سبک در کشور گرفتند. اولین باشگاه رسمی در تهران افتتاح شد و به سرعت مورد استقبال جوانان علاقه‌مند به هنرهای رزمی اصیل ژاپنی قرار گرفت.
              </p>
            </div>
          </div>
          
          <div className="">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8">ساختار سازمانی</h2>
            <img 
              src={NewsCardImage}
              alt="چارت سازمانی" 
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoCard 
                IconComponent={Target}
                title="ماموریت ما"
                text="توسعه و ترویج هنر نینجوتسو بر پایه اصول اخلاقی، فنی و احترام متقابل."
              />
              <InfoCard 
                IconComponent={Eye}
                title="چشم‌انداز ما"
                text="دستیابی به جایگاه برترین سبک رزمی کشور و کسب موفقیت‌های پایدار بین‌المللی."
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}