import { Button } from "../UI/Button";
import { Pen, CreditCard } from "lucide-react";

interface Props {
    onBack: () => void;
  }
  
  export default function StepThree({ onBack }: Props) {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-8">
          <div className='bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]'>
            <div className='flex flex-col gap-4 items-center'>
              <div className="flex w-full justify-between">
                <h2 className='text-xl text-neutral-900 leading-7'>بازبینی اطلاعات درخواست</h2>
                <Button size="sm" className="gap-1.5" onClick={onBack}>
                  <span>ویرایش</span>
                  <Pen size={14}/>
                </Button>
              </div>
              <div className='w-full h-0.5 bg-neutral-200'></div>
              <div className="flex justify-between w-full">
                <h4 className="text-sm text-neutral-500 font-semibold">نوع حکم درخواستی</h4>
                <p className="text-neutral-900 font-semibold">کمربند مشکی - دان ۱</p>
              </div>
              <div className='w-full h-px bg-neutral-200'></div>
              <div className="flex justify-between w-full">
                <h4 className="text-sm text-neutral-500 font-semibold">تاریخ برگزاری آزمون</h4>
                <p className="text-neutral-900 font-semibold">۲۵ آبان ۱۴۰۳</p>
              </div>
              <div className='w-full h-px bg-neutral-200'></div>
              <div className="flex justify-between w-full">
                <h4 className="text-sm text-neutral-500 font-semibold">مربی تایید کننده</h4>
                <p className="text-neutral-900 font-semibold">استاد علی حسینی</p>
              </div>
              <div className='w-full h-px bg-neutral-200'></div>
              <div className="flex justify-between w-full">
                <h4 className="text-sm text-neutral-500 font-semibold">استان</h4>
                <p className="text-neutral-900 font-semibold">اصفهان</p>
              </div>
            </div>
          </div>
          <div className="min-w-90 h-fit flex flex-col p-6 gap-6 bg-neutral-50 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px] border-2 border-primary-100">
            <div className="w-full flex flex-col gap-2 items-center">
              <h5 className="font-semibold text-neutral-500">مبلغ قابل پرداخت</h5>
              <h4 className="text-3xl font-bold text-primary-600">۵۰۰,۰۰۰ تومان</h4>
            </div>
            <div className="p-3 w-full rounded-lg flex justify-center bg-neutral-100">
              <p className="text-xs text-neutral-600">شامل هزینه صدور حکم و مالیات ارزش افزوده</p>
            </div>
            <Button
              size="lg"
              className="gap-2"
            >
              <span>پرداخت آنلاین و ثبت</span>
              <CreditCard size={24}/>
            </Button>
          </div>
        </div>
      </>
    );
  }
  