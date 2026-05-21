import { User, Clock, Users } from "lucide-react";
import { Button } from "../UI/Button";

type CourseCardProps = {
  title: string;
  coach: string;
  time: number;
  capacity: number;
};

export default function CourseCard({
  title,
  coach,
  time,
  capacity
}: CourseCardProps) {

  return (
    <div className="w-full flex flex-col items-center bg-neutral-50 rounded-[16px] shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)]">
      <div className="w-full h-50 bg-neutral-400 rounded-t-[16px]" />

        <div className="flex flex-col w-full items-start gap-4 p-5">
            <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-xl font-bold">{title}</h3>
                <div className="flex gap-2 text-neutral-600 items-center">
                    <User size={24}/>
                    <p className="text-sm font-semibold">{coach}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <p className="text-xs font-semibold text-neutral-500">{time} ساعت</p>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-neutral-500" />
                    <p className="text-xs font-semibold text-neutral-500">ظرفیت: {capacity} نفر</p>
                </div>
            </div>
        </div>
        <div className="w-full h-px bg-neutral-200" />
        <div className="w-full px-5 py-3">
          <Button size="lg" className="w-full">مشاهده و ثبت نام</Button>
        </div>
    </div>
  );
}
