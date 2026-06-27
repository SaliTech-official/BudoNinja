const ENDPOINTS = {
    // ── Auth ────────────────────────────────────
    auth: {
      login: "/accounts/login/",
      register: "/accounts/register/",
      verifyOtp: "/accounts/verify-otp/",
      sendOtp: "/accounts/send-otp/",
      refreshToken: "/accounts/token/refresh/",
      changePassword: "/accounts/change-password/",
    },
  
    // ── Profile ─────────────────────────────────
    profile: {
      me: "/accounts/profile/",
      update: "/accounts/profile/update/",
      uploadDocument: "/accounts/profile/upload-document/",
    },
  
    // ── Membership ──────────────────────────────
    membership: {
      status: "/accounts/membership/",
      renew: "/accounts/membership/renew/",
    },
  
    // ── Courses ─────────────────────────────────
    courses: {
      list: "/courses/",
      detail: (id: number | string) => `/courses/${id}/`,
      enroll: (id: number | string) => `/courses/${id}/enroll/`,
      categories: "/courses/categories/",
    },
  
    // ── News ────────────────────────────────────
    news: {
      list: "/news/",
      detail: (id: number | string) => `/news/${id}/`,
      categories: "/news/categories/",
    },
  
    // ── Events (Chalenge) ──────────────────────
    events: {
      list: "/chalenge/",
      detail: (id: number | string) => `/chalenge/${id}/`,
      participate: (id: number | string) => `/chalenge/${id}/participate/`,
    },
  
    // ── Chat ────────────────────────────────────
    chat: {
      conversations: "/chat/",
      messages: (chatId: number | string) => `/chat/${chatId}/messages/`,
      sendMessage: (chatId: number | string) => `/chat/${chatId}/messages/`,
      createChat: "/chat/create/",
      forwardMessage: "/chat/forward/",
      deleteMessage: (messageId: number | string) => `/chat/messages/${messageId}/`,
    },
  
    // ── Inbox (Tickets) ────────────────────────
    inbox: {
      list: "/inbox/",
      create: "/inbox/create/",
      detail: (id: number | string) => `/inbox/${id}/`,
    },
  
    // ── Agents ──────────────────────────────────
    agents: {
      list: "/agents/",
      detail: (id: number | string) => `/agents/${id}/`,
    },
  
    // ── Data (Provinces/Cities) ─────────────────
    data: {
      provinces: "/data/provinces/",
      cities: (provinceId: number | string) => `/data/provinces/${provinceId}/cities/`,
    },
  } as const;
  
  export default ENDPOINTS;