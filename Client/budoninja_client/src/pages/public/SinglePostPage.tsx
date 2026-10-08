import { Sidebar } from "../../components/Public/NewsArchive/Sidebar";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, User, Folder, Share2, Loader2 } from "lucide-react";
import { Button } from "../../components/UI/Button";
import { useNewsDetail } from "../../hooks/queries/useNewsDetail";
import { formatJalaliDate } from "../../utils/date";
import { getMediaUrl } from "../../utils/mediaUrl";
import toast from "react-hot-toast";

export function SinglePostPage() {
  // param در routes ما `slug` هست ولی backend `id` می‌خواد
  // (بعداً اگه slug ست شد، این عوض می‌شه)
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useNewsDetail(slug);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Error
  if (isError || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-neutral-600">این خبر یافت نشد</p>
        <Link
          to="/news"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          بازگشت به لیست اخبار
        </Link>
      </div>
    );
  }

  const imageUrl = getMediaUrl(post.image);
  const formattedDate = formatJalaliDate(post.created_at);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("لینک خبر کپی شد");
      }
    } catch {
      // کاربر share رو کنسل کرده
    }
  };

  return (
    <div className="bg-white text-neutral-900">
      <div className="px-6 md:px-8 py-16">
        <div className="flex gap-12 max-w-7xl mx-auto items-start">
          <div className="hidden lg:block lg:sticky lg:top-28">
            <Sidebar />
          </div>

          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="text-sm text-neutral-500 mb-8">
              <Link to="/" className="hover:text-primary-600">
                صفحه اصلی
              </Link>
              <span className="mx-2">/</span>
              <Link to="/news" className="hover:text-primary-600">
                اخبار
              </Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-700 font-medium truncate max-w-xs inline-block">
                {post.title}
              </span>
            </nav>

            {/* Image */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-auto rounded-xl object-cover aspect-video shadow-lg"
              />
            )}

            {/* Meta info */}
            <div className="mt-6">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Folder size={16} />
                  <span>{post.category}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-neutral-900 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Content */}
            <div className="article-content prose-lg max-w-none mt-8 whitespace-pre-line leading-relaxed text-neutral-700">
              {post.content}
            </div>

            {/* Footer / Share */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex justify-end items-center gap-6">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleShare}
                  className="bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700"
                  title="اشتراک‌گذاری"
                  aria-label="اشتراک‌گذاری"
                >
                  <Share2 width={24} height={24} />
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
