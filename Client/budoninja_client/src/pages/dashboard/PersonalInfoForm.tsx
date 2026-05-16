import { useState } from 'react';
import { DatePickerModal, type DateValue } from '../../components/modal/DatePickerModal.tsx';
import { InputField } from '../../components/UI/InputField'
import { Button } from '../../components/UI/Button.tsx';
import { Calendar } from 'lucide-react';
import { SegmentedControl } from '../../components/UI/SegmentedControl.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/Select.tsx';


export default function PersonalInfoForm() {
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
      <div className='bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]'>
        <div className='w-full flex flex-col gap-8'>
          <div className='flex flex-col gap-6 items-center'>
            <h2 className='text-xl text-neutral-900 leading-7'>ویرایش اطلاعات فردی</h2>
            <div className='w-full h-px bg-neutral-200'></div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              <InputField label='نام' placeholder='مثلا: محمد'/>
              <InputField label='نام خانوادگی' placeholder='مثلا: محمدی'/>
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              <InputField label='کد ملی' placeholder='1278902254' disabled/>
              <div className='flex flex-col gap-1.5 w-full'>
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
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              <InputField label='نام پدر' placeholder='مثلا: علی'/>
              <div className='flex flex-col gap-1.5 w-full'>
                  <label className="block text-sm font-medium text-neutral-500">
                      جنسیت:
                  </label>
                  <SegmentedControl options={genderOptions} value={gender} onValueChange={setGender}/>
              </div>
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              <InputField label='شماره شناسنامه' placeholder='مثلا: 789393'/>
              <div className='flex flex-col gap-1.5 w-full'>
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
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='w-full h-px bg-neutral-200'></div>
            <div className='flex justify-end gap-4'>
              <Button size="lg" variant="ghost" className='hover:bg-primary-100 hover:text-primary-600'>انصراف</Button>
              <Button size="lg">ذخیره تغییرات</Button>
            </div>
          </div>
        </div>
      </div>

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
  )
}
