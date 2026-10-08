/**
 * گرفتن مربی‌های یک استان (با ID)
 */

import { useQuery } from "@tanstack/react-query";
import { teacherService } from "../../services/teacher.service";
import type { Teacher } from "../../types/teacher";

export const TEACHERS_QUERY_KEY = (provinceId: number | null | undefined) =>
  ["teachers", "byProvince", provinceId ?? "none"] as const;

export function useTeachers(provinceId: number | null | undefined) {
  return useQuery<Teacher[]>({
    queryKey: TEACHERS_QUERY_KEY(provinceId),
    queryFn: () => teacherService.getList({ province: provinceId! }),
    enabled: !!provinceId, // فقط وقتی provinceId داریم
    staleTime: 10 * 60 * 1000, // 10 دقیقه
  });
}
