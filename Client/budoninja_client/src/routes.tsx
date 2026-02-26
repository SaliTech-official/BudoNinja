import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import HomePage from './pages/public/HomePage';
import NewsArchivePage from './pages/public/NewsArchivePage';
import { SinglePostPage } from './pages/public/SinglePostPage';
import { EventsPage } from './pages/public/EventsPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardLayout } from './components/layout/DashbordLayout';
import { DashboardHomePage } from './pages/dashboard/DashboardHomePage';

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
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/contact',
        element: <ContactPage />
      },
    ],
  },

  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: 'profile', element: <DashboardHomePage /> },
      // ...
    ]
  },

  // روت‌های احراز هویت (بدون لی‌اوت)
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);