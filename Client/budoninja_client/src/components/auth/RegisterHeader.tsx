export default function RegisterHeader() {
  return (
    <div className="flex flex-col gap-8 items-center">
        <div className="w-20 h-20 rounded-full bg-gray-600"></div>
        <div className="flex flex-col gap-3">
            <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900">
                ایجاد حساب کاربری
            </h2>
            <p className="text-center text-base text-neutral-500">
                مراحل ثبت نام را تکمیل کنید
            </p>
        </div>
    </div>
  )
}
