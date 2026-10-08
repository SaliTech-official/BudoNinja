/**
 * Service لایه برای teachers (agents)
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type { Teacher, TeacherListParams } from "../types/teacher";

export const teacherService = {
  /**
   * گرفتن مربی‌ها با امکان فیلتر بر اساس province (id) و senior
   */
  getList: async (params?: TeacherListParams): Promise<Teacher[]> => {
    const { data } = await api.get<Teacher[]>(ENDPOINTS.teachers.list, {
      params,
    });
    return data;
  },
};
