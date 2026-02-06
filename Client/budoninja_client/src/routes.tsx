import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import HomePage from './pages/HomePage';
// ... بقیه صفحات رو ایمپورت کن

export const router = createBrowserRouter([
  // روت‌های عمومی
  {
    element: <PublicLayout />, // 👈 لی‌اوت والد
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    //   {
    //     path: '/about',
    //     element: <AboutPage />,
    //   },
      // ... بقیه صفحات عمومی (news, contact, ...)
    ],
  },

  // روت‌های داشبورد (بعداً اضافه میشه)
  {
    // path: '/dashboard',
    // element: <DashboardLayout />,
    // children: [...]
  },

  // روت‌های احراز هویت (بدون لی‌اوت)
  {
    // path: '/login',
    // element: <LoginPage />,
  },
]);