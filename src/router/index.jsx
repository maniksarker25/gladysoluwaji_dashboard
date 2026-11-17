import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const AppointmentsPage = lazy(() => import('../pages/appointment/AppointmentsPage'));
const FundTransfer = lazy(() => import('../pages/appointment/FundTransfer'));
const FundReturn = lazy(() => import('../pages/appointment/FundReturn'));
const DoctorRequestDetails = lazy(() => import('../pages/new-doctor-req/DoctorRequestDetails'));
const DoctorRequestsPage = lazy(() => import('../pages/new-doctor-req/DoctorRequestsPage'));
const DoctorsPage = lazy(() => import('../pages/doctor-manage/DoctorsPage'));
const PatientsPage = lazy(() => import('../pages/patient-manage/PatientsPage'));
const AdminsPage = lazy(() => import('../pages/admin/AdminsPage'));
const WellnessTipsPage = lazy(() => import('../pages/wellness-tips/WellnessTipsPage'));
const SpecialtiesPage = lazy(() => import('../pages/specialties/SpecialtiesPage'));
// import SubscriptionPage from '../pages/subscription/SubscriptionPage';
const SupportPage = lazy(() => import('../pages/setting/SupportPage'));
const TermsPage = lazy(() => import('../pages/setting/TermsPage'));
const PrivacyPage = lazy(() => import('../pages/setting/PrivacyPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const ChangePasswordPage = lazy(() => import('../pages/profile/ChangePassword'));
const EditProfile = lazy(() => import('../pages/profile/EditProfile'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const OtpPage = lazy(() => import('../pages/auth/OtpPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
import ProtectedRoute from './ProtectedRoute';
const DoctorAllAppointments = lazy(() => import('../pages/doctor-manage/DoctorAllAppointments'));
const AuditLog = lazy(() => import('../pages/audit/AuditLog'));
const PublicTermsPage = lazy(() => import('../pages/public/PublicTermsPage'));
const PublicPrivacyPage = lazy(() => import('../pages/public/PublicPrivacyPage'));
const PublicContactPage = lazy(() => import('../pages/public/PublicContactPage'));

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <Spin size="large" />
  </div>
);

const page = (el) => <Suspense fallback={<PageFallback />}>{el}</Suspense>;

const router = createBrowserRouter([
  // Public Routes (Accessible without login)
  {
    path: '/terms',
    element: page(<PublicTermsPage />),
  },
  {
    path: '/terms-and-conditions',
    element: page(<PublicTermsPage />),
  },
  {
    path: '/privacy',
    element: page(<PublicPrivacyPage />),
  },
  {
    path: '/privacy-policy',
    element: page(<PublicPrivacyPage />),
  },
  {
    path: '/contact',
    element: page(<PublicContactPage />),
  },
  {
    path: '/contact-us',
    element: page(<PublicContactPage />),
  },
  {
    path: '/login',
    element: page(<LoginPage />),
  },
  {
    path: '/forgot-password',
    element: page(<ForgotPasswordPage />),
  },
  {
    path: '/otp',
    element: page(<OtpPage />),
  },
  {
    path: '/reset-password',
    element: page(<ResetPasswordPage />),
  },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: page(<DashboardPage />),
      },
      {
        path: '/appointments',
        element: page(<AppointmentsPage />),
      },
      {
        path: '/fund-transfer',
        element: page(<FundTransfer />),
      },
      {
        path: '/fund-return',
        element: page(<FundReturn />),
      },
      {
        path: '/doctor-requests-details',
        element: page(<DoctorRequestDetails />),
      },
      {
        path: '/doctor-requests-details/:id',
        element: page(<DoctorRequestDetails />),
      },
      {
        path: '/doctor-requests',
        element: page(<DoctorRequestsPage />),
      },
      {
        path: '/doctors',
        element: page(<DoctorsPage />),
      },
      {
        path: '/doctor-appointment-list',
        element: page(<DoctorAllAppointments />),
      },
      {
        path: '/patients',
        element: page(<PatientsPage />),
      },
      {
        path: '/admins',
        element: page(<AdminsPage />),
      },
      {
        path: '/wellness-tips',
        element: page(<WellnessTipsPage />),
      },
      {
        path: '/specialties',
        element: page(<SpecialtiesPage />),
      },
      {
        path: '/audit-log',
        element: page(<AuditLog />),
      },
      {
        path: '/support',
        element: page(<SupportPage />),
      },
      {
        path: '/settings/terms',
        element: page(<TermsPage />),
      },
      {
        path: '/terms/edit',
        element: page(<TermsPage />),
      },
      {
        path: '/settings/privacy',
        element: page(<PrivacyPage />),
      },
      {
        path: '/privacy/edit',
        element: page(<PrivacyPage />),
      },
      {
        path: '/profile',
        element: page(<ProfilePage />),
      },
      {
        path: '/change-password',
        element: page(<ChangePasswordPage />),
      },
      {
        path: '/edit-profile',
        element: page(<EditProfile />),
      }
    ],
  },
]);

export default router;

