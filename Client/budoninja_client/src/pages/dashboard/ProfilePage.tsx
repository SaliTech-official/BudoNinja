import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';

export function ProfilePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <div className="lg:col-span-1">
        <ProfileSidebar />
      </div>
      <div className="lg:col-span-3">
        <Outlet />
      </div>
    </div>
  );
}