"use client";

import { ExternalLink, LogOut, UserRound, X } from "lucide-react";
import { useEffect } from "react";
import { PORTAL_PUBLIK_URL } from "@/constants/navigation";
import { useAdminShell } from "@/context/AdminShellContext";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { SidebarNav } from "./SidebarNav";

/**
 * Sidebar 288px (desain Figma). Pada layar < 1024px berubah menjadi drawer
 * yang dibuka lewat tombol menu di header.
 */
export function Sidebar() {
  const { user, isSidebarOpen, closeSidebar, openLogout } = useAdminShell();

  // Tutup drawer otomatis jika layar diperbesar (rotasi tablet ke landscape).
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeSidebar();
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [closeSidebar]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-scrim transition-opacity lg:hidden",
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeSidebar}
        aria-hidden
      />
      <aside
        id="admin-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-surface-low transition-transform duration-300",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0 shadow-float" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6">
          <BrandMark />
          <button
            type="button"
            onClick={closeSidebar}
            className="inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container lg:hidden"
            aria-label="Tutup menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="px-7 pt-2 pb-4 text-overline text-on-surface-variant">Menu Administrasi</p>

        <div className="scrollbar-thin flex-1 overflow-y-auto pb-4">
          <SidebarNav onNavigate={closeSidebar} />
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-3 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                <UserRound className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-on-surface">{user.nama}</p>
                <p className="truncate text-[11px] leading-[14px] text-on-surface-variant">{user.email}</p>
              </div>
            </div>
            <a
              href={PORTAL_PUBLIK_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 items-center justify-center gap-2 rounded-lg bg-surface-lowest text-xs font-semibold text-primary transition hover:bg-surface-low"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              Portal Publik
            </a>
            <button
              type="button"
              onClick={openLogout}
              className="flex h-8 items-center justify-between rounded-lg px-2 text-xs font-semibold text-error transition hover:bg-error-container/60"
            >
              Keluar / Logout
              <LogOut className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
