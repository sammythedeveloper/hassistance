"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-10 h-10 border border-neutral-200 dark:border-neutral-800 transition-all hover:bg-neutral-100 dark:hover:bg-zinc-800"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {/* The Sun icon shows in Light mode, hides in Dark */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />

      {/* The Moon icon hides in Light mode, shows in Dark */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
