import { useQuery } from "@tanstack/react-query";
import { dataService } from "../../services/data.service";
import type { Province } from "../../types/common";

export const PROVINCES_QUERY_KEY = ["provinces"] as const;

export function useProvinces() {
  return useQuery<Province[]>({
    queryKey: PROVINCES_QUERY_KEY,
    queryFn: () => dataService.getProvinces(),
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
}
