import { InputField } from '../../components/UI/InputField'
import { Button } from '../../components/UI/Button.tsx';


export default function SecurityForm() {

  return (
    <>
      <div className='bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]'>
        <div className='w-full flex flex-col items-center gap-8'>
          <div className='flex flex-col gap-6 items-center w-full'>
            <h2 className='text-xl text-neutral-900 leading-7'>تغییر رمز عبور</h2>
            <div className='w-full h-px bg-neutral-200'></div>
          </div>
          <div className='flex flex-col items-center w-100 gap-8'>
            <InputField label='رمز عبور فعلی' placeholder='مثلا: abcd1234' type='password'/>
            <InputField label='رمز عبور جدید' placeholder='مثلا: password123' type='password'/>
            <InputField label='تکرار رمز عبور جدید' placeholder='مثلا: password123' type='password'/>
          </div>
          <div className='flex flex-col items-center gap-6 w-full'>
            <div className='w-full h-px bg-neutral-200'></div>
            <div className='flex justify-between w-100'>
              <Button size="lg" variant="ghost" className='hover:bg-primary-100 hover:text-primary-600'>انصراف</Button>
              <Button size="lg">ذخیره تغییرات</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
