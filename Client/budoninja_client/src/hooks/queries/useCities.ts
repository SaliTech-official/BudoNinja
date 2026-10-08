import { useQuery } from "@tanstack/react-query";
import { dataService } from "../../services/data.service";
import type { City } from "../../types/common";

export const CITIES_QUERY_KEY = (
  provinceId: number | string | null | undefined
) => ["cities", provinceId] as const;

export function useCities(provinceId: number | string | null | undefined) {
  return useQuery<City[]>({
    queryKey: CITIES_QUERY_KEY(provinceId),
    queryFn: () => dataService.getCities(provinceId!),
    enabled: !!provinceId,
    staleTime: 60 * 60 * 1000,
  });
}
