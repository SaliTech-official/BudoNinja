import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "./Button";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null | undefined;
  title?: string;
  isPdf?: boolean;
}

export function ImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  isPdf = false,
}: ImagePreviewModalProps) {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            {title && (
              <div className="absolute -top-12 left-0 right-0 text-center text-white text-sm font-medium">
                {title}
              </div>
            )}

            {/* Content */}
            {isPdf ? (
              <div className="bg-white rounded-2xl p-8 shadow-2xl min-w-[300px] text-center">
                <p className="text-neutral-700 mb-4">
                  فایل PDF قابل پیش‌نمایش نیست
                </p>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button variant="primary" className="gap-2">
                    <Download className="w-4 h-4" />
                    <span>دانلود و مشاهده</span>
                  </Button>
                </a>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={title || "Preview"}
                className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl cursor-default"
              />
            )}

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 rounded-full"
              onClick={onClose}
              aria-label="بستن"
            >
              <X />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
