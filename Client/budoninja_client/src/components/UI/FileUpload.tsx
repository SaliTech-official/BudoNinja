import { useRef, useState, useEffect } from "react";
import {
  CloudUpload,
  File as FileIcon,
  Trash2,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { ImagePreviewModal } from "./ImagePreviewModal";

type FileUploadProps = {
  /** فایل جدیدی که کاربر انتخاب کرده */
  value?: File | null;
  /** URL عکس موجود از backend (اختیاری) */
  existingImageUrl?: string | null;
  /** callback وقتی فایل جدید انتخاب می‌شه یا حذف می‌شه */
  onChange?: (file: File | null) => void;
  /** callback وقتی کاربر می‌خواد فایل قبلی رو هم حذف کنه */
  onRemoveExisting?: () => void;
  /** عنوان برای نمایش در modal preview */
  previewTitle?: string;
  /** آیا disable هست */
  disabled?: boolean;
};

// استخراج اسم فایل از URL
function extractFileName(url: string): string {
  try {
    const clean = url.split("?")[0].split("#")[0];
    const parts = clean.split("/");
    const last = parts[parts.length - 1];
    if (!last) return "فایل قبلی";
    try {
      return decodeURIComponent(last);
    } catch {
      return last;
    }
  } catch {
    return "فایل قبلی";
  }
}

export default function FileUpload({
  value,
  existingImageUrl,
  onChange,
  onRemoveExisting,
  previewTitle,
  disabled = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Preview URL برای فایل جدید
  useEffect(() => {
    if (value && value.type.startsWith("image/")) {
      const url = URL.createObjectURL(value);
      setLocalPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLocalPreviewUrl(null);
    }
  }, [value]);

  const formatSize = (size: number) => (size / 1024 / 1024).toFixed(2) + " MB";

  const validateFile = (f: File) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(f.type)) {
      alert("فقط فایل JPG، PNG یا PDF مجاز است");
      return false;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert("حداکثر حجم فایل ۵ مگابایت است");
      return false;
    }
    return true;
  };

  const handleFile = (f: File) => {
    if (!validateFile(f)) return;
    onChange?.(f);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  // حذف: اگه فایل جدید هست، فقط اون رو حذف کن
  //       اگه فقط فایل قبلی هست، اون رو (با callback جدا) حذف کن
  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = "";

    if (value) {
      // فایل جدید انتخاب شده رو پاک کن
      onChange?.(null);
    } else if (existingImageUrl) {
      // فایل قبلی رو حذف کن (اگه parent این رو ساپورت کنه)
      onRemoveExisting?.();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const openFileDialog = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  // وضعیت
  const hasNewFile = !!value;
  const hasExistingImage = !!existingImageUrl;
  const hasSomething = hasNewFile || hasExistingImage;

  // تشخیص PDF
  const isNewFilePdf = value?.type === "application/pdf";
  const isExistingPdf =
    existingImageUrl?.toLowerCase().includes(".pdf") ?? false;
  const isPdf = hasNewFile ? isNewFilePdf : isExistingPdf;

  // آدرس preview
  const previewUrl = hasNewFile ? localPreviewUrl : existingImageUrl;

  // نام و سایز نمایشی
  let displayName = "";
  let displayInfo = "";

  if (hasNewFile) {
    displayName = value!.name;
    displayInfo = formatSize(value!.size);
  } else if (hasExistingImage) {
    displayName = extractFileName(existingImageUrl!);
    displayInfo = "قبلاً بارگذاری شده";
  }

  return (
    <>
      <div
        className={`w-full rounded-[12px] border-2 transition-all
        ${
          hasSomething
            ? "h-[80px] border-primary-200 px-[10px] py-[12px] flex items-center justify-between"
            : "h-[160px] border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
        }
        ${dragActive && !disabled ? "bg-primary-50 border-primary-500" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        `}
        onClick={(e) => {
          if (hasSomething) return;
          if ((e.target as HTMLElement).closest("button")) return;
          openFileDialog();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />

        {!hasSomething && (
          <>
            <CloudUpload size={32} className="text-primary-600" />
            <p className="text-base text-primary-700">
              برای بارگذاری کلیک کنید
            </p>
            <p className="text-xs text-neutral-400">
              فرمت JPG، PNG یا PDF - حداکثر ۵ مگابایت
            </p>
          </>
        )}

        {hasSomething && (
          <>
            <div className="flex items-center gap-[12px] min-w-0 flex-1">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-primary-100 rounded-full shrink-0">
                {isPdf ? (
                  <FileIcon size={24} className="text-primary-600" />
                ) : (
                  <ImageIcon size={24} className="text-primary-600" />
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm text-primary-700 truncate">
                  {displayName}
                </span>
                <span className="text-xs text-neutral-400">{displayInfo}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {previewUrl && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPreviewOpen(true);
                  }}
                  className="p-2 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer"
                  title="مشاهده"
                  aria-label="مشاهده فایل"
                >
                  <Eye size={20} />
                </button>
              )}

              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="p-2 rounded-lg text-danger-500 hover:bg-danger-50 transition-colors cursor-pointer"
                  title="حذف"
                  aria-label="حذف فایل"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <ImagePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        imageUrl={previewUrl}
        title={previewTitle}
        isPdf={isPdf}
      />
    </>
  );
}
