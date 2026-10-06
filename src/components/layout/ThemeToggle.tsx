"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { IconButton } from "@/components/ui/Button";

/** Tombol terang/gelap — nilai tema dibagikan lewat ThemeContext (useContext). */
export function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return (
    <IconButton label="Ganti tema terang/gelap" onClick={toggleTheme}>
      {/* Ikon dipilih via CSS agar markup server & klien identik (tanpa hydration mismatch). */}
      <Moon className="size-[18px] dark:hidden" aria-hidden />
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
    </IconButton>
  );
}
