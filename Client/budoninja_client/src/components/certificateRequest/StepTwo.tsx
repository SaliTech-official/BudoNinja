import { useState } from 'react';
import { DatePickerModal, type DateValue } from '../../components/modal/DatePickerModal.tsx';
import { Button } from '../../components/UI/Button.tsx';
import { Calendar } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/UI/Select.tsx';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function PersonalInfoForm({ onNext, onPrev } : Props) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [beltType, setBeltType] = useState("");
  const [coach, setCoach] = useState("");
  const [province, setProvince] = useState("");
  const [birthDate, setBirthDate] = useState<DateValue | null>(null);

  // شرط فعال شدن مرحله بعد
  const isFormValid =
    beltType !== "" &&
    coach !== "" &&
    province !== "" &&
    birthDate !== null;

  return (
    <>
      <div className='bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]'>
        <div className='w-full flex flex-col gap-8'>

          {/* Header */}
          <div className='flex flex-col gap-6 items-center'>
            <h2 className='text-xl text-neutral-900 leading-7'>مشخصات حکم درخواستی</h2>
            <div className='w-full h-px bg-neutral-200'></div>
          </div>

          {/* ----------- Fields ----------- */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              
              {/* نوع کمربند */}
              <div className='flex flex-col gap-1.5 w-full'>
                <label className="block text-sm font-medium text-neutral-500">نوع کمربند درخواستی:</label>
                <Select onValueChange={setBeltType}>
                  <SelectTrigger className='text-neutral-400 bg-bg-tertiary border border-neutral-600'>
                    <SelectValue placeholder="نوع کمربند مورد نظر را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">قرمز</SelectItem>
                    <SelectItem value="green">سبز</SelectItem>
                    <SelectItem value="yellow">زرد</SelectItem>
                    <SelectItem value="black">مشکی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* مربی تایید کننده */}
              <div className='flex flex-col gap-1.5 w-full'>
                <label className="block text-sm font-medium text-neutral-500">نام مربی تایید کننده:</label>
                <Select onValueChange={setCoach}>
                  <SelectTrigger className='text-neutral-400 bg-bg-tertiary border border-neutral-600'>
                    <SelectValue placeholder="نام مربی را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahmadi">احمدی</SelectItem>
                    <SelectItem value="akbari">اکبری</SelectItem>
                    <SelectItem value="khajeh">خواجه</SelectItem>
                    <SelectItem value="mohamadi">محمدی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>

              {/* تاریخ آزمون */}
              <div className='flex flex-col gap-1.5 w-full'>
                <label className="block text-sm font-medium text-neutral-500">تاریخ برگزاری آزمون:</label>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(true)}
                  className="flex h-11 w-full items-center justify-between rounded-md border border-neutral-600 bg-bg-tertiary px-3 py-2 text-sm text-right text-neutral-400"
                >
                  <span>
                    {birthDate
                      ? `${birthDate.day} / ${birthDate.month} / ${birthDate.year}`
                      : "تاریخ آزمون را انتخاب کنید"}
                  </span>
                  <Calendar className="h-4 w-4 text-neutral-500" />
                </button>
              </div>

              {/* استان */}
              <div className='flex flex-col gap-1.5 w-full'>
                <label className="block text-sm font-medium text-neutral-500">استان:</label>
                <Select onValueChange={setProvince}>
                  <SelectTrigger className='text-neutral-400 bg-bg-tertiary border border-neutral-600'>
                    <SelectValue placeholder="استان را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tehran">تهران</SelectItem>
                    <SelectItem value="esfahan">اصفهان</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          {/* Divider & Buttons */}
          <div className='flex flex-col gap-6'>
            <div className='w-full h-px bg-neutral-200'></div>

            <div className='flex justify-between gap-4'>
              {/* دکمه مرحله قبل */}
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={onPrev}
              >
                <ChevronRight size={24}/>
                <span>مرحله قبل</span>
              </Button>

              {/* دکمه مرحله بعد */}
              <Button 
                size="lg" 
                onClick={onNext}
                disabled={!isFormValid} // 🚀 فقط وقتی همه فیلدها پر شدند فعال می‌شود
                className='gap-2'
              >
                <span>مرحله بعد</span>
                <ChevronLeft size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      {isDatePickerOpen && (
        <DatePickerModal
          initialDate={birthDate || { day: 1, month: "فروردین", year: 1375 }}
          onClose={() => setIsDatePickerOpen(false)}
          onSave={(newDate) => {
            setBirthDate(newDate);
            setIsDatePickerOpen(false);
          }}
        />
      )}
    </>
  );
}
