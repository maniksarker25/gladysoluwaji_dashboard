import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './Header';

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = useCallback(() => setMobileOpen(false), []);
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FA]">
      <Sidebar mobileOpen={mobileOpen} onClose={closeMenu} />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="app-main flex-1 overflow-x-hidden overflow-y-auto">
          <AppHeader onMenuClick={() => setMobileOpen(true)} />
          <div key={pathname} className="page-enter mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
