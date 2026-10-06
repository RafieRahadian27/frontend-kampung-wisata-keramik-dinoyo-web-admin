"use client";

import { Bell, CircleHelp, Menu, Palette, UserRound } from "lucide-react";
import { useAdminShell } from "@/context/AdminShellContext";
import { IconButton } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { isSidebarOpen, openSidebar, openLogout } = useAdminShell();

  return (
    <header className="sticky top-0 z-30 border-b border-outline-variant/30 bg-surface/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <IconButton
            label="Buka menu"
            onClick={openSidebar}
            aria-expanded={isSidebarOpen}
            aria-controls="admin-sidebar"
            className="lg:hidden"
          >
            <Menu className="size-5" />
          </IconButton>
          <Palette className="hidden size-[18px] shrink-0 text-on-surface-variant sm:block" aria-hidden />
          <p className="truncate text-xs font-semibold tracking-[0.02em] text-on-surface-variant uppercase">
            <span className="hidden md:inline">Kampung Wisata Keramik Dinoyo Kota Malang</span>
            <span className="md:hidden">Keramik Dinoyo</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <IconButton label="Notifikasi" className="relative">
            <Bell className="size-[18px]" />
            <span className="absolute top-2 right-2.5 size-2 rounded-full bg-primary ring-2 ring-surface-low" aria-hidden />
          </IconButton>
          <IconButton label="Bantuan" className="hidden sm:inline-flex">
            <CircleHelp className="size-[18px]" />
          </IconButton>
          <IconButton label="Akun admin & logout" tone="primary" onClick={openLogout} className="size-8">
            <UserRound className="size-4" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
