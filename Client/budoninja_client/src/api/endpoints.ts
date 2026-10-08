const API_PREFIX = "/accounts/api/v1";
const DATA_PREFIX = "/data/api/v1";

const ENDPOINTS = {
  // ── Auth ──────────────────────────────────────────
  auth: {
    login: `${API_PREFIX}/user_login/`,
    logout: `${API_PREFIX}/user_logout/`,
    register: `${API_PREFIX}/user_register/`,
    verify: `${API_PREFIX}/user_verify/`,
    refreshToken: `${API_PREFIX}/token/refresh/`,
    changePassword: `${API_PREFIX}/user_change_password/`,
    resetPassword: `${API_PREFIX}/user_reset_password/`,
    resetPasswordConfirm: `${API_PREFIX}/user_reset_password_confirm/`,
    setNewPassword: `${API_PREFIX}/user_set_new_password/`,
  },

  // ── Profile ───────────────────────────────────────
  profile: {
    me: `${API_PREFIX}/user_profile/`,
    dashboard: `${API_PREFIX}/user_dashboard/`,
    membership: `${API_PREFIX}/user_membership/`,
  },

  // ── Data (Provinces / Cities) ─────────────────────
  data: {
    provinces: `${DATA_PREFIX}/get_provinces/`,
    cities: `${DATA_PREFIX}/get_cities/`,
  },

  // ── News ────────────────────────────────────
  news: {
    list: "/news/api/v1/get_news/",
    detail: (id: number | string) => `/news/api/v1/get_news_detail/${id}/`,
    categories: "/news/api/v1/get_categories/",
  },

  // ── Events (Chalenge) ───────────────────────
  events: {
    list: "/chalenge/api/v1/get_chalenges/",
    detail: (id: number | string) => `/chalenge/api/v1/get_chalenge/${id}/`,
    // ⏳ Endpointهای زیر بعداً وقتی backend اضافه شد فعال می‌شن
    // register: (id: number | string) => `/chalenge/api/v1/register/${id}/`,
    // myList: '/chalenge/api/v1/my_chalenges/',
  },

  // ── Teachers (Agents) ───────────────────────
  teachers: {
    list: "/agents/api/v1/get_teachers/",
  },

  // ── Inbox (Tickets) ────────────────────────
  inbox: {
    create: "/inbox/api/v1/create_ticket/",
  },
} as const;

export default ENDPOINTS;
