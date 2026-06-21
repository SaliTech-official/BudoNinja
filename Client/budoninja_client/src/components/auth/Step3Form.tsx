import React from 'react';
import { Button } from '../UI/Button';
import { Link } from 'react-router-dom';
import { OtpInput } from '../UI/OtpInput';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Step3FormProps {
  onBack: () => void;
  mobileNumber: string; 
}

export function Step3Form({ onBack, mobileNumber }: Step3FormProps) {
  const handleOtpComplete = (otp: string) => {
    console.log("کد وارد شده:", otp);
  };

  const timer = "01:59";

  return (
    <form className="text-center flex flex-col gap-10">
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-8'>
          <p className="text-sm text-neutral-600">
            کد تایید 5 رقمی به شماره 
            <span className="font-bold mx-1 dir-ltr inline-block">{mobileNumber}</span>
            ارسال شد.
          </p>
          <OtpInput length={5} onComplete={handleOtpComplete} />
        </div>
        
        
        <div className="text-sm text-neutral-500">
          <span>{timer}</span>
          <span className="mx-2">تا ارسال مجدد کد</span>
          <Button variant="link" type="button" className="text-sm hidden">
            ارسال مجدد
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
          <Button onClick={onBack} variant="outline" className="w-full gap-2 hover:bg-primary-50 hover:text-primary-700" type="button">
            <ChevronRight />
            <span>ویرایش شماره</span>
          </Button>
          <Link to="/dashboard">
            <Button className="w-full gap-2">
              <span>تایید و ورود به پنل</span>
              <ChevronLeft />
            </Button>
          </Link>
        </div>
        <div className='flex gap-1 text-sm justify-center'>
          <span className='font-400 text-neutral-500'>حساب دارید؟</span>
          <Link className='font-semibold text-primary-600' to="/login">ورود</Link>
        </div>
      </div>

    </form>
  );
}