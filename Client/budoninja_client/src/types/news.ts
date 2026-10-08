/**
 * تایپ‌های مربوط به News
 */

// دسته‌بندی
export interface Category {
  id: number;
  name: string;
}

// یک خبر
export interface News {
  id: number;
  category: string; // CustomCategoryField فقط name رو می‌ده
  author: string;
  title: string;
  image: string | null;
  content: string;
  created_at: string;
}

// Response لیست خبرها
export interface NewsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[];
}

// Response detail
export interface NewsDetailResponse {
  data: News;
}

// پارامترهای query
export interface NewsListParams {
  page?: number;
  page_size?: number;
  search?: string; // ✅ الان واقعاً search هست
  category?: string; // ✅ فیلتر بر اساس category name
}
