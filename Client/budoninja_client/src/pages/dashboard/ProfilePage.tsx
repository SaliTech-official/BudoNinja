import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';

export function ProfilePage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
        <ProfileSidebar />
        <Outlet />
    </div>
  );
}