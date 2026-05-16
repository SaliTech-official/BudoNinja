import React from 'react'
import { Button } from '../../components/UI/Button'
import FileUpload from '../../components/UI/FileUpload'

export default function DocumentForm() {
  return (
    <>
      <div className='bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]'>
        <div className='w-full flex flex-col gap-8'>
          <div className='flex flex-col gap-6 items-center'>
            <h2 className='text-xl text-neutral-900 leading-7'>بارگذاری مدارک هویتی</h2>
            <div className='w-full h-px bg-neutral-200'></div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-base text-neutral-600 font-semibold'>تصویر کارت ملی</label>
            <FileUpload/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-base text-neutral-600 font-semibold'>تصویر شناسنامه</label>
            <FileUpload/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-base text-neutral-600 font-semibold'>بیمه ورزشی</label>
            <FileUpload/>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='w-full h-px bg-neutral-200'></div>
            <div className='flex justify-end gap-4'>
              <Button size="lg" variant="ghost" className='hover:bg-primary-100 hover:text-primary-600'>انصراف</Button>
              <Button size="lg">ذخیره مدارک</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
