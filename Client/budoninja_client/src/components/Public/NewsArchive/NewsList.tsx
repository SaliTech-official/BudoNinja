import { NewsCard } from "../../cards/NewsCard";
import { Button } from "../../UI/Button";
import { useNewsList } from "../../../hooks/queries/useNewsList";
import { useNewsFilters } from "../../../hooks/useNewsFilters";
import { formatJalaliDate } from "../../../utils/date";
import { getMediaUrl } from "../../../utils/mediaUrl";
import { Loader2 } from "lucide-react";
import type { News } from "../../../types/news";

// استخراج excerpt از content (اولین ۱۵۰ کاراکتر)
function getExcerpt(content: string, maxLength = 150): string {
  if (!content) return "";
  // حذف تگ‌های HTML اگه هست
  const plain = content.replace(/<[^>]*>/g, "");
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).trim() + "...";
}

export function NewsList() {
  const { page, category, search, setPage } = useNewsFilters();

  const { data, isLoading, isError, isFetching } = useNewsList({
    page,
    search: search || undefined,
    category: category || undefined,
  });

  // Loading state (اولین بار)
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-neutral-500">خطا در بارگذاری اخبار</p>
      </div>
    );
  }

  const results = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  // Empty state
  if (results.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-neutral-500">
          {category || search
            ? "هیچ خبری با این فیلترها یافت نشد"
            : "هنوز خبری منتشر نشده است"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8">
        {results.map((news: News) => (
          <NewsCard
            className="max-w-full xl:max-w-[48%] w-full"
            key={news.id}
            imageUrl={getMediaUrl(news.image) ?? ""}
            category={news.category}
            date={formatJalaliDate(news.created_at)}
            title={news.title}
            excerpt={getExcerpt(news.content)}
            link={`/news/${news.id}`}
          />
        ))}
      </div>

      {/* Pagination */}
      {(hasNext || hasPrevious) && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={!hasPrevious || isFetching}
            onClick={() => setPage(page - 1)}
            className="px-8"
          >
            صفحه قبل
          </Button>
          <span className="text-sm text-neutral-600">
            صفحه {page} از {Math.ceil(totalCount / 6)}
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
  );
}
