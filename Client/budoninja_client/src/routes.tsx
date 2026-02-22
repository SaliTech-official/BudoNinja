import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import HomePage from './pages/HomePage';
import NewsArchivePage from './pages/NewsArchivePage';
import { SinglePostPage } from './pages/SinglePostPage';
import { EventsPage } from './pages/EventsPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/news',
        element: <NewsArchivePage />
      },
      {
        path: '/news/:slug',
        element: <SinglePostPage />
      },
      {
        path: '/events',
        element: <EventsPage />
      },
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