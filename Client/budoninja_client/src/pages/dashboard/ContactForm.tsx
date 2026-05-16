import { useState } from 'react';
import { InputField } from '../../components/UI/InputField'
import { Button } from '../../components/UI/Button.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/UI/Select.tsx';


export default function ContactForm() {

  return (
    <>
      <div className='bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]'>
        <div className='w-full flex flex-col gap-8'>
          <div className='flex flex-col gap-6 items-center'>
            <h2 className='text-xl text-neutral-900 leading-7'>ویرایش اطلاعات تماس</h2>
            <div className='w-full h-px bg-neutral-200'></div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              <InputField label='موبایل' placeholder='مثلا: 09120000000'/>
              <InputField label='تلفن ثابت' placeholder='مثلا: 02100000000'/>
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
              <InputField label='کد پستی' placeholder='مثلا: 8732637920'/>
              <InputField label='ایمیل' placeholder='مثلا: test@gmail.com' type='email'/>
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
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
                <div className='flex flex-col gap-1.5 w-full'>
                    <label htmlFor="province" className="block text-sm font-medium text-neutral-500">
                        شهر:
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
            <InputField label='آدرس دقیق' placeholder='مثلا: اصفهان، خیابان تختی، ...' as='textarea'/>
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
    </>
  )
}
