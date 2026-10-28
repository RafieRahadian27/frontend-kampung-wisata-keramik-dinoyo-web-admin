"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AdminUser, Permission } from "@/types";

interface AdminShellContextValue {
  user: AdminUser;
  /** Cek izin untuk menyembunyikan tombol yang tidak relevan (bukan kontrol keamanan). */
  can: (permission: Permission) => boolean;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  isLogoutOpen: boolean;
  openLogout: () => void;
  closeLogout: () => void;
}

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

/** State global kerangka admin: user aktif, drawer sidebar (mobile), dan dialog logout. */
export function AdminShellProvider({ user, children }: { user: AdminUser; children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openLogout = useCallback(() => {
    setSidebarOpen(false);
    setLogoutOpen(true);
  }, []);
  const closeLogout = useCallback(() => setLogoutOpen(false), []);
  const can = useCallback((permission: Permission) => user.izin.includes(permission), [user]);

  const value = useMemo(
    () => ({ user, can, isSidebarOpen, openSidebar, closeSidebar, isLogoutOpen, openLogout, closeLogout }),
    [user, can, isSidebarOpen, openSidebar, closeSidebar, isLogoutOpen, openLogout, closeLogout],
  );

  return <AdminShellContext.Provider value={value}>{children}</AdminShellContext.Provider>;
}

export function useAdminShell() {
  const context = useContext(AdminShellContext);
  if (!context) throw new Error("useAdminShell harus dipakai di dalam <AdminShellProvider>");
  return context;
}
