import { Button } from "./components/UI/Button.tsx"

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
    </>
  )
}

export default App
