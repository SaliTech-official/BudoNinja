import { Button } from "./components/UI/Button.tsx"
import { Badge } from "./components/UI/Badge.tsx"

function App() {

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
    </>
  )
}

export default App
