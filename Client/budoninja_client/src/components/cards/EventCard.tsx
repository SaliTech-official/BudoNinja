import { MapPin } from "lucide-react";
import { Button } from "../UI/Button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

type EventStatus = "open" | "closing" | "closed";

interface EventCardProps {
  id: number | string;
  day: number | string;
  month: string;
  title: string;
  location: string;
  tags?: string[];
  status: EventStatus;
  deadline?: string;
  buttonText?: string;
  linkPrefix?: string; // '/events' یا '/dashboard/my-events'
  className?: string;
}

const statusConfig = {
  open: {
    label: "ثبت نام باز است",
    className: "bg-green-200 text-green-700",
  },
  closing: {
    label: "ظرفیت محدود",
    className: "bg-orange-200 text-orange-700",
  },
  closed: {
    label: "ثبت نام بسته است",
    className: "bg-neutral-200 text-neutral-600",
  },
};

export default function EventCard({
  id,
  day,
  month,
  title,
  location,
  tags = [],
  status,
  deadline,
  buttonText = "ثبت نام و جزییات",
  linkPrefix = "/events",
  className,
}: EventCardProps) {
  const statusData = statusConfig[status];

  return (
    <Link to={`${linkPrefix}/${id}`} className="block">
      <div
        className={cn(
          "w-full rounded-[24px] border border-neutral-200 bg-neutral-50 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)] cursor-pointer transition hover:shadow-lg",
          className
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Right */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[12px] bg-primary-100">
              <span className="text-2xl font-bold text-primary-600 leading-none">
                {day}
              </span>
              <span className="mt-1 text-sm font-medium text-primary-700 leading-none">
                {month}
              </span>
            </div>

            <div className="mt-4 flex w-full flex-col md:mt-0 md:gap-6">
              <h3 className="text-right text-xl font-bold text-neutral-900 md:hidden">
                {title}
              </h3>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 md:mt-0 justify-start">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-base bg-secondary-100 px-2 py-1 text-xs font-medium text-secondary-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="mt-6 hidden text-xl font-bold text-neutral-900 md:mt-0 md:block">
                {title}
              </h3>

              <div className="mt-3 flex items-center gap-1.5 md:mt-0 justify-start">
                <MapPin className="h-5 w-5 text-neutral-500" />
                <span className="text-sm text-neutral-500">{location}</span>
              </div>
            </div>
          </div>

          {/* Left */}
          <div className="mt-4 flex flex-col w-full md:w-fit items-start md:items-end md:mt-0 md:min-w-[170px] md:gap-3">
            <span
              className={cn(
                "rounded-[2px] px-2 py-[2px] text-xs font-medium",
                statusData.className
              )}
            >
              {statusData.label}
            </span>

            <div className="mt-4 md:mt-0 w-full md:w-fit">
              <Button
                size="sm"
                disabled={status === "closed"}
                className="w-full whitespace-nowrap md:w-auto"
              >
                {buttonText}
              </Button>
            </div>

            {deadline && (
              <span className="mt-2 text-xs text-primary-500 md:mt-0 w-full text-center md:text-end">
                مهلت: {deadline}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
