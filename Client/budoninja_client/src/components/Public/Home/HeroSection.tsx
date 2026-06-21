import { Button } from "../../UI/Button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative h-[700px] w-full">
      <div className="absolute inset-0">
        <img
          src="/src/assets/HeroSection.png"
          alt="BudoNinja Martial Arts"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 px-20 flex h-full flex-col items-start justify-center text-center">
        <h1 className="text-3xl font-black md:text-4xl text-neutral-50">
          بنیانگذار سبک نینجوتسو در ایران
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-neutral-200">
          آموزش تخصصی هنرهای رزمی، دفاع شخصی و سلاح‌های سرد زیر نظر برترین اساتید کشور.
        </p>
        
        <div className="mt-8 flex flex-col md:flex-row gap-4 w-full">
          <Button size="lg" variant="primary" className="w-full md:w-fit">
            <Link to='dashboard/events'>ثبت نام در کلاس‌ها</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-neutral-600 text-neutral-200 hover:bg-neutral-50/20 w-full md:w-fit">
            <Link to='events'>اطلاعات بیشتر</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}