import React from "react";
import { FaHospitalUser, FaUserDoctor, FaStethoscope } from "react-icons/fa6";
import {
  LuLayoutDashboard,
  LuCalendarDays,
  LuUserPlus,
  LuUserCog,
  LuHeartPulse,
  LuFileText,
  LuSettings,
  LuLifeBuoy,
  LuShield,
} from "react-icons/lu";

export const sidebarLinks = [
  {
    section: "Overview",
    label: "Dashboard",
    path: "/",
    icon: <LuLayoutDashboard />,
  },
  {
    section: "Overview",
    label: "Appointments",
    path: "/appointments",
    icon: <LuCalendarDays />,
    activePaths: ["/fund-transfer", "/fund-return"],
  },
  {
    section: "Management",
    label: "Doctor Review Queue",
    path: "/doctor-requests",
    icon: <LuUserPlus />,
    activePaths: ["/doctor-requests-details"],
  },
  {
    section: "Management",
    label: "Doctor Management",
    path: "/doctors",
    icon: <FaUserDoctor />,
    activePaths: ["/doctor-appointment-list"],
  },
  {
    section: "Management",
    label: "Patient Management",
    path: "/patients",
    icon: <FaHospitalUser />,
  },
  {
    section: "Management",
    label: "Specialties",
    path: "/specialties",
    icon: <FaStethoscope />,
  },
  {
    section: "Management",
    label: "Admin Management",
    path: "/admins",
    icon: <LuUserCog />,
  },
  {
    section: "Content",
    label: "Daily Wellness Tips",
    path: "/wellness-tips",
    icon: <LuHeartPulse />,
  },
  {
    section: "System",
    label: "Audit Log",
    path: "/audit-log",
    icon: <LuFileText />,
  },
  {
    section: "System",
    label: "Settings",
    path: "/settings",
    icon: <LuSettings />,
    children: [
      {
        label: "Support & Help",
        path: "/support",
        icon: <LuLifeBuoy />,
      },
      {
        label: "Terms & Conditions",
        path: "/settings/terms",
        icon: <LuFileText />,
        activePaths: ["/settings/terms", "/terms/edit"],
      },
      {
        label: "Privacy & Policy",
        path: "/settings/privacy",
        icon: <LuShield />,
        activePaths: ["/settings/privacy", "/privacy/edit"],
      },
    ],
  },
];

// Titles for pages that are not top-level sidebar entries.
const extraTitles = {
  "/fund-transfer": "Fund Transfer",
  "/fund-return": "Fund Return",
  "/doctor-requests-details": "Doctor Review Details",
  "/doctor-appointment-list": "Doctor Appointments",
  "/profile": "My Profile",
  "/edit-profile": "Edit Profile",
  "/change-password": "Change Password",
};

const matches = (item, pathname) =>
  pathname === item.path ||
  (item.path !== "/" && pathname.startsWith(`${item.path}/`)) ||
  (item.activePaths || []).some((p) => pathname === p || pathname.startsWith(`${p}/`));

export const isLinkActive = matches;

// Returns { section, title } describing the current route for the header.
export const getRouteMeta = (pathname) => {
  for (const link of sidebarLinks) {
    for (const child of link.children || []) {
      if (matches(child, pathname)) return { section: link.label, title: child.label };
    }
  }
  const extraKey = Object.keys(extraTitles).find(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  for (const link of sidebarLinks) {
    if (!link.children && matches(link, pathname)) {
      return { section: link.section, title: extraKey ? extraTitles[extraKey] : link.label };
    }
  }
  if (extraKey) return { section: "Account", title: extraTitles[extraKey] };
  return { section: "Overview", title: "Dashboard" };
};
