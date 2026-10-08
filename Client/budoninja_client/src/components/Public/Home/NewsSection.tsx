import { NewsCard } from "../../cards/NewsCard";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useNewsList } from "../../../hooks/queries/useNewsList";
import { formatJalaliDate } from "../../../utils/date";
import { getMediaUrl } from "../../../utils/mediaUrl";
import type { News } from "../../../types/news";

// استخراج excerpt از content
function getExcerpt(content: string, maxLength = 120): string {
  if (!content) return "";
  const plain = content.replace(/<[^>]*>/g, "");
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).trim() + "...";
}

export function NewsSection() {
  // فقط ۳ خبر آخر
  const { data, isLoading, isError } = useNewsList({
    page: 1,
    page_size: 3,
  });

  const news = data?.results ?? [];

  return (
    <section className="bg-bg-secondary py-24">
      <div className="flex flex-col justify-center px-6 md:px-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">
            آخرین اخبار و رویدادها
          </h2>
          <Link
            to="/news"
            className="text-sm font-medium text-primary-400 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
            مشاهده آرشیو اخبار
            <span>&larr;</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-neutral-400">
            خطا در بارگذاری اخبار
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            هنوز خبری منتشر نشده است
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {news.map((item: News) => (
              <NewsCard
                key={item.id}
                imageUrl={getMediaUrl(item.image) ?? ""}
                category={item.category}
                date={formatJalaliDate(item.created_at)}
                title={item.title}
                excerpt={getExcerpt(item.content)}
                link={`/news/${item.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
