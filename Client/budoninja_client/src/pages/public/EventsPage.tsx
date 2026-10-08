import { FilterTabs } from "../../components/Public/Events/FiltersTab";
import EventCard from "../../components/cards/EventCard";
import { Button } from "../../components/UI/Button";
import { useEventList } from "../../hooks/queries/useEventList";
import { useEventFilters } from "../../hooks/useEventFilters";
import {
  extractDayMonth,
  getEventStatus,
  getEventTags,
} from "../../utils/eventHelpers";
import { formatJalaliDate } from "../../utils/date";
import { Loader2 } from "lucide-react";
import type { ChalengeItem } from "../../types/event";

export function EventsPage() {
  const { page, tab, setPage, setTab } = useEventFilters();

  // map کردن tab به open_only param
  const openOnlyParam =
    tab === "open" ? "yes" : tab === "closed" ? "no" : undefined;

  const { data, isLoading, isError, isFetching } = useEventList({
    page,
    open_only: openOnlyParam,
  });

  const filteredResults = data?.results ?? [];

  const totalCount = data?.count ?? 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  return (
    <div className="bg-neutral-100 flex flex-col items-center min-h-[60vh]">
      <div className="w-full lg:w-250 px-6 md:px-8 py-16">
        <div className="mb-8">
          <FilterTabs
            activeTab={tab}
            onTabChange={setTab}
            itemCount={filteredResults.length}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-neutral-500">
            خطا در بارگذاری مسابقات
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            مسابقه‌ای یافت نشد
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredResults.map((event: ChalengeItem) => {
              const { day, month } = extractDayMonth(event.date);
              return (
                <EventCard
                  key={event.id}
                  id={event.id}
                  day={day}
                  month={month}
                  title={event.title}
                  location={event.place}
                  tags={getEventTags(event)}
                  status={getEventStatus(event)}
                  deadline={formatJalaliDate(event.deadline)}
                  linkPrefix="/events"
                />
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {(hasNext || hasPrevious) && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={!hasPrevious || isFetching}
              onClick={() => setPage(page - 1)}
              className="px-8"
            >
              صفحه قبل
            </Button>
            <span className="text-sm text-neutral-600">
              صفحه {page} از {Math.ceil(totalCount / 5)}
            </span>
            <Button
              variant="outline"
              disabled={!hasNext || isFetching}
              onClick={() => setPage(page + 1)}
              className="px-8"
            >
              صفحه بعد
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
