import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './SideBar.tsx';
import { Topbar } from './TopBar.tsx'

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-neutral-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}