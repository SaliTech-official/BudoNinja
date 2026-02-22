import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import { MapPin } from "lucide-react";

// ... (Props interface)

export function EventCard({ ...props }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      
      {/* ستون ۱: تاریخ */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-primary-100 text-primary-600">
        <span className="text-3xl font-bold">۲۰</span>
        <span className="text-sm">آبان</span>
      </div>

      {/* ستون ۲: اطلاعات */}
      <div className="flex-1 w-full text-center md:text-right flex flex-col gap-4">
        <div className="flex justify-center md:justify-start gap-2 order-2 md:order-1">
          <Badge variant="default" className="bg-secondary-100 text-secondary-600">آقایان</Badge>
          <Badge variant="default" className="bg-neutral-200 text-neutral-500">استانی</Badge>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 order-1 md:order-2">{props.title}</h3>
        <div className="flex justify-center md:justify-start items-center gap-2 text-sm text-neutral-500 order-3">
          <MapPin size={20} />
          <span>{props.location}</span>
        </div>
      </div>

      {/* ستون ۳: اکشن */}
      <div className="flex flex-col items-center md:items-end md:gap-3 w-full md:w-auto">
        <Badge variant="success">ثبت نام باز است</Badge>
        <p className="text-xs text-center w-full md:w-fit text-primary-600 mt-1 order-2 md:order-1">مهلت: تا ۲۵ آبان</p>
        <Button className="w-full md:w-auto order-1 md:order-2 mb-2 mt-4 md:my-0">ثبت نام و جزییات</Button>
      </div>
    </div>
  );
}