import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "آیا مطمئن هستید؟",
  description,
  confirmText = "تایید",
  cancelText = "انصراف",
  variant = "warning",
  isLoading = false,
}: ConfirmModalProps) {
  const iconColor = variant === "danger" ? "text-danger-500" : "text-amber-500";
  const iconBg = variant === "danger" ? "bg-danger-50" : "bg-amber-50";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onClose}
            className="fixed inset-0 bg-black/60 z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center`}
                >
                  <AlertTriangle className={`w-8 h-8 ${iconColor}`} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-center text-lg font-bold text-neutral-900 mb-2">
                {title}
              </h3>

              {/* Description */}
              {description && (
                <p className="text-center text-sm text-neutral-600 mb-6">
                  {description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  {cancelText}
                </Button>
                <Button
                  type="button"
                  variant={variant === "danger" ? "primary" : "primary"}
                  className={`flex-1 ${
                    variant === "danger"
                      ? "!bg-danger-600 hover:!bg-danger-700"
                      : ""
                  }`}
                  onClick={onConfirm}
                  disabled={isLoading}
                >
                  {isLoading ? "در حال انجام..." : confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
