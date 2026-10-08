import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Award, MapPin } from "lucide-react";
import { Button } from "../UI/Button";
import { Avatar } from "../UI/Avatar";

export interface InstructorProfile {
  name: string;
  rank: string;
  city: string;
  phone?: string;
  avatarUrl?: string;
}

interface InstructorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructor: InstructorProfile | null;
}

export function InstructorProfileModal({
  isOpen,
  onClose,
  instructor,
}: InstructorProfileModalProps) {
  if (!instructor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl">
              {/* Header با گرادیانت */}
              <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 h-24 rounded-t-2xl">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-2 left-2 text-white hover:bg-white/20 rounded-full"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Avatar - absolute positioning روی header */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
                  <div className="rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                    {instructor.avatarUrl ? (
                      <img
                        src={instructor.avatarUrl}
                        alt={instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <Avatar
                        name={instructor.name}
                        size="lg"
                        className="!w-24 !h-24 !text-2xl"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Avatar (overlap با header) */}
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                    {instructor.avatarUrl ? (
                      <img
                        src={instructor.avatarUrl}
                        alt={instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <Avatar
                        name={instructor.name}
                        size="lg"
                        className="!w-24 !h-24 !text-2xl"
                      />
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-center text-2xl font-bold text-neutral-900 mb-6">
                  {instructor.name}
                </h3>

                {/* Info Items */}
                <div className="space-y-4">
                  {/* Rank */}
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-500">سطح</p>
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {instructor.rank}
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-500">شهر</p>
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {instructor.city}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  {instructor.phone && (
                    <a
                      href={`tel:${instructor.phone}`}
                      className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-neutral-500">شماره تماس</p>
                        <p
                          className="text-sm font-semibold text-neutral-900 truncate"
                          dir="ltr"
                        >
                          {instructor.phone}
                        </p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Close Button */}
                <div className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={onClose}
                  >
                    بستن
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
