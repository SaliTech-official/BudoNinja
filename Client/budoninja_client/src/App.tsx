import { Button } from "./components/UI/Button.tsx"
import { Badge } from "./components/UI/Badge.tsx"
import { InputField } from "./components/UI/InputField.tsx"

function App() {

  const emailError = "فرمت ایمیل نامعتبر است."; 

  return (
    <>
      <div className="p-10 flex flex-col gap-4 items-start">
      <Button>دکمه اصلی</Button>

      <Button variant="secondary" size='lg'>دکمه دوم</Button>

      <Button variant="outline">انصراف</Button>
      
      <Button variant="ghost">ویرایش</Button>

      <Button size="lg">دکمه بزرگ</Button>
      
      <Button disabled>غیرفعال</Button>
    </div>
    <div className="p-10 flex gap-4">
      <Badge>پیش‌فرض</Badge>
      <Badge variant="primary">اصلی</Badge>
      <Badge variant="success">موفق</Badge>
      <Badge variant="warning">هشدار</Badge>
      <Badge variant="danger">خطر</Badge>
      <Badge variant="outline">خطی</Badge>
    </div>
    <div className="p-10 flex flex-col gap-6 max-w-sm">
      <InputField
        label="نام و نام خانوادگی"
        id="full-name"
        placeholder="مثلاً: علی محمدی"
      />
      

      <InputField
        label="ایمیل"
        id="email"
        type="email"
        placeholder="example@mail.com"
        errorMessage={emailError}
      />
      
      <InputField
        placeholder="جستجو..."
      />

      <InputField
        label="نام و نام خانوادگی"
        id="full-name"
        placeholder="مثلاً: علی محمدی"
        value="سالار خواجه ارزانی"
        disabled
      />
    </div>
    </>
  )
}

export default App
