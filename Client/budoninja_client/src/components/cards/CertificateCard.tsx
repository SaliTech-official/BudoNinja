import { Calendar, Download } from "lucide-react";
import { Button } from "../UI/Button";

type CertificateCardProps = {
  title: string;
  code: string;
  date: {
    year: string;
    month: string;
    day: string;
  };
};

export default function CertificateCard({
  title,
  code,
  date,
}: CertificateCardProps) {
  const formattedDate = `${date.year}/${date.month}/${date.day}`;

  return (
    <div className="w-full flex flex-col items-center bg-neutral-50 rounded-[16px] shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)]">
      <div className="w-full h-50 bg-neutral-400 rounded-t-[16px]" />

        <div className="flex flex-col w-full items-start gap-4 p-5">
            <div className="flex flex-col gap-1">
                <h3 className="text-neutral-900 text-xl font-bold">{title}</h3>
                <p className="text-neutral-400 text-xs">No: {code}</p>
            </div>

            <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <p className="text-sm text-neutral-500">{formattedDate}</p>
            </div>
        </div>
        <div className="w-full h-px bg-neutral-200" />

        <div className="w-full px-5 py-3">
          <Button variant="outline" size="lg" className="w-full gap-2"><Download className="h-5 w-5"/><span>مشاهده و دانلود </span></Button>
        </div>

    </div>
  );
}
