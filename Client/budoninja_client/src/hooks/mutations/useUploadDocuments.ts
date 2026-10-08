/**
 * آپلود مدارک با multipart/form-data
 * پشتیبانی از چند فایل همزمان
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { profileService } from "../../services/profile.service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { PROFILE_QUERY_KEY } from "../queries/useProfile";

export type DocumentField =
  | "personal_photo"
  | "id_card_image"
  | "birth_certificate_image"
  | "sport_insurance_image";

export interface DocumentUploadPayload {
  personal_photo?: File | null;
  id_card_image?: File | null;
  birth_certificate_image?: File | null;
  sport_insurance_image?: File | null;
}

export function useUploadDocuments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files: DocumentUploadPayload) => {
      const formData = new FormData();

      let hasAnyField = false;
      (Object.keys(files) as DocumentField[]).forEach((key) => {
        const value = files[key];
        if (value instanceof File) {
          // فایل جدید
          formData.append(key, value);
          hasAnyField = true;
        } else if (value === null) {
          // درخواست حذف - string خالی می‌فرستیم
          // ⚠️ ممکنه backend این رو قبول نکنه؛ اگه نکرد، به همکارت بگو
          formData.append(key, "");
          hasAnyField = true;
        }
      });

      if (!hasAnyField) {
        return Promise.reject(new Error("هیچ تغییری وجود ندارد"));
      }

      return profileService.updateProfile(formData);
    },
    onSuccess: () => {
      toast.success("مدارک با موفقیت بارگذاری شد");
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
