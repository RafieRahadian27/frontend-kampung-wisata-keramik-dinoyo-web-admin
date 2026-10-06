"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV, type NavItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";

function isActive(item: NavItem, pathname: string) {
  if (pathname === item.href) return true;
  return item.matches?.test(pathname) ?? false;
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu administrasi" className="flex flex-col gap-1.5 px-4">
      {ADMIN_NAV.map((item) => {
        const active = isActive(item, pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition",
              active
                ? "bg-primary-container text-on-primary-container shadow-primary"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
            )}
          >
            <Icon className="size-[18px] shrink-0" aria-hidden />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
