/**
 * پیدا کردن ID یک استان بر اساس اسم فارسیش
 * از cache useProvinces استفاده می‌کنه (بدون API call اضافی)
 */

import type { Province } from "../types/common";
import { useProvinces } from "./queries/useProvinces";

export function useProvinceIdByName(persianName: string | null | undefined): {
  id: number | null;
  isLoading: boolean;
} {
  const { data: provinces, isLoading } = useProvinces();

  if (!persianName) return { id: null, isLoading };

  const found = provinces?.find((p: Province) => p.name === persianName);
  return {
    id: found?.id ?? null,
    isLoading,
  };
}
