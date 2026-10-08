/**
 * Service لایه برای inbox (tickets)
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type { CreateTicketPayload, CreateTicketResponse } from "../types/inbox";

export const inboxService = {
  /**
   * ایجاد تیکت جدید (فرم تماس با ما)
   */
  createTicket: async (
    payload: CreateTicketPayload
  ): Promise<CreateTicketResponse> => {
    const { data } = await api.post<CreateTicketResponse>(
      ENDPOINTS.inbox.create,
      payload
    );
    return data;
  },
};
