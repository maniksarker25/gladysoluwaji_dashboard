import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuChevronDown, LuLogOut, LuX } from "react-icons/lu";
import { sidebarLinks, isLinkActive } from "./sidebarData";
import Logo from "../assets/logo.png";
import useLogout from "./useLogout";

const sections = sidebarLinks.reduce((acc, link) => {
  const last = acc[acc.length - 1];
  if (last && last.name === link.section) last.links.push(link);
  else acc.push({ name: link.section, links: [link] });
  return acc;
}, []);

const itemBase =
  "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200";
const itemIdle = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
const itemActive = "bg-brand-50 text-brand-600 font-semibold";

const NavIcon = ({ children, active }) => (
  <span
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[17px] transition-colors ${
      active
        ? "bg-brand-600 text-white shadow-[0_6px_14px_-6px_rgba(0,108,147,0.8)]"
        : "bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-brand-600 group-hover:shadow-sm"
    }`}
  >
    {children}
  </span>
);

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const { pathname } = useLocation();
  const logout = useLogout();

  const settingsLink = sidebarLinks.find((l) => l.children);
  const settingsActive = settingsLink?.children.some((c) => isLinkActive(c, pathname));

  const [settingsOpen, setSettingsOpen] = useState(() => {
    try {
      return localStorage.getItem("settingsOpen") === "true";
    } catch {
      return false;
    }
  });

  // Keep the settings group open while one of its pages is showing.
  useEffect(() => {
    if (settingsActive) setSettingsOpen(true);
  }, [settingsActive]);

  useEffect(() => {
    try {
      localStorage.setItem("settingsOpen", settingsOpen);
    } catch {
      /* storage unavailable */
    }
  }, [settingsOpen]);

  // Close the mobile drawer after navigating.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderLink = (link) => {
    if (link.children) {
      return (
        <li key={link.label}>
          <button
            type="button"
            onClick={() => setSettingsOpen((v) => !v)}
            aria-expanded={settingsOpen}
            className={`${itemBase} ${settingsActive ? "text-brand-600 font-semibold" : itemIdle} cursor-pointer`}
          >
            <NavIcon active={settingsActive}>{link.icon}</NavIcon>
            <span className="flex-1 text-left">{link.label}</span>
            <LuChevronDown
              className={`text-slate-400 transition-transform duration-200 ${settingsOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              settingsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <ul className="ml-[27px] overflow-hidden border-l border-slate-200 pl-3">
              {link.children.map((sub) => {
                const active = isLinkActive(sub, pathname);
                return (
                  <li key={sub.label} className="pt-1 first:pt-2">
                    <Link
                      to={sub.path}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                        active
                          ? "bg-brand-50 font-semibold text-brand-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-[15px]">{sub.icon}</span>
                      {sub.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      );
    }

    const active = isLinkActive(link, pathname);
    return (
      <li key={link.label}>
        <Link
          to={link.path}
          aria-current={active ? "page" : undefined}
          className={`${itemBase} ${active ? itemActive : itemIdle}`}
        >
          {active && (
            <span className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
          )}
          <NavIcon active={active}>{link.icon}</NavIcon>
          <span className="truncate">{link.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-out lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between px-6">
          <Link to="/" className="block">
            <img src={Logo} alt="WeCure Health" className="h-11 w-auto" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <LuX size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          {sections.map((section) => (
            <div key={section.name} className="mt-4 first:mt-1">
              <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {section.name}
              </p>
              <ul className="space-y-0.5">{section.links.map(renderLink)}</ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={logout}
            className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/80 text-[16px] text-slate-500 transition-colors group-hover:bg-white group-hover:text-rose-600">
              <LuLogOut />
            </span>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
