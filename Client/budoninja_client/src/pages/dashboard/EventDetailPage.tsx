import { Button } from "../../components/UI/Button";
import { InfoCard } from "../../components/cards/InfoCard";
import { Calendar, MapPin, Hourglass, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/Select.tsx';

export default function EventDetailPage() {

  return (
    <div className="flex gap-8 flex-wrap justify-center lg:flex-nowrap">
        <div className='bg-neutral-50 rounded-2xl w-full p-10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]'>
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-10">
                    <div className='flex flex-col gap-6'>
                        <div className='h-75 bg-[#D8D8D8] rounded-[16px] w-full'></div>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-3xl text-neutral-900'>مسابقات قهرمانی کشور (استایل هنرهای فردی)</h2>
                            <div className='flex gap-2 w-full'>
                                <p className='bg-secondary-200 text-secondary-600 px-2 py-1 rounded-base text-xs'>کشوری</p>
                                <p className='bg-secondary-200 text-secondary-600 px-2 py-1 rounded-base text-xs'>آقایان</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard IconComponent={Calendar} title="تاریخ برگزاری" text="۲۰ آبان ۱۴۰۳"/>
                        <InfoCard IconComponent={MapPin} title="مکان برگزاری" text="تهران"/>
                        <InfoCard IconComponent={Hourglass} title="مهلت ثبت نام" text="۱۳ آبان ۱۴۰۳"/>
                        <InfoCard IconComponent={Info} title="نوع مسابقه" text="انفرادی"/>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-xl text-neutral-900">توضیحات و قوانین مسابقه</h4>
                    <div className="flex flex-col gap-6 text-base text-neutral-700">
                        <p>"این مسابقات در دو بخش کاتا و مبارزه برگزار می‌گردد. کلیه شرکت‌کنندگان موظف به همراه داشتن بیمه ورزشی معتبر و معرفی‌نامه از هیئت استان می‌باشند. استفاده از کلاه و محافظ لثه در بخش مبارزه الزامی است."
                        "مسابقات راس ساعت ۸ صبح آغاز می‌شود و وزن‌کشی یک روز قبل انجام خواهد شد."
                        </p>
                        <p>
                        • اصل کارت ملی و شناسنامه
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-neutral-50 w-full lg:max-w-90 h-fit rounded-[16px] p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 items-center">
                    <h6 className="text-sm text-neutral-500 font-semibold">هزینه ثبت نام</h6>
                    <p className="text-primary-600 text-2xl font-bold">۳۵۰,۰۰۰ تومان</p>
                </div>
                <div className="w-full h-px bg-neutral-200"></div>
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-1.5 w-full'>
                        <label htmlFor="ageGrade" className="block text-sm font-medium text-neutral-500">
                            رده سنی
                        </label>
                        <Select>
                            <SelectTrigger id='ageGrade' className='text-neutral-400 bg-bg-tertiary border border-neutral-600'><SelectValue placeholder="رده سنی خود را انتخاب کنید" /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="nojavan">نوجوانان</SelectItem>
                            <SelectItem value="nonahal">نونهالان</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-1.5 w-full'>
                        <label htmlFor="weightGrade" className="block text-sm font-medium text-neutral-500">
                            رده وزنی
                        </label>
                        <Select>
                            <SelectTrigger id='weightGrade' className='text-neutral-400 bg-bg-tertiary border border-neutral-600'><SelectValue placeholder="رده وزنی خود را انتخاب کنید" /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="50">60 کیلو</SelectItem>
                            <SelectItem value="60">50 کیلو</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="h-5 w-5 rounded-base border-[1.5px] border-neutral-400"></div>
                        <p className="text-sm text-neutral-600 font-semibold">قوانین مسابقه را می‌پذیرم</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <Button size="lg" className="w-full">پرداخت و نهایی کردن</Button>
                    <p className="text-xs text-primary-400 font-semibold">۲ روز و ۱۰ ساعت باقی‌مانده</p>
                </div>
            </div>
        </div>
    </div>
  );
}
