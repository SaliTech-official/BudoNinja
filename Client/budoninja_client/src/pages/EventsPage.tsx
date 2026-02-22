import { FilterTabs } from '../components/Public/Events/FiltersTab';
import { EventCard } from '../components/cards/EventCard';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';

const eventsData = [
  { id: 1, title: "مسابقات قهرمانی کشور (آقایان)", location: "تهران، سالن آزادی", status: "open", date: "۲۰ آبان" },
  { id: 2, title: "مسابقات استانی نونهالان (بانوان)", location: "اصفهان، ورزشگاه تختی", status: "open", date: "۲۵ آبان" },
  { id: 3, title: "دوره داوری درجه ۳", location: "آنلاین", status: "closed", date: "۳۰ آبان" },
];

export function EventsPage() {
  return (
    <>
      <div className="bg-neutral-100 flex flex-col items-center"> {/* پس‌زمینه طوسی روشن برای کل صفحه */}
        <div className="w-full lg:w-250 px-6 md:px-8 py-16">
          {/* فیلترها */}
          <div className="mb-8">
            <FilterTabs itemCount={eventsData.length} />
          </div>

          {/* لیست کارت‌ها */}
          <div className="flex flex-col gap-6">
            {eventsData.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                location={event.location}
                // ... بقیه پراپ‌ها
              />
            ))}
          </div>

          {/* اینجا هم می‌تونه دکمه Load More بیاد */}
        <Button 
          variant="outline" 
          className="w-full mt-16 px-12 border-neutral-300 text-neutral-600 hover:bg-neutral-900/25 active:bg-neutral-900/35"
        >
          مشاهده بیشتر...
        </Button>
        </div>
      </div>
    </>
  );
}