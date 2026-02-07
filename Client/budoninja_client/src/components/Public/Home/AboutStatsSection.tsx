import { StatCard } from "../../cards/StatCard";
import { Button } from "../../UI/Button";
import PatternHome from "../../../assets/patterns/PatternHome.png";

export function AboutStatsSection() {
  return (
    <section className="py-16 md:py-24 text-neutral-900" 
    style={{
        backgroundColor: 'var(--color-neutral-50)',
        backgroundImage:  `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${PatternHome})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '600px',
      }}>
      <div className="flex flex-col md:flex-row justify-center items-center gap-20 px-6 md:px-20">
        
        <div className="flex flex-col items-center md:items-start gap-4 max-w-[500px]">
          <span className="text-sm leading-[50px] font-bold text-primary-600">درباره بودونینجا</span>
          <h2 className="text-3xl font-bold text-neutral-900">قدرت، سرعت و تعادل در زندگی</h2>
          <p className="text-base text-center md:text-start text-neutral-500 leading-relaxed">
            سبک نینجوتسو در سال ۱۳۶۹ توسط استاد اکبر فرجی بنیانگذاری شد و هم‌اکنون با هزاران هنرجو و صدها مربی فعال، به عنوان یکی از منسجم‌ترین سازمان‌های رزمی کشور شناخته می‌شود.
          </p>
          <Button variant="outline" className="mt-4 border-primary-600 text-primary-600 hover:bg-primary-50 hover:text-primary-600">
            بیشتر بخوانید  &larr;
          </Button>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-fit">
            <div className="flex gap-4">
                <StatCard value="۱۵۰۰+" label="هنرجوی فعال"/>
                <StatCard value="۲۰۰+" label="مربی رسمی" />
            </div>
            <div className="flex gap-4">
                <StatCard value="۳۰+" label="سال سابقه" />
                <StatCard value="۵۰+" label="باشگاه فعال" />
            </div>
        </div>
        

      </div>
    </section>
  );
}