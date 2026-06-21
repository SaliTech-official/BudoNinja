import { Button } from "../../UI/Button";
import PatternHome from "../../../assets/patterns/PatternHome.png";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="relative flex justify-center items-center overflow-hidden py-24 h-100">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-600"></div>
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${PatternHome})`,
          backgroundSize: '300px',
        }}
      ></div>

      <div className="relative flex flex-col gap-8 px-6 py-16">
        
        <h2 className="text-3xl lg:text-4xl text-neutral-50">
          مسیر قهرمانی از اینجا شروع می‌شود
        </h2>
        
        <p className="max-w-2xl text-lg text-center text-neutral-100">
        حالا عضو خانواده بزرگ نینجوتسو شوید و از خدمات آنلاین فدراسیون استفاده کنید.
        </p>

        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Button size="lg" className="bg-neutral-50 text-primary-600 hover:bg-neutral-200">
            <Link to="/register">ثبت نام آنلاین</Link>
          </Button>

          <Button size="lg" variant="outline" className="border-neutral-200 text-neutral-200 hover:bg-neutral-50/30">
            <Link to="/contact">تماس با پشتیبانی</Link>
          </Button>
        </div>
        
      </div>
    </section>
  );
}