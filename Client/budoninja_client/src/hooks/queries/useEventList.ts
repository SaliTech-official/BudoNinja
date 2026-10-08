import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { eventService } from "../../services/event.service";
import type { ChalengeListParams } from "../../types/event";

export const EVENT_LIST_QUERY_KEY = (params?: ChalengeListParams) =>
  ["events", "list", params ?? {}] as const;

export function useEventList(params?: ChalengeListParams) {
  return useQuery({
    queryKey: EVENT_LIST_QUERY_KEY(params),
    queryFn: () => eventService.getList(params),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
