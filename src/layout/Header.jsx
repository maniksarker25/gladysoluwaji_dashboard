import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import { LuMenu, LuChevronDown, LuUser, LuKeyRound, LuLogOut, LuCalendar } from 'react-icons/lu';
import { useGetProfileQuery } from '../RTK/profile/profileApi';
import { getImageUrl } from '../utils/imageUrl';
import { getRouteMeta } from './sidebarData';
import useLogout from './useLogout';

const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('') || 'A';

const AppHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useLogout();
  const { data: profileData } = useGetProfileQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const user = profileData?.data || {};
  const [imageError, setImageError] = useState(false);

  const rawImage = user?.profileImage;
  const hasValidImage =
    rawImage && typeof rawImage === 'string' && rawImage.trim() !== '' && !rawImage.includes('placehold.net') && !imageError;
  const profileImageUrl = hasValidImage ? getImageUrl(rawImage) : null;

  const { section, title } = getRouteMeta(pathname);
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const menuItems = [
    {
      key: 'info',
      disabled: true,
      label: (
        <div className="px-1 py-1 min-w-[200px]">
          <p className="font-semibold text-slate-900 truncate">{user?.name || 'Admin'}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
        </div>
      ),
    },
    { type: 'divider' },
    { key: '/profile', icon: <LuUser />, label: 'My profile' },
    { key: '/change-password', icon: <LuKeyRound />, label: 'Change password' },
    { type: 'divider' },
    { key: 'logout', icon: <LuLogOut />, label: 'Log out', danger: true },
  ];

  const onMenuSelect = ({ key }) => {
    if (key === 'logout') logout();
    else navigate(key);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"
            aria-label="Open menu"
          >
            <LuMenu size={18} />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{section}</p>
            <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-600 md:flex">
            <LuCalendar className="text-brand-600" />
            {today}
          </div>

          <Dropdown
            menu={{ items: menuItems, onClick: onMenuSelect }}
            trigger={['click']}
            placement="bottomRight"
          >
            <button
              type="button"
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent py-1.5 pl-1.5 pr-2 transition-colors hover:border-slate-200 hover:bg-white"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={user?.name || 'Profile'}
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm">
                  {initialsOf(user?.name)}
                </span>
              )}
              <span className="hidden text-left sm:block">
                <span className="block max-w-[160px] truncate text-sm font-semibold leading-tight text-slate-900">
                  {user?.name || 'Admin'}
                </span>
                <span className="block text-xs capitalize text-slate-500">
                  {(user?.role || 'Administrator').toString().replace(/_/g, ' ').toLowerCase()}
                </span>
              </span>
              <LuChevronDown className="hidden text-slate-400 sm:block" />
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
