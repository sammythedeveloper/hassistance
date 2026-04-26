"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/demo/")) {
    return null;
  }

  return (
    <footer className="mx-auto px-10 py-12 border-t border-neutral-100 dark:border-zinc-900 font-mono w-full bg-white dark:bg-zinc-950 ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-60">
          <Activity className="h-4 w-4" />
          <span className="text-sm tracking-tighter">HolisticAI</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-widest text-neutral-500 dark:text-zinc-500">
          <Link
            href="/about"
            className="hover:text-emerald-500 transition-colors"
          >
            About Project
          </Link>
          <Link
            href="/privacy"
            className="hover:text-emerald-500 transition-colors"
          >
            Privacy & Data
          </Link>
          <Link
            href="/terms"
            className="hover:text-emerald-500 transition-colors"
          >
            Terms of Use
          </Link>
        </div>

        <div className="text-[10px] text-neutral-400 dark:text-zinc-600">
          © 2026 / Build 0.1.0
        </div>
      </div>
    </footer>
  );
}
