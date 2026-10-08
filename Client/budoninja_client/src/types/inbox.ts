/**
 * تایپ‌های مربوط به inbox (tickets)
 */

export interface CreateTicketPayload {
  full_name: string;
  title: string;
  phone_number: string;
  content: string;
}

export interface Ticket {
  full_name: string;
  title: string;
  phone_number: string;
  content: string;
}

export interface CreateTicketResponse {
  message: string;
  data: Ticket;
}
