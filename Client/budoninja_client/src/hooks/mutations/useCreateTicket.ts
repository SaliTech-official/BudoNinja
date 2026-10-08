/**
 * Hook برای ارسال تیکت (فرم تماس با ما)
 */

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inboxService } from "../../services/inbox.service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import type { CreateTicketPayload } from "../../types/inbox";

interface UseCreateTicketOptions {
  onSuccess?: () => void;
}

export function useCreateTicket(options?: UseCreateTicketOptions) {
  return useMutation({
    mutationFn: (payload: CreateTicketPayload) =>
      inboxService.createTicket(payload),
    onSuccess: () => {
      toast.success("پیام شما با موفقیت ارسال شد");
      options?.onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
