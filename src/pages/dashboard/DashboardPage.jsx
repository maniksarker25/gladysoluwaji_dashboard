import React from 'react';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import StatisticCard from '../../components/charts/StatisticCard';
import RevenueActivityChart from '../../components/charts/RevenueActivityChart';
import StatusDonutChart from '../../components/charts/StatusDonutChart';
import { LuCalendarCheck2, LuClipboardCheck, LuArrowUpRight, LuRefreshCw, LuWallet } from 'react-icons/lu';
import { PiUsersThreeBold } from 'react-icons/pi';
import { FaUserDoctor } from 'react-icons/fa6';
import { useGetDashboardQuery } from '../../RTK/dashboard/dashboard';
import { useGetProfileQuery } from '../../RTK/profile/profileApi';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const naira = (n) => `₦${Number(n || 0).toLocaleString()}`;

const Panel = ({ title, subtitle, action, children, className = '' }) => (
  <section className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-6 ${className}`}>
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
);

const Chip = ({ children }) => (
  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
    {children}
  </span>
);

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton.Button active block style={{ height: 150, borderRadius: 20 }} />
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton.Button key={i} active block style={{ height: 112, borderRadius: 16 }} />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <Skeleton.Button active block style={{ height: 400, borderRadius: 16 }} />
      </div>
      <Skeleton.Button active block style={{ height: 400, borderRadius: 16 }} />
    </div>
  </div>
);

const DashboardPage = () => {
  const { data: apiResponse, isLoading, error, refetch, isFetching } = useGetDashboardQuery();
  const { data: profileData } = useGetProfileQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const firstName = (profileData?.data?.name || 'Admin').split(' ')[0];

  const overview = apiResponse?.data?.overview || {};
  const revenueActivity = apiResponse?.data?.revenueActivity || {};
  const revenue = apiResponse?.data?.revenue ?? 0;
  const status = apiResponse?.data?.status || {};
  const year = revenueActivity.year || new Date().getFullYear();

  const monthly = Array.isArray(revenueActivity.monthly) ? revenueActivity.monthly : [];
  const currentMonth = new Date().getMonth();
  const thisMonth = monthly[currentMonth] ?? 0;
  const lastMonth = currentMonth > 0 ? monthly[currentMonth - 1] ?? 0 : null;
  const monthChange =
    lastMonth && lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : null;

  if (isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/70 bg-white py-20 text-center shadow-card">
        <p className="text-base font-semibold text-slate-900">Couldn't load dashboard data</p>
        <p className="mt-1 text-sm text-slate-500">Check your connection and try again.</p>
        <button
          onClick={refetch}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <LuRefreshCw /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#00597A] via-brand-600 to-[#0A93B8] p-6 text-white shadow-[0_20px_40px_-20px_rgba(0,108,147,0.6)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 right-40 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <svg
          className="pointer-events-none absolute right-6 top-1/2 hidden h-24 w-[420px] -translate-y-1/2 text-white/15 lg:block"
          viewBox="0 0 420 96"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 60h120l14-28 18 56 22-80 16 52h230"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">{greeting()},</p>
            <h1 className="mt-1 text-[26px] font-bold tracking-tight sm:text-3xl">{firstName} 👋</h1>
            <p className="mt-2 max-w-md text-sm text-white/75">
              Here's what's happening across WeCure Health today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="min-w-[180px] rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/70">
                <LuWallet /> Revenue · {year}
              </p>
              <p className="mt-1.5 text-2xl font-bold tabular-nums sm:text-[28px]">{naira(revenue)}</p>
            </div>
            <div className="min-w-[160px] rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">This month</p>
              <p className="mt-1.5 flex items-baseline gap-2 text-2xl font-bold tabular-nums sm:text-[28px]">
                {naira(thisMonth)}
                {monthChange !== null && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                      monthChange >= 0 ? 'bg-emerald-400/20 text-emerald-100' : 'bg-rose-400/20 text-rose-100'
                    }`}
                  >
                    {monthChange >= 0 ? '+' : ''}
                    {monthChange}%
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticCard tone="brand" icon={<PiUsersThreeBold />} value={overview.totalPatients ?? '—'} label="Total Patients" hint="Registered on the platform" />
        <StatisticCard tone="violet" icon={<FaUserDoctor />} value={overview.totalDoctors ?? '—'} label="Total Doctors" hint="Verified practitioners" />
        <StatisticCard tone="amber" icon={<LuCalendarCheck2 />} value={overview.totalAppointments ?? '—'} label="Total Appointments" hint="All-time bookings" />
        <StatisticCard tone="emerald" icon={<LuClipboardCheck />} value={overview.completeConsultations ?? '—'} label="Completed Consultations" hint="Successfully delivered" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Revenue activity"
          subtitle={`Monthly revenue for ${year}`}
          action={<Chip>{year}</Chip>}
        >
          <RevenueActivityChart monthlyData={monthly} />
        </Panel>

        <Panel
          title="Appointment status"
          subtitle="Requests, completions and cancellations"
          action={
            <Link
              to="/appointments"
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              View all <LuArrowUpRight />
            </Link>
          }
        >
          <StatusDonutChart
            totalRequests={status.totalRequests ?? 0}
            completed={status.completed ?? 0}
            canceled={status.canceled ?? 0}
          />
        </Panel>
      </div>

      {isFetching && <p className="text-center text-xs text-slate-400">Refreshing…</p>}
    </div>
  );
};

export default DashboardPage;
