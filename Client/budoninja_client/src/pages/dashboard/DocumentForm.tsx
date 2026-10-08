import { useState } from "react";
import { Button } from "../../components/UI/Button";
import FileUpload from "../../components/UI/FileUpload";
import { Info } from "lucide-react";
import { useProfile } from "../../hooks/queries/useProfile";
import {
  useUploadDocuments,
  type DocumentField,
} from "../../hooks/mutations/useUploadDocuments";
import { getMediaUrl } from "../../utils/mediaUrl";

interface DocumentFieldConfig {
  key: DocumentField;
  label: string;
  previewTitle: string;
}

const DOCUMENT_FIELDS: DocumentFieldConfig[] = [
  { key: "personal_photo", label: "عکس پرسنلی", previewTitle: "عکس پرسنلی" },
  { key: "id_card_image", label: "تصویر کارت ملی", previewTitle: "کارت ملی" },
  {
    key: "birth_certificate_image",
    label: "تصویر شناسنامه",
    previewTitle: "شناسنامه",
  },
  {
    key: "sport_insurance_image",
    label: "بیمه ورزشی",
    previewTitle: "بیمه ورزشی",
  },
];

type FileState = Record<DocumentField, File | null>;
type RemovedState = Record<DocumentField, boolean>;

const emptyFileState: FileState = {
  personal_photo: null,
  id_card_image: null,
  birth_certificate_image: null,
  sport_insurance_image: null,
};

const emptyRemovedState: RemovedState = {
  personal_photo: false,
  id_card_image: false,
  birth_certificate_image: false,
  sport_insurance_image: false,
};

export default function DocumentForm() {
  const { data: profile, isLoading } = useProfile();
  const uploadMutation = useUploadDocuments();

  // فایل‌های جدید انتخاب شده
  const [files, setFiles] = useState<FileState>(emptyFileState);

  // فایل‌های قدیمی که کاربر می‌خواد حذف کنه
  const [removed, setRemoved] = useState<RemovedState>(emptyRemovedState);

  const handleFileChange = (key: DocumentField, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
    // اگه کاربر فایل جدید انتخاب کرد، فرض کن نمی‌خواد قبلی حذف بشه
    if (file) {
      setRemoved((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleRemoveExisting = (key: DocumentField) => {
    setRemoved((prev) => ({ ...prev, [key]: true }));
    setFiles((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = () => {
    const payload: Partial<Record<DocumentField, File | null>> = {};
    let hasAny = false;

    (Object.keys(files) as DocumentField[]).forEach((key) => {
      // اگه فایل جدید انتخاب شده
      if (files[key] !== null) {
        payload[key] = files[key];
        hasAny = true;
      }
      // اگه کاربر خواسته فایل قبلی رو حذف کنه (بدون جایگزینی)
      else if (removed[key]) {
        payload[key] = null;
        hasAny = true;
      }
    });

    if (!hasAny) return;

    uploadMutation.mutate(payload, {
      onSuccess: () => {
        setFiles(emptyFileState);
        setRemoved(emptyRemovedState);
      },
    });
  };

  const handleCancel = () => {
    setFiles(emptyFileState);
    setRemoved(emptyRemovedState);
  };

  // آیا تغییری وجود داره؟
  const hasChanges =
    Object.values(files).some((f) => f !== null) ||
    Object.values(removed).some((r) => r);

  const isSubmitting = uploadMutation.isPending;

  if (isLoading || !profile) {
    return (
      <div className="bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px] animate-pulse">
        <div className="h-96" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 w-full p-8 shadow-[0_4px_20px_2px_rgba(0,0,0,0.06)] rounded-[16px]">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-xl text-neutral-900 leading-7">
            بارگذاری مدارک هویتی
          </h2>
          <div className="w-full h-px bg-neutral-200"></div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-primary-50 border border-primary-200 rounded-md text-sm text-primary-700">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <span>
            فرمت‌های مجاز: JPG، PNG و PDF (حداکثر ۵ مگابایت). می‌توانید روی
            آیکون چشم کلیک کنید تا فایل را مشاهده کنید.
          </span>
        </div>

        {DOCUMENT_FIELDS.map((field) => {
          const existingUrl = removed[field.key]
            ? null
            : getMediaUrl(profile[field.key] as string | null | undefined);
          return (
            <div key={field.key} className="flex flex-col gap-2">
              <label className="text-base text-neutral-600 font-semibold">
                {field.label}
              </label>
              <FileUpload
                value={files[field.key]}
                existingImageUrl={existingUrl}
                onChange={(file) => handleFileChange(field.key, file)}
                onRemoveExisting={() => handleRemoveExisting(field.key)}
                previewTitle={field.previewTitle}
                disabled={isSubmitting}
              />
            </div>
          );
        })}

        <div className="flex flex-col gap-6">
          <div className="w-full h-px bg-neutral-200"></div>
          <div className="flex justify-end gap-4">
            <Button
              size="lg"
              variant="ghost"
              className="hover:bg-primary-100 hover:text-primary-600"
              onClick={handleCancel}
              disabled={!hasChanges || isSubmitting}
            >
              انصراف
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!hasChanges || isSubmitting}
            >
              {isSubmitting ? "در حال بارگذاری..." : "ذخیره مدارک"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
