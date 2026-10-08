import { useQuery } from "@tanstack/react-query";
import { eventService } from "../../services/event.service";

export const EVENT_DETAIL_QUERY_KEY = (id: number | string | undefined) =>
  ["events", "detail", id] as const;

export function useEventDetail(id: number | string | undefined) {
  return useQuery({
    queryKey: EVENT_DETAIL_QUERY_KEY(id),
    queryFn: () => eventService.getDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
