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
import { ProfilePage } from './pages/dashboard/ProfilePage';
import PersonalInfoForm from './pages/dashboard/PersonalInfoForm';
import DocumentForm from './pages/dashboard/DocumentForm';
import ContactForm from './pages/dashboard/ContactForm';
import SecurityForm from './pages/dashboard/SecurityForm';
import Certificates from './pages/dashboard/Certificates';
import CertificateRequest from './pages/dashboard/CertificateRequest';
import Events from './pages/dashboard/Events';
import EventDetailPage from './pages/dashboard/EventDetailPage';
import CoursesPage from './pages/dashboard/CoursesPage';
import CourseDetailPage from './pages/dashboard/CourseDetailPage';
import MessagesPage from './features/messages/pages/MessagePage';
import MembershipRenewal from './pages/dashboard/MembershipRenewal';

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
      {
         path: 'profile',
         element: <ProfilePage />,
         children: [
          {index: true, element: <PersonalInfoForm />},
          {path: 'documents', element: <DocumentForm />},
          {path: 'contact', element: <ContactForm />},
          {path: 'security', element: <SecurityForm />},
         ]
        },
        {
          path: 'certificates',
          element: <Certificates />,
        },
        {
          path: 'certificates/request',
          element: <CertificateRequest />,
        },
        {
          path: 'events',
          element: <Events />,
        },
        {
          path: 'events/:eventId',
          element: <EventDetailPage />,
        },
        {
          path: 'courses',
          element: <CoursesPage />,
        },
        {
          path: 'courses/:courseId',
          element: <CourseDetailPage />,
        },
        {
          path: 'messages',
          element: <MessagesPage />,
        },
        {
          path: 'membership/renew',
          element: <MembershipRenewal />,
        }
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