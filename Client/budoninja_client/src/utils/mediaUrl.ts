/**
 * تبدیل مسیر relative عکس backend به URL کامل
 * مثال: "/media/profile_images/abc.jpg" → "http://127.0.0.1:8000/media/profile_images/abc.jpg"
 */

export function getMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  // اگه از قبل full URL هست
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    console.warn("VITE_API_BASE_URL is not defined");
    return path;
  }

  // مطمئن شو path با / شروع میشه
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
