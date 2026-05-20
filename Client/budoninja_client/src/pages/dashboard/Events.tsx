import { FilterGroup } from "../../components/UI/FilterGroup"
import EventCard from "../../components/cards/EventCard"

export default function Events() {
  return (
    <div className="flex flex-col gap-8">
        <FilterGroup
            options={[
                { id: "all", label: "همه" },
                { id: "open", label: "ثبت نام باز" },
                { id: "closed", label: "پایان یافته" },
                { id: "country", label: "کشوری" },
                { id: "province", label: "استانی" },
            ]}
            defaultValue="all"
            onChange={(value) => console.log(value)}
        />
        <div className="flex flex-col gap-6">
          <EventCard
            day={20}
            month="آبان"
            title="مسابقات قهرمانی کشور"
            location="تهران، مجموعه ورزشی آزادی"
            tags={["کشوری", "آقایان"]}
            status="open"
            deadline="30 آبان"
            href="/dashboard/events/1"
          />
          <EventCard
            day={20}
            month="آبان"
            title="مسابقات قهرمانی کشور"
            location="تهران، مجموعه ورزشی آزادی"
            tags={["کشوری", "آقایان"]}
            status="open"
            deadline="30 آبان"
            href="/events/1"
          />
          <EventCard
            day={20}
            month="آبان"
            title="مسابقات قهرمانی کشور"
            location="تهران، مجموعه ورزشی آزادی"
            tags={["کشوری", "آقایان"]}
            status="open"
            deadline="30 آبان"
            href="/events/1"
          />
          <EventCard
            day={20}
            month="آبان"
            title="مسابقات قهرمانی کشور"
            location="تهران، مجموعه ورزشی آزادی"
            tags={["کشوری", "آقایان"]}
            status="open"
            deadline="30 آبان"
            href="/events/1"
          />

        </div>
    </div>
  )
}
