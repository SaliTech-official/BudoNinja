import { useState } from 'react';
import { Button } from '../UI/Button';
import { DatePickerModal, type DateValue } from '../modal/DatePickerModal.tsx';
import { SegmentedControl } from '../UI/SegmentedControl.tsx';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select.tsx';
import { Link } from 'react-router-dom';


interface Step2FormProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step2Form({ onNext, onBack }: Step2FormProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  const [birthDate, setBirthDate] = useState<DateValue>({
    day: 1,
    month: 'فروردین',
    year: 1375,
  });

  const [gender, setGender] = useState('male');
  const genderOptions = [
    { label: 'آقا', value: 'male' },
    { label: 'خانم', value: 'female' },
  ];

  return (
    <>
      <form className='flex flex-col gap-6' onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1.5'>
                <label htmlFor="birthdate-trigger" className="block text-sm font-medium text-neutral-500">
                    تاریخ تولد:
                </label>
                <button
                    id="birthdate-trigger"
                    type="button"
                    onClick={() => setIsDatePickerOpen(true)}
                    className="flex h-11 w-full items-center justify-between rounded-md border border-neutral-600 bg-bg-tertiary px-3 py-2 text-sm text-right text-neutral-400"
                >
                    <span>{`${birthDate.day} / ${birthDate.month} / ${birthDate.year}`}</span>
                    <Calendar className="h-4 w-4 text-neutral-500" />
                </button>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="province" className="block text-sm font-medium text-neutral-500">
                        استان:
                    </label>
                    <Select>
                        <SelectTrigger id='province' className='text-neutral-400 bg-bg-tertiary border border-neutral-600'><SelectValue placeholder="استان مورد نظر خود را انخاب کنید" /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="esfahan">اصفهان</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-500">
                        شهر:
                    </label>
                    <Select>
                        <SelectTrigger id='city' className='text-neutral-400 bg-bg-tertiary border border-neutral-600'><SelectValue placeholder="شهر مورد نظر خود را انتخاب کنید" /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="esfahan">اصفهان</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div className='flex flex-col gap-1.5'>
                    <label className="block text-sm font-medium text-neutral-500">
                        جنسیت:
                    </label>
                    <SegmentedControl options={genderOptions} value={gender} onValueChange={setGender} />
                </div>
            </div>

            <div className="flex gap-4">
            <Button type="button" onClick={onBack} variant="outline" className="w-full gap-2 hover:bg-primary-50 hover:text-primary-700 ">
                <ChevronRight className='h-6 w-6 text-primary-600' />
                <span>مرحله قبل</span>
            </Button>
            <Button type="submit" className="w-full gap-2">
                <span>مرحله بعد</span>
                <ChevronLeft className='h-6 w-6 text-neutral-50' />
            </Button>
            </div>
        </div>
        <div className='flex gap-1 text-sm justify-center'>
            <span className='font-400 text-neutral-500'>حساب دارید؟</span>
            <Link className='font-semibold text-primary-600' to="/login">ورود</Link>
        </div>
      </form>

      {isDatePickerOpen && (
        <DatePickerModal
          initialDate={birthDate}
          onClose={() => setIsDatePickerOpen(false)}
          onSave={(newDate) => {
            setBirthDate(newDate);
          }}
        />
      )}
    </>
  );
}